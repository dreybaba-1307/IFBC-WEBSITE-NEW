import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { Star } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main id="main" className="admin-surface relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(194,160,90,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full border border-ivory/[0.04]" />

      <div className="relative z-10 mb-10 flex flex-col items-center text-center">
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.34em] text-gold">
          Ifako First Baptist Church
        </span>
        <span className="mt-3 flex items-center gap-3 text-ivory/30">
          <span className="h-px w-10 bg-current" />
          <Star className="h-2.5 w-2.5 text-gold/60" />
          <span className="h-px w-10 bg-current" />
        </span>
      </div>

      <LoginForm />

      <p className="relative z-10 mt-10 font-mono text-[0.52rem] uppercase tracking-[0.26em] text-ivory/20">
        Sanctuary of truth &amp; joy
      </p>
    </main>
  );
}
