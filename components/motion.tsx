"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Lenis from "lenis";

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "fade" | "left" | "right" | "scale" | "mask";
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Line-by-line masked headline reveal                                 */
/* ------------------------------------------------------------------ */
export function SplitText({
  lines,
  className,
  delay = 0,
  trigger = "view",
  accent,
  accentClassName,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  trigger?: "view" | "mount";
  /** Extra final line (e.g. the italic "& joy."). Rendered inside the same
   *  wrapper so it receives the `split-in` class and actually reveals. */
  accent?: string;
  accentClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("split-in");
      return;
    }
    if (trigger === "mount") {
      const t = window.setTimeout(() => el.classList.add("split-in"), 120);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("split-in");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="split-line" key={`${line}-${i}`}>
          <span style={{ "--line-delay": `${delay + i * 95}ms` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
      {accent ? (
        <span className="split-line">
          <span
            className={accentClassName}
            style={{ "--line-delay": `${delay + lines.length * 95}ms` } as CSSProperties}
          >
            {accent}
          </span>
        </span>
      ) : null}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic wrapper                                                    */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 3D tilt card                                                        */
/* ------------------------------------------------------------------ */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax                                                            */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  distance = 70,
  className,
  scale = false,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const sc = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        style={{ y, scale: scale ? sc : 1, height: "100%", width: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee                                                             */
/* ------------------------------------------------------------------ */
export function Marquee({
  children,
  speed = 38,
  reverse = false,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`marquee ${className ?? ""}`}>
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={
          {
            "--marquee-speed": `${speed}s`,
            animationPlayState: pauseOnHover ? undefined : "running",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Count up                                                            */
/* ------------------------------------------------------------------ */
export function CountUp({
  value,
  className,
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const numeric = useMemo(() => {
    const n = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : null;
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || numeric === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pad = value.replace(/[0-9.]/g, "").length === 0 && value.startsWith("0") ? value.length : 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = Math.round(numeric * eased);
        setDisplay(pad ? String(current).padStart(pad, "0") : String(current));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [numeric, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

/* ------------------------------------------------------------------ */
/* Custom cursor                                                       */
/* ------------------------------------------------------------------ */
export function Cursor() {
  const lensRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lens = lensRef.current;
    const dot = dotRef.current;
    if (!lens || !dot) return;

    document.documentElement.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lx = mx;
    let ly = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 2.5}px, ${my - 2.5}px, 0)`;
    };

    const loop = () => {
      lx += (mx - lx) * 0.16;
      ly += (my - ly) * 0.16;
      lens.style.transform = `translate3d(${lx - 22}px, ${ly - 22}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor='grow'], input, textarea, select",
      );
      const isField = target.closest("input, textarea, select");
      lens.style.width = interactive ? "68px" : "44px";
      lens.style.height = interactive ? "68px" : "44px";
      lens.style.backgroundColor = interactive ? "rgba(194,160,90,0.9)" : "transparent";
      lens.style.opacity = isField ? "0" : "1";
      dot.style.opacity = isField ? "0" : "1";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={lensRef} className="cursor-lens" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress                                                     */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? h.scrollTop / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-[90] h-[2px] bg-gold transition-[width] duration-150"
      style={{ width: `${progress * 100}%` }}
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-lit paragraph                                                */
/* ------------------------------------------------------------------ */
export function LitParagraph({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll("span").forEach((s) => s.classList.add("lit"));
      return;
    }
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const end = vh * 0.18;
      const raw = (start - r.top) / (start - end + r.height * 0.4);
      const p = Math.max(0, Math.min(1, raw));
      const lit = Math.floor(p * words.length * 1.15);
      el.querySelectorAll("span").forEach((s, i) => {
        s.classList.toggle("lit", i < lit);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={`word-fade ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>{w} </span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */
export function Preloader({ label }: { label: string }) {
  const [done, setDone] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("ifbc-intro");
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    setDone(false);
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("ifbc-intro", "1");
        window.setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-ink text-ivory transition-transform duration-[900ms] ease-[cubic-bezier(.83,0,.17,1)] ${
        count >= 100 ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden
    >
      <div className="relative flex flex-col items-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-gold">
          {label}
        </span>
        <div className="mt-8 h-px w-44 overflow-hidden bg-ivory/15">
          <div
            className="h-full bg-gold transition-[width] duration-150"
            style={{ width: `${count}%` }}
          />
        </div>
        <span className="mt-5 font-display text-5xl text-ivory/90">{count}</span>
      </div>
      <span className="absolute bottom-10 font-mono text-[0.55rem] uppercase tracking-[0.35em] text-ivory/55">
        Sanctuary of Truth &amp; Joy
      </span>
    </div>
  );
}
