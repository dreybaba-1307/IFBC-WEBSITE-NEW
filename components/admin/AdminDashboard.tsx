"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  Check,
  Church,
  Clock,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Mic2,
  Palette,
  Phone,
  Quote,
  RefreshCw,
  Save,
  Settings,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { Area, Field, ImageField, Repeater, Select, StringList, Toggle } from "./fields";

type SectionKey =
  | "overview"
  | "site"
  | "hero"
  | "theme"
  | "about"
  | "identity"
  | "services"
  | "leadership"
  | "ministries"
  | "events"
  | "gallery"
  | "sermons"
  | "testimonies"
  | "giving"
  | "contact"
  | "visit"
  | "messages";

const nav: { key: SectionKey; label: string; icon: LucideIcon; group: string }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, group: "Church" },
  { key: "site", label: "Site & branding", icon: Settings, group: "Church" },
  { key: "hero", label: "Hero", icon: Sparkles, group: "Church" },
  { key: "theme", label: "Year theme", icon: Church, group: "Church" },
  { key: "about", label: "About & stats", icon: BookOpen, group: "Church" },
  { key: "identity", label: "Vision & anthem", icon: Quote, group: "Church" },
  { key: "services", label: "Service times", icon: Clock, group: "Gatherings" },
  { key: "events", label: "Events", icon: CalendarDays, group: "Gatherings" },
  { key: "sermons", label: "Sermons", icon: Mic2, group: "Gatherings" },
  { key: "leadership", label: "Leadership", icon: Users, group: "People" },
  { key: "ministries", label: "Ministries", icon: Church, group: "People" },
  { key: "testimonies", label: "Testimonies", icon: Quote, group: "People" },
  { key: "gallery", label: "Gallery", icon: ImageIcon, group: "Content" },
  { key: "giving", label: "Giving", icon: Palette, group: "Content" },
  { key: "contact", label: "Contact", icon: Phone, group: "Content" },
  { key: "visit", label: "Visit", icon: Clock, group: "Content" },
  { key: "messages", label: "Messages", icon: Inbox, group: "Inbox" },
];

const groups = ["Church", "Gatherings", "People", "Content", "Inbox"];

