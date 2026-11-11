"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  mono = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <input
        className={`admin-input ${mono ? "font-mono text-[0.82rem]" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="mt-1 block text-[0.65rem] text-ivory/30">{hint}</span> : null}
    </label>
  );
}

export function Area({
  label,
  value,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <textarea
        className="admin-input resize-y leading-relaxed"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <span className="mt-1 block text-[0.65rem] text-ivory/30">{hint}</span> : null}
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <select
        className="admin-input appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-ink text-ivory">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-ivory/12 bg-ivory/[0.03] px-4 py-3">
      <span className="text-[0.82rem] text-ivory/75">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-gold" : "bg-ivory/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink transition-transform ${
            checked ? "translate-x-[1.4rem]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

export function StringList({
  label,
  items,
  onChange,
  rows = 4,
  hint,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      <textarea
        className="admin-input resize-y leading-relaxed"
        rows={rows}
        value={items.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
      <span className="mt-1 block text-[0.65rem] text-ivory/30">
        {hint ?? "One entry per line."}
      </span>
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="flex gap-3">
        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md border border-ivory/15 bg-ivory/5">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-ivory/25">
              <ImagePlus className="h-5 w-5" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            className="admin-input font-mono text-[0.78rem]"
            value={value}
            placeholder="/images/... or https://..."
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ivory/60 transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
              {busy ? "Uploading" : "Upload"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 text-[0.6rem] text-ivory/30 hover:text-clay"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            ) : null}
            {error ? <span className="text-[0.62rem] text-clay">{error}</span> : null}
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export function Repeater<T>({
  label,
  items,
  onChange,
  create,
  render,
  title,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  title: (item: T, index: number) => string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  function update(index: number, patch: Partial<T>) {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function move(index: number, dir: number) {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpen(target);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="admin-label !mb-0">{label}</span>
        <button
          type="button"
          onClick={() => {
            onChange([...items, create()]);
            setOpen(items.length);
          }}
          className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-gold-soft transition-colors hover:bg-gold hover:text-ink"
        >
          + Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={index} className="overflow-hidden rounded-lg border border-ivory/10 bg-ivory/[0.025]">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span className="font-mono text-[0.55rem] text-ivory/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[0.82rem] text-ivory/80">
                    {title(item, index) || "Untitled"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="px-1 text-ivory/30 hover:text-ivory disabled:opacity-20"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className="px-1 text-ivory/30 hover:text-ivory disabled:opacity-20"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange(items.filter((_, i) => i !== index));
                    setOpen(null);
                  }}
                  className="px-1 text-ivory/30 hover:text-clay"
                  aria-label="Delete item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              {isOpen ? (
                <div className="space-y-4 border-t border-ivory/10 bg-ink/30 p-4">
                  {render(item, (patch) => update(index, patch), index)}
                </div>
              ) : null}
            </div>
          );
        })}
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-ivory/10 px-4 py-6 text-center text-[0.75rem] text-ivory/30">
            No entries yet. Use “Add” to create one.
          </p>
        ) : null}
      </div>
    </div>
  );
}
