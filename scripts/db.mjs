#!/usr/bin/env node
/**
 * TiDB Cloud helper.
 *
 *   npm run db:check   verify the connection and show server info
 *   npm run db:init    create the database (if needed), tables, and seed content
 *   npm run db:seed    re-upload data/content.json into site_content
 *
 * Reads DATABASE_URL from .env.local / .env / the environment.
 */
import mysql from "mysql2/promise";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const connectionString = process.env.DATABASE_URL ?? process.env.TIDB_URL ?? "";

if (!connectionString) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const url = new URL(connectionString);
const targetDatabase =
  process.env.TIDB_DATABASE || decodeURIComponent(url.pathname.replace(/^\//, "")) || "ifbc";
const useSsl = process.env.TIDB_NO_SSL !== "1";

/**
 * Masked summary of the connection string. The password is never printed —
 * only a short fingerprint — so two machines can prove they hold the same
 * secret without either of them revealing it.
 */
function fingerprint(secret) {
  return createHash("sha256").update(secret).digest("hex").slice(0, 8);
}

function describeConnection(raw, parsed, password) {
  return {
    rawLength: raw.length,
    host: parsed.hostname,
    port: Number(parsed.port || 4000),
    user: decodeURIComponent(parsed.username),
    database: targetDatabase,
    passwordLength: password.length,
    passwordSha256: password ? fingerprint(password) : "(empty)",
    passwordHasWhitespace: /\s/.test(password),
    passwordHasQuotes: /^["']|["']$/.test(password),
    rawHasSurroundingQuotes: /^\s*["']|["']\s*$/.test(raw),
    ssl: useSsl,
  };
}

const base = {
  host: url.hostname,
  port: Number(url.port || 4000),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  connectTimeout: 20_000,
  charset: "utf8mb4",
  timezone: "Z",
  ...(useSsl ? { ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true } } : {}),
};

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((arg) => arg.startsWith("--")));

if (flags.has("--show")) {
  console.log("DATABASE_URL (masked)");
  for (const [key, value] of Object.entries(describeConnection(connectionString, url, base.password))) {
    console.log(`  ${key}: ${value}`);
  }
  console.log("");
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
  `CREATE TABLE IF NOT EXISTS media (
     id VARCHAR(32) NOT NULL,
     filename VARCHAR(160) NOT NULL DEFAULT '',
     mime VARCHAR(120) NOT NULL,
     size INT UNSIGNED NOT NULL DEFAULT 0,
     data MEDIUMBLOB NOT NULL,
     created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
     PRIMARY KEY (id),
     KEY idx_media_created (created_at)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

async function connect(database) {
  return mysql.createConnection({ ...base, ...(database ? { database } : {}) });
}

async function check() {
  const connection = await connect(targetDatabase);
  try {
    const [version] = await connection.query("SELECT VERSION() AS version, DATABASE() AS db");
    const [tables] = await connection.query("SHOW TABLES");
    console.log("Connected to TiDB");
    console.log("  version:", version[0].version);
    console.log("  database:", version[0].db);
    console.log("  tables:", tables.length ? tables.map((t) => Object.values(t)[0]).join(", ") : "(none yet)");
  } finally {
    await connection.end();
  }
}

async function init() {
  // 1. Create the application database if it does not exist.
  const admin = await connect(null);
  try {
    await admin.query(
      `CREATE DATABASE IF NOT EXISTS \`${targetDatabase}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    console.log(`Database ready: ${targetDatabase}`);
  } finally {
    await admin.end();
  }

  // 2. Create tables.
  const connection = await connect(targetDatabase);
  try {
    for (const statement of SCHEMA) await connection.query(statement);
    console.log("Tables ready: site_content, messages");

    // 3. Seed content from the local JSON file, only when the table is empty.
    const [rows] = await connection.query("SELECT COUNT(*) AS n FROM site_content");
    if (rows[0].n > 0) {
      console.log("site_content already has a saved document — leaving it untouched.");
      return;
    }

    const seedFile = path.join(root, "data", "content.json");
    if (!existsSync(seedFile)) {
      console.log("No data/content.json to seed — the site will start from its built-in defaults.");
      return;
    }
    const doc = JSON.parse(readFileSync(seedFile, "utf8"));
    delete doc.messages;
    await connection.execute(
      "INSERT INTO site_content (id, doc) VALUES (1, ?) ON DUPLICATE KEY UPDATE doc = ?",
      [JSON.stringify(doc), JSON.stringify(doc)],
    );
    console.log("Seeded site_content from data/content.json");
  } finally {
    await connection.end();
  }
}

async function seed() {
  const seedFile = path.join(root, "data", "content.json");
  if (!existsSync(seedFile)) {
    console.error("data/content.json not found. Open /admin and press Save once, then retry.");
    process.exit(1);
  }
  const connection = await connect(targetDatabase);
  try {
    await connection.query(SCHEMA[0]);
    const doc = JSON.parse(readFileSync(seedFile, "utf8"));
    delete doc.messages;
    await connection.execute(
      "INSERT INTO site_content (id, doc) VALUES (1, ?) ON DUPLICATE KEY UPDATE doc = ?",
      [JSON.stringify(doc), JSON.stringify(doc)],
    );
    console.log(`Uploaded data/content.json to ${targetDatabase}.site_content`);
  } finally {
    await connection.end();
  }
}

const command = argv.find((arg) => !arg.startsWith("--")) ?? "check";
const run = { check, init, seed }[command];
if (!run) {
  console.error(`Unknown command "${command}". Use check, init or seed.`);
  process.exit(1);
}
run().catch((error) => {
  console.error(`\n${command} failed: ${error.message}`);
  if (error.code) console.error("code:", error.code);
  if (error.code === "ER_ACCESS_DENIED_ERROR") {
    console.error(
      "\nThe host and user were accepted, so the password is the problem.\n" +
        "Run `npm run db:check -- --show` and compare passwordLength / passwordSha256\n" +
        "between this machine and the host that is failing (e.g. a Vercel env var).",
    );
  }
  if (error.code === "ER_BAD_DB_ERROR") {
    console.error("\nThe database does not exist yet. Run `npm run db:init`.");
  }
  process.exit(1);
});