const ministryIcons = [
  "Music4",
  "HeartHandshake",
  "HandHeart",
  "GraduationCap",
  "Megaphone",
  "Baby",
  "Sparkles",
  "Radio",
  "Users",
  "LifeBuoy",
  "Landmark",
  "ClipboardList",
  "ShieldCheck",
  "Wrench",
  "Flower2",
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function AdminDashboard({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initial);
  const [section, setSection] = useState<SectionKey>("overview");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [mobileNav, setMobileNav] = useState(false);

  const unread = useMemo(
    () => content.messages.filter((m) => !m.read).length,
    [content.messages],
  );

  function flash(tone: "ok" | "err", text: string) {
    setToast({ tone, text });
    window.setTimeout(() => setToast(null), 3200);
  }

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
    setDirty(true);
  }

  function patch<K extends keyof SiteContent>(key: K, partial: Partial<SiteContent[K]>) {
    setContent((c) => ({
      ...c,
      [key]: { ...(c[key] as unknown as Record<string, unknown>), ...partial } as SiteContent[K],
    }));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not save.");
      if (json.content) setContent(json.content);
      setDirty(false);
      flash("ok", "Saved — your website is up to date.");
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function messageAction(id: string, action: "read" | "unread" | "delete") {
    try {
      if (action === "delete") {
        const res = await fetch("/api/admin/messages", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error("Delete failed.");
        setContent((c) => ({ ...c, messages: c.messages.filter((m) => m.id !== id) }));
        flash("ok", "Message deleted.");
      } else {
        const read = action === "read";
        const res = await fetch("/api/admin/messages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, read }),
        });
        if (!res.ok) throw new Error("Update failed.");
        setContent((c) => ({
          ...c,
          messages: c.messages.map((m) => (m.id === id ? { ...m, read } : m)),
        }));
      }
    } catch (err) {
      flash("err", err instanceof Error ? err.message : "Action failed.");
    }
  }

  /* ------------------------------------------------------------------ */
  /* Sections                                                            */
  /* ------------------------------------------------------------------ */

  function renderSection() {
    switch (section) {
      case "overview":
        return (
          <div className="space-y-6">
            <SectionTitle
              title="Welcome back"
              copy="This is the control room for the Ifako First Baptist Church website. Changes are live as soon as you save."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Unread messages", value: unread, icon: Inbox, go: "messages" as SectionKey },
                { label: "Events", value: content.events.length, icon: CalendarDays, go: "events" as SectionKey },
                { label: "Ministries", value: content.ministries.length, icon: Church, go: "ministries" as SectionKey },
                { label: "Gallery frames", value: content.gallery.length, icon: ImageIcon, go: "gallery" as SectionKey },
              ].map((card) => (
                <button
                  key={card.label}
                  type="button"
                  onClick={() => setSection(card.go)}
                  className="admin-card group rounded-xl p-5 text-left transition-colors hover:border-gold/40"
                >
                  <card.icon className="h-4 w-4 text-gold/70" />
                  <p className="mt-6 font-display text-3xl text-ivory">{card.value}</p>
                  <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ivory/40">
                    {card.label}
                  </p>
                </button>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="admin-card rounded-xl p-6">
                <p className="admin-label">Quick edits</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    ["Update the hero", "hero"],
                    ["This year's theme", "theme"],
                    ["Service times", "services"],
                    ["Add an event", "events"],
                    ["Change the gallery", "gallery"],
                    ["Giving accounts", "giving"],
                  ].map(([label, key]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSection(key as SectionKey)}
                      className="flex items-center justify-between gap-2 rounded-lg border border-ivory/10 px-3.5 py-2.5 text-left text-[0.78rem] text-ivory/65 transition-colors hover:border-gold/40 hover:text-ivory"
                    >
                      {label}
                      <span className="text-ivory/25">→</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-card rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <p className="admin-label !mb-0">Latest messages</p>
                  <button
                    type="button"
                    onClick={() => setSection("messages")}
                    className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-gold-soft hover:text-gold"
                  >
                    View all
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {content.messages.slice(0, 3).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSection("messages")}
                      className="block w-full border-b border-ivory/8 pb-3 text-left last:border-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[0.8rem] text-ivory/80">{m.name}</span>
                        <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ivory/30">
                          {timeAgo(m.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-[0.72rem] text-ivory/40">{m.message}</p>
                    </button>
                  ))}
                  {content.messages.length === 0 ? (
                    <p className="py-6 text-center text-[0.75rem] text-ivory/30">
                      No messages yet.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="admin-card flex flex-col items-start justify-between gap-4 rounded-xl p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-xl text-ivory">See your work</p>
                <p className="mt-1 text-[0.78rem] text-ivory/40">
                  Open the live site in a new tab after saving.
                </p>
              </div>
              <Link href="/" target="_blank" className="btn btn-gold !px-5 !py-2.5 !text-[0.6rem]">
                View website
              </Link>
            </div>
          </div>
        );

      case "site":
        return (
          <div className="space-y-6">
            <SectionTitle
              title="Site & branding"
              copy="The church name, logo, contact details, social links, and footer credit."
            />
            <Card title="Identity">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Church name" value={content.site.name} onChange={(v) => patch("site", { name: v })} />
                <Field label="Short name" value={content.site.shortName} onChange={(v) => patch("site", { shortName: v })} />
                <Field label="Tagline" value={content.site.tagline} onChange={(v) => patch("site", { tagline: v })} />
                <Field label="Sunday summary" value={content.site.serviceTime} onChange={(v) => patch("site", { serviceTime: v })} />
              </div>
              <Area label="Short description (SEO)" value={content.site.description} onChange={(v) => patch("site", { description: v })} rows={3} />
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageField label="Church logo" value={content.site.logo} onChange={(v) => patch("site", { logo: v })} />
                <ImageField label="Convention logo" value={content.site.nbcLogo} onChange={(v) => patch("site", { nbcLogo: v })} />
              </div>
            </Card>
            <Card title="Contact details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" value={content.site.phone} onChange={(v) => patch("site", { phone: v })} />
                <Field label="Email" value={content.site.email} onChange={(v) => patch("site", { email: v })} />
                <Field label="Giving email" value={content.site.givingEmail} onChange={(v) => patch("site", { givingEmail: v })} />
                <Field label="Footer note" value={content.site.footerNote} onChange={(v) => patch("site", { footerNote: v })} />
              </div>
              <Area label="Address" value={content.site.address} onChange={(v) => patch("site", { address: v })} rows={2} />
            </Card>
            <Card title="Social links">
              <div className="grid gap-4">
                <Field label="YouTube" value={content.site.socials.youtube} onChange={(v) => patch("site", { socials: { ...content.site.socials, youtube: v } })} />
                <Field label="Instagram" value={content.site.socials.instagram} onChange={(v) => patch("site", { socials: { ...content.site.socials, instagram: v } })} />
                <Field label="Facebook" value={content.site.socials.facebook} onChange={(v) => patch("site", { socials: { ...content.site.socials, facebook: v } })} />
              </div>
            </Card>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-6">
            <SectionTitle title="Homepage hero" copy="The first screen visitors see. Keep the headline short and the invitation warm." />
            <Card title="Headline">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => patch("hero", { eyebrow: v })} />
                <Field label="Accent line (italic)" value={content.hero.accentLine} onChange={(v) => patch("hero", { accentLine: v })} />
              </div>
              <StringList label="Title lines" items={content.hero.titleLines} onChange={(v) => patch("hero", { titleLines: v })} rows={3} hint="Each line is rendered as a large headline row." />
              <Area label="Subtitle" value={content.hero.subtitle} onChange={(v) => patch("hero", { subtitle: v })} rows={3} />
              <ImageField label="Background image" value={content.hero.image} onChange={(v) => patch("hero", { image: v })} />
            </Card>
            <Card title="Scripture & buttons">
              <Area label="Scripture" value={content.hero.scripture} onChange={(v) => patch("hero", { scripture: v })} rows={2} />
              <Field label="Scripture reference" value={content.hero.scriptureRef} onChange={(v) => patch("hero", { scriptureRef: v })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Primary button label" value={content.hero.ctaPrimary.label} onChange={(v) => patch("hero", { ctaPrimary: { ...content.hero.ctaPrimary, label: v } })} />
                <Field label="Primary link" value={content.hero.ctaPrimary.href} onChange={(v) => patch("hero", { ctaPrimary: { ...content.hero.ctaPrimary, href: v } })} />
                <Field label="Secondary button label" value={content.hero.ctaSecondary.label} onChange={(v) => patch("hero", { ctaSecondary: { ...content.hero.ctaSecondary, label: v } })} />
                <Field label="Secondary link" value={content.hero.ctaSecondary.href} onChange={(v) => patch("hero", { ctaSecondary: { ...content.hero.ctaSecondary, href: v } })} />
              </div>
            </Card>
          </div>
        );

      case "theme":
        return (
          <div className="space-y-6">
            <SectionTitle title="Year theme" copy="The prophetic word for the year, shown on the homepage and across the site." />
            <Card title={`${content.theme.year} theme`}>
              <div className="grid gap-4 sm:grid-cols-[0.4fr_1fr]">
                <Field label="Year" value={content.theme.year} onChange={(v) => patch("theme", { year: v })} />
                <Field label="Theme title" value={content.theme.title} onChange={(v) => patch("theme", { title: v })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Theme verse" value={content.theme.verse} onChange={(v) => patch("theme", { verse: v })} />
                <Field label="One-line declaration" value={content.theme.description} onChange={(v) => patch("theme", { description: v })} />
              </div>
              <ImageField label="Background image" value={content.theme.image} onChange={(v) => patch("theme", { image: v })} />
            </Card>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <SectionTitle title="About & stats" copy="Your story, the sanctuary images, and the numbers shown on the About page and homepage." />
            <Card title="Story">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Eyebrow" value={content.about.eyebrow} onChange={(v) => patch("about", { eyebrow: v })} />
                <Field label="Headline" value={content.about.title} onChange={(v) => patch("about", { title: v })} />
              </div>
              <StringList label="Paragraphs" items={content.about.paragraphs} onChange={(v) => patch("about", { paragraphs: v })} rows={8} hint="One paragraph per line. The first is shown large." />
              <Area label="Pull quote" value={content.about.quote} onChange={(v) => patch("about", { quote: v })} rows={2} />
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageField label="Main image" value={content.about.image} onChange={(v) => patch("about", { image: v })} />
                <ImageField label="Secondary image" value={content.about.image2} onChange={(v) => patch("about", { image2: v })} />
              </div>
            </Card>
            <Card title="Statistics">
              <Repeater
                label="Stats"
                items={content.about.stats}
                onChange={(v) => patch("about", { stats: v })}
                create={() => ({ value: "00", label: "New statistic" })}
                title={(item) => `${item.value} — ${item.label}`}
                render={(item, update) => (
                  <div className="grid gap-4 sm:grid-cols-[0.4fr_1fr]">
                    <Field label="Value" value={item.value} onChange={(v) => update({ value: v })} />
                    <Field label="Label" value={item.label} onChange={(v) => update({ label: v })} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "identity":
        return (
          <div className="space-y-6">
            <SectionTitle title="Vision, mission & anthem" copy="The convictions that shape the church, including the Yoruba anthem." />
            <Card title="Direction">
              <Area label="Vision" value={content.identity.vision} onChange={(v) => patch("identity", { vision: v })} rows={2} />
              <Area label="Mission" value={content.identity.mission} onChange={(v) => patch("identity", { mission: v })} rows={2} />
              <StringList label="Values" items={content.identity.values} onChange={(v) => patch("identity", { values: v })} rows={5} hint="One value per line." />
            </Card>
            <Card title="Anthem">
              <StringList label="Anthem lines" items={content.identity.anthem} onChange={(v) => patch("identity", { anthem: v })} rows={6} hint="One line per line of the song." />
              <Area label="Anthem note" value={content.identity.anthemNote} onChange={(v) => patch("identity", { anthemNote: v })} rows={3} />
            </Card>
          </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            <SectionTitle title="Service times" copy="The weekly rhythm shown on the homepage, footer, and visit page." />
            <Card title="Weekly gatherings">
              <Repeater
                label="Services"
                items={content.services}
                onChange={(v) => set("services", v)}
                create={() => ({
                  day: "Sunday",
                  name: "New gathering",
                  time: "10:00 AM",
                  note: "Describe this gathering.",
                  image: "/images/hero-worship.jpg",
                })}
                title={(item) => `${item.name} · ${item.day} ${item.time}`}
                render={(item, update) => (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                      <Field label="Day" value={item.day} onChange={(v) => update({ day: v })} />
                      <Field label="Time" value={item.time} onChange={(v) => update({ time: v })} />
                    </div>
                    <Area label="Note" value={item.note} onChange={(v) => update({ note: v })} rows={2} />
                    <ImageField label="Image" value={item.image} onChange={(v) => update({ image: v })} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "leadership":
        return (
          <div className="space-y-6">
            <SectionTitle title="Leadership" copy="The lead pastor and the deaconate shown on the leadership page." />
            <Card title="Lead pastor">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={content.leadership.lead.name} onChange={(v) => patch("leadership", { lead: { ...content.leadership.lead, name: v } })} />
                <Field label="Role" value={content.leadership.lead.role} onChange={(v) => patch("leadership", { lead: { ...content.leadership.lead, role: v } })} />
              </div>
              <Area label="Bio" value={content.leadership.lead.bio} onChange={(v) => patch("leadership", { lead: { ...content.leadership.lead, bio: v } })} rows={3} />
              <ImageField label="Portrait" value={content.leadership.lead.image} onChange={(v) => patch("leadership", { lead: { ...content.leadership.lead, image: v } })} />
            </Card>
            <Card title="Deaconate">
              <Repeater
                label="Team"
                items={content.leadership.team}
                onChange={(v) => patch("leadership", { team: v })}
                create={() => ({ name: "New leader", role: "Deacon", image: "/images/placeholder_avatar.svg", bio: "" })}
                title={(item) => `${item.name} · ${item.role}`}
                render={(item, update) => (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                      <Field label="Role" value={item.role} onChange={(v) => update({ role: v })} />
                    </div>
                    <Area label="Bio" value={item.bio} onChange={(v) => update({ bio: v })} rows={3} />
                    <ImageField label="Portrait" value={item.image} onChange={(v) => update({ image: v })} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "ministries":
        return (
          <div className="space-y-6">
            <SectionTitle title="Ministries" copy="Departments of the church. The icon appears on the ministries grid." />
            <Card title="Departments">
              <Repeater
                label="Ministries"
                items={content.ministries}
                onChange={(v) => set("ministries", v)}
                create={() => ({ name: "New ministry", icon: "Sparkles", description: "" })}
                title={(item) => item.name}
                render={(item, update) => (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                      <Select
                        label="Icon"
                        value={item.icon}
                        onChange={(v) => update({ icon: v })}
                        options={ministryIcons.map((i) => ({ value: i, label: i }))}
                      />
                    </div>
                    <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={2} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            <SectionTitle title="Events" copy="Special gatherings. The first event is featured on the homepage." />
            <Card title="Calendar">
              <Repeater
                label="Events"
                items={content.events}
                onChange={(v) => set("events", v)}
                create={() => ({
                  id: `event-${Date.now()}`,
                  slug: `new-event-${Date.now().toString(36)}`,
                  title: "New event",
                  date: "Sunday, 1 January 2026",
                  isoDate: new Date().toISOString(),
                  time: "10:00 AM",
                  location: "Church Sanctuary",
                  description: "",
                  image: "/images/event_thanksgiving.jpg",
                  featured: false,
                })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                      <Field label="URL slug" value={item.slug} onChange={(v) => update({ slug: v.replace(/[^a-z0-9-]/gi, "-").toLowerCase() })} hint={`/events/${item.slug}`} mono />
                      <Field label="Display date" value={item.date} onChange={(v) => update({ date: v })} />
                      <Field label="Time" value={item.time} onChange={(v) => update({ time: v })} />
                      <Field label="Location" value={item.location} onChange={(v) => update({ location: v })} />
                      <Field label="ISO date (for calendar)" value={item.isoDate} onChange={(v) => update({ isoDate: v })} mono />
                    </div>
                    <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={4} />
                    <ImageField label="Event image" value={item.image} onChange={(v) => update({ image: v })} />
                    <Toggle label="Feature on homepage" checked={item.featured} onChange={(v) => update({ featured: v })} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-6">
            <SectionTitle title="Gallery" copy="Photos from the life of the church. Add captions and choose the frame shape." />
            <Card title="Photos">
              <Repeater
                label="Gallery items"
                items={content.gallery}
                onChange={(v) => set("gallery", v)}
                create={() => ({ src: "/images/community.jpg", alt: "", caption: "New photo", span: "normal" as const })}
                title={(item) => item.caption}
                render={(item, update) => (
                  <div className="space-y-4">
                    <ImageField label="Image" value={item.src} onChange={(v) => update({ src: v })} />
                    <Field label="Alt text (accessibility)" value={item.alt} onChange={(v) => update({ alt: v })} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Caption" value={item.caption} onChange={(v) => update({ caption: v })} />
                      <Select
                        label="Frame shape"
                        value={item.span}
                        onChange={(v) => update({ span: v as typeof item.span })}
                        options={[
                          { value: "normal", label: "Standard" },
                          { value: "wide", label: "Wide" },
                          { value: "tall", label: "Tall" },
                        ]}
                      />
                    </div>
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "sermons":
        return (
          <div className="space-y-6">
            <SectionTitle title="Sermons" copy="Recent messages linked to YouTube. The first is featured." />
            <Card title="Messages">
              <Repeater
                label="Sermons"
                items={content.sermons}
                onChange={(v) => set("sermons", v)}
                create={() => ({
                  title: "New message",
                  speaker: content.leadership.lead.name,
                  date: "Sunday, 1 January 2026",
                  scripture: "",
                  description: "",
                  youtube: content.site.socials.youtube,
                })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="space-y-4">
                    <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Speaker" value={item.speaker} onChange={(v) => update({ speaker: v })} />
                      <Field label="Date" value={item.date} onChange={(v) => update({ date: v })} />
                      <Field label="Scripture" value={item.scripture} onChange={(v) => update({ scripture: v })} />
                      <Field label="YouTube link" value={item.youtube} onChange={(v) => update({ youtube: v })} />
                    </div>
                    <Area label="Description" value={item.description} onChange={(v) => update({ description: v })} rows={3} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "testimonies":
        return (
          <div className="space-y-6">
            <SectionTitle title="Testimonies" copy="Stories from the family, shown in the homepage carousel." />
            <Card title="Voices">
              <Repeater
                label="Testimonies"
                items={content.testimonies}
                onChange={(v) => set("testimonies", v)}
                create={() => ({ name: "New member", role: "Member", quote: "" })}
                title={(item) => `${item.name} — ${item.role}`}
                render={(item, update) => (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" value={item.name} onChange={(v) => update({ name: v })} />
                      <Field label="Role / season" value={item.role} onChange={(v) => update({ role: v })} />
                    </div>
                    <Area label="Quote" value={item.quote} onChange={(v) => update({ quote: v })} rows={4} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "giving":
        return (
          <div className="space-y-6">
            <SectionTitle title="Giving" copy="Bank accounts and the giving invitation. Double-check account numbers." />
            <Card title="Invitation">
              <Area label="Intro" value={content.giving.intro} onChange={(v) => patch("giving", { intro: v })} rows={3} />
              <Area label="Receipt note" value={content.giving.note} onChange={(v) => patch("giving", { note: v })} rows={2} />
            </Card>
            <Card title="Bank accounts">
              <Repeater
                label="Accounts"
                items={content.giving.banks}
                onChange={(v) => patch("giving", { banks: v })}
                create={() => ({ label: "New fund", bank: "", accountName: "Ifako First Baptist Church", accountNumber: "", currency: "NGN" })}
                title={(item) => `${item.label} · ${item.accountNumber}`}
                render={(item, update) => (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Purpose label" value={item.label} onChange={(v) => update({ label: v })} />
                      <Field label="Bank" value={item.bank} onChange={(v) => update({ bank: v })} />
                      <Field label="Account name" value={item.accountName} onChange={(v) => update({ accountName: v })} />
                      <Field label="Account number" value={item.accountNumber} onChange={(v) => update({ accountNumber: v })} mono />
                      <Field label="Currency" value={item.currency} onChange={(v) => update({ currency: v })} />
                    </div>
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <SectionTitle title="Contact" copy="Address, phone, email, and office hours shown on the contact and visit pages." />
            <Card title="Details">
              <Area label="Address" value={content.contact.address} onChange={(v) => patch("contact", { address: v })} rows={2} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" value={content.contact.phone} onChange={(v) => patch("contact", { phone: v })} />
                <Field label="Email" value={content.contact.email} onChange={(v) => patch("contact", { email: v })} />
              </div>
              <Field label="Map search query" value={content.contact.mapQuery} onChange={(v) => patch("contact", { mapQuery: v })} hint="Used to embed the Google map." />
            </Card>
            <Card title="Office hours">
              <Repeater
                label="Hours"
                items={content.contact.officeHours}
                onChange={(v) => patch("contact", { officeHours: v })}
                create={() => ({ day: "Monday – Friday", time: "9:00 AM – 4:00 PM" })}
                title={(item) => `${item.day} · ${item.time}`}
                render={(item, update) => (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Day(s)" value={item.day} onChange={(v) => update({ day: v })} />
                    <Field label="Time" value={item.time} onChange={(v) => update({ time: v })} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "visit":
        return (
          <div className="space-y-6">
            <SectionTitle title="Visit page" copy="The welcome copy and the four steps to a first Sunday." />
            <Card title="Welcome">
              <Area label="Intro" value={content.visit.intro} onChange={(v) => patch("visit", { intro: v })} rows={3} />
            </Card>
            <Card title="Steps">
              <Repeater
                label="Steps"
                items={content.visit.steps}
                onChange={(v) => patch("visit", { steps: v })}
                create={() => ({ title: "New step", text: "" })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="space-y-4">
                    <Field label="Title" value={item.title} onChange={(v) => update({ title: v })} />
                    <Area label="Text" value={item.text} onChange={(v) => update({ text: v })} rows={2} />
                  </div>
                )}
              />
            </Card>
          </div>
        );

      case "messages":
        return (
          <div className="space-y-6">
            <SectionTitle
              title="Messages"
              copy="Contact form, prayer requests, testimonies, and visit plans submitted through the website."
            />
            <div className="space-y-3">
              {content.messages.map((m) => (
                <div
                  key={m.id}
                  className={`admin-card rounded-xl p-5 ${m.read ? "opacity-70" : ""}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-gold-soft">
                        {m.type}
                      </span>
                      <p className="font-display text-lg text-ivory">{m.name}</p>
                      {!m.read ? <span className="h-1.5 w-1.5 rounded-full bg-gold" /> : null}
                    </div>
                    <span className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-ivory/30">
                      {timeAgo(m.createdAt)}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-[0.7rem] text-ivory/40">
                    {m.email ? (
                      <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-gold">
                        <Mail className="h-3 w-3" /> {m.email}
                      </a>
                    ) : null}
                    {m.phone ? (
                      <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-gold">
                        <Phone className="h-3 w-3" /> {m.phone}
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-[0.84rem] leading-relaxed text-ivory/70">
                    {m.message}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-ivory/8 pt-3">
                    <button
                      type="button"
                      onClick={() => messageAction(m.id, m.read ? "unread" : "read")}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ivory/40 hover:text-gold"
                    >
                      {m.read ? <RefreshCw className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                      Mark {m.read ? "unread" : "read"}
                    </button>
                    <button
                      type="button"
                      onClick={() => messageAction(m.id, "delete")}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ivory/30 hover:text-clay"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
              {content.messages.length === 0 ? (
                <div className="admin-card rounded-xl px-6 py-16 text-center">
                  <Inbox className="mx-auto h-8 w-8 text-ivory/20" />
                  <p className="mt-4 font-display text-xl text-ivory/70">Inbox zero.</p>
                  <p className="mt-1 text-[0.78rem] text-ivory/35">
                    Messages from the website will appear here.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  const current = nav.find((n) => n.key === section);
  const CurrentIcon = current?.icon ?? LayoutDashboard;

  return (
    <div className="admin-surface min-h-[100svh] text-ivory">
      <div className="mx-auto flex min-h-[100svh] max-w-[110rem]">
        {/* Sidebar */}
        <aside className="hidden w-[17rem] shrink-0 flex-col border-r border-ivory/10 lg:flex">
          <div className="flex h-[4.5rem] items-center gap-3 border-b border-ivory/10 px-5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 bg-gold/10">
              <Church className="h-4 w-4 text-gold" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-[0.98rem] text-ivory">Ifako First Baptist</p>
              <p className="font-mono text-[0.46rem] uppercase tracking-[0.24em] text-gold-soft/60">
                Church office
              </p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5">
            {groups.map((group) => (
              <div key={group} className="mb-5">
                <p className="px-3 pb-2 font-mono text-[0.48rem] uppercase tracking-[0.22em] text-ivory/25">
                  {group}
                </p>
                <div className="space-y-0.5">
                  {nav
                    .filter((n) => n.group === group)
                    .map((item) => {
                      const active = section === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setSection(item.key)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[0.8rem] transition-colors ${
                            active
                              ? "bg-gold/12 text-ivory"
                              : "text-ivory/50 hover:bg-ivory/[0.04] hover:text-ivory/85"
                          }`}
                        >
                          <item.icon
                            className={`h-4 w-4 ${active ? "text-gold" : "text-ivory/35"}`}
                            strokeWidth={1.5}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.key === "messages" && unread > 0 ? (
                            <span className="rounded-full bg-gold px-1.5 py-0.5 font-mono text-[0.5rem] text-ink">
                              {unread}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-ivory/10 p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[0.78rem] text-ivory/45 transition-colors hover:text-gold"
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.5} /> View website
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[0.78rem] text-ivory/45 transition-colors hover:text-clay"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} /> Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-[4.5rem] items-center justify-between gap-4 border-b border-ivory/10 bg-ink/85 px-4 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileNav(true)}
                className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 text-ivory/70 lg:hidden"
                aria-label="Open admin menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <CurrentIcon className="hidden h-4 w-4 text-gold/70 sm:block" />
              <div className="leading-tight">
                <p className="font-display text-[1rem] text-ivory">{current?.label ?? "Overview"}</p>
                <p className="hidden font-mono text-[0.46rem] uppercase tracking-[0.2em] text-ivory/30 sm:block">
                  {dirty ? "Unsaved changes" : "All changes saved"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {dirty ? (
                <button
                  type="button"
                  onClick={() => {
                    setContent(initial);
                    setDirty(false);
                  }}
                  className="hidden rounded-full border border-ivory/15 px-4 py-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ivory/50 transition-colors hover:text-ivory sm:inline-flex"
                >
                  Discard
                </button>
              ) : null}
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="btn btn-gold !px-5 !py-2.5 !text-[0.58rem] disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Saving
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" /> Save changes
                  </>
                )}
              </button>
            </div>
          </header>

          <main id="main" className="flex-1 px-4 py-7 md:px-8 md:py-10">
            <div className="mx-auto max-w-4xl">{renderSection()}</div>
          </main>

          <footer className="border-t border-ivory/8 px-6 py-4">
            <p className="text-center font-mono text-[0.48rem] uppercase tracking-[0.22em] text-ivory/20">
              Ifako First Baptist Church · Website administration
            </p>
          </footer>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileNav ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileNav}
        inert={!mobileNav}
      >
        <div
          className={`absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity ${
            mobileNav ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileNav(false)}
        />
        <div
          className={`admin-surface absolute inset-y-0 left-0 w-[80%] max-w-xs overflow-y-auto border-r border-ivory/10 transition-transform duration-500 ${
            mobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-ivory/10 px-5">
            <p className="font-display text-[0.98rem]">Church office</p>
            <button
              type="button"
              onClick={() => setMobileNav(false)}
              className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 text-ivory/60"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-3">
            {nav.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setSection(item.key);
                  setMobileNav(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[0.82rem] ${
                  section === item.key ? "bg-gold/12 text-ivory" : "text-ivory/55"
                }`}
              >
                <item.icon className="h-4 w-4 text-ivory/35" strokeWidth={1.5} />
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={logout}
              className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[0.82rem] text-ivory/45"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <div
          className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border px-5 py-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] shadow-2xl backdrop-blur ${
            toast.tone === "ok"
              ? "border-gold/40 bg-gold text-ink"
              : "border-clay/40 bg-clay text-ivory"
          }`}
        >
          {toast.text}
        </div>
      ) : null}
    </div>
  );
}

function SectionTitle({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ivory">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-[0.84rem] leading-relaxed text-ivory/40">{copy}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="admin-card space-y-5 rounded-xl p-5 md:p-6">
      <h2 className="border-b border-ivory/8 pb-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-gold-soft/70">
        {title}
      </h2>
      {children}
    </section>
  );
}
