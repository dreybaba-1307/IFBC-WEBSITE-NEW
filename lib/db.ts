import "server-only";
import mysql from "mysql2/promise";

/**
 * TiDB Cloud (MySQL-compatible) connection.
 *
 * Set DATABASE_URL to a TiDB Cloud connection string, e.g.
 *   mysql://<user>.root:<password>@gateway01.<region>.prod.aws.tidbcloud.com:4000/ifbc
 *
 * When DATABASE_URL is not set the site transparently falls back to the local
 * JSON file store, so `npm run dev` works with no setup at all.
 */

export const connectionString = process.env.DATABASE_URL ?? process.env.TIDB_URL ?? "";

export function databaseEnabled(): boolean {
  return connectionString.trim().length > 0;
}

let pool: mysql.Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function databaseName(): string {
  if (!databaseEnabled()) return "";
  if (process.env.TIDB_DATABASE) return process.env.TIDB_DATABASE;
  try {
    const url = new URL(connectionString);
    return decodeURIComponent(url.pathname.replace(/^\//, "")) || "ifbc";
  } catch {
    return "ifbc";
  }
}

function poolConfig(): mysql.PoolOptions {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error("DATABASE_URL is not a valid mysql:// connection string.");
  }

  const useSsl = process.env.TIDB_NO_SSL !== "1";
  const caPath = process.env.TIDB_CA_CERT;

  return {
    host: url.hostname,
    port: Number(url.port || 4000),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: databaseName(),
    waitForConnections: true,
    connectionLimit: Number(process.env.TIDB_POOL_SIZE ?? 5),
    maxIdle: Number(process.env.TIDB_POOL_SIZE ?? 5),
    idleTimeout: 60_000,
    queueLimit: 0,
    connectTimeout: 15_000,
    enableKeepAlive: true,
    charset: "utf8mb4",
    timezone: "Z",
    // TiDB Cloud requires TLS. Node trusts the public CA chain TiDB uses.
    ...(useSsl
      ? {
          ssl: {
            minVersion: "TLSv1.2" as const,
            rejectUnauthorized: true,
          },
        }
      : {}),
    ...(caPath ? {} : {}),
  };
}

export function getPool(): mysql.Pool {
  if (!databaseEnabled()) {
    throw new Error("DATABASE_URL is not configured.");
  }
  if (!pool) {
    pool = mysql.createPool(poolConfig());
  }
  return pool;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS site_content (
     id TINYINT UNSIGNED NOT NULL,
     doc JSON NOT NULL,
     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     PRIMARY KEY (id)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS messages (
     id CHAR(24) NOT NULL,
     type VARCHAR(16) NOT NULL DEFAULT 'contact',
     name VARCHAR(160) NOT NULL,
     email VARCHAR(255) NOT NULL DEFAULT '',
     phone VARCHAR(80) NOT NULL DEFAULT '',
     body TEXT NOT NULL,
     is_read TINYINT(1) NOT NULL DEFAULT 0,
     created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
     PRIMARY KEY (id),
     KEY idx_messages_created (created_at),
     KEY idx_messages_read (is_read)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

/** Creates the tables on first use so a fresh TiDB instance just works. */
export async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getPool();
      for (const statement of SCHEMA) {
        await db.query(statement);
      }
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

export async function closePool(): Promise<void> {
  if (pool) {
    const current = pool;
    pool = null;
    schemaReady = null;
    await current.end().catch(() => undefined);
  }
}
