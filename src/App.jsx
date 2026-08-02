// src/App.jsx
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Lenis from "lenis";
import heroImg from "./assets/hero.png";
import gallery4 from "./assets/hero.png";
import gallery8 from "./assets/react.webp";
import {
  Cake, Heart, Gem, Baby, Sparkles, PartyPopper,
  Phone, Mail, MapPin, Camera, ArrowRight, Star, X, Quote, Menu, MessageCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* SITE DATA — edit here                                              */
/* ------------------------------------------------------------------ */
const SITE = {
  brand: "Balloonique Decor",
  tagline: "Luxury Event Decoration",
  phones: ["+91 8368827064", "+91 7015767715"],
  email: "decorballoonique@gmail.com",
  city: "Delhi NCR, India",
  instagram: "https://instagram.com/balloonique_decor",
  intro: "We turn special days into memorable spaces — thoughtful, beautiful, and made to feel effortless.",
};
const waLink = `https://wa.me/${SITE.phones[0].replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi Balloonique Decor! I'd love a quote for my event."
)}`;

const SERVICES = [
  { icon: Cake, title: "Birthday Decor", text: "Thoughtful setups that feel joyful, polished and personal from the moment guests arrive." },
  { icon: Heart, title: "Anniversary", text: "Soft lighting, elegant florals and romantic details that make the evening feel special." },
  { icon: Gem, title: "Proposal Setup", text: "A memorable scene designed around the emotion of the moment — calm, cinematic and beautiful." },
  { icon: Baby, title: "Baby Shower", text: "Warm, dreamy spaces filled with gentle tones and details that feel welcoming and refined." },
  { icon: Sparkles, title: "Haldi & Mehndi", text: "Rich colour, texture and celebration — designed to feel festive without losing elegance." },
  { icon: PartyPopper, title: "Corporate & Launch", text: "Modern, brand-led setups that feel elevated, sharp and made to impress." },
];

const WHY = [
  { k: "01", t: "Designed Around Your Story", d: "We build every setup around your theme, venue and the feeling you want people to remember." },
  { k: "02", t: "Only the Finest Materials", d: "We use premium-quality balloons and decor elements that stay rich, smooth and beautiful throughout the event." },
  { k: "03", t: "Reliable from Start to Finish", d: "From planning to installation, we stay calm, organised and focused on making everything look effortless." },
  { k: "04", t: "Trusted by Many Happy Families", d: "We've styled hundreds of celebrations across Delhi NCR and know how to make each one feel personal." },
];

const STATS = [
  { n: 500, s: "+", l: "Events Styled" },
  { n: 8, s: "+", l: "Years of Craft" },
  { n: 100, s: "%", l: "On-Time Setup" },
  { n: 4.9, s: "★", l: "Client Rating" },
];

const PROCESS = [
  { t: "Talk to Us", d: "We start with your date, venue, ideas and the mood you want to create." },
  { t: "Plan the Look", d: "We shape the theme, palette and layout into something clear and beautiful." },
  { t: "Set It Up", d: "Our team installs everything with care so the space feels finished and welcoming." },
  { t: "Enjoy the Moment", d: "You walk in, relax and enjoy the celebration while we handle the details." },
];

const TESTIMONIALS = [
  { n: "Ananya & Rohit", r: "Proposal, The Leela", q: "It felt so elegant and thoughtful. Every detail was beautiful, and the atmosphere was exactly what we hoped for." },
  { n: "Priya Malhotra", r: "Daughter's 1st Birthday", q: "The whole setup felt warm and special. Guests kept asking who did it because it looked so polished." },
  { n: "Kabir Sethi", r: "Anniversary Surprise", q: "They turned our terrace into something that felt luxurious and intimate at the same time." },
];

// Swap these with your own imported images: import g1 from "./assets/g1.jpg"
const GALLERY = [
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=900&q=80",
  gallery4,
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
  "https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=900&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80",
  gallery8,
];
const HERO_IMG = heroImg;

const NAV_LINKS = [
  ["Services", "#services"],
  ["Why Us", "#why"],
  ["Gallery", "#gallery"],
  ["Process", "#process"],
  ["Reviews", "#reviews"],
];

/* ------------------------------------------------------------------ */
/* PRIMITIVES                                                          */
/* ------------------------------------------------------------------ */
const gold = "bg-gradient-to-r from-[#F6D7E6] via-[#D886A8] to-[#F6D7E6] bg-clip-text text-transparent";

function Reveal({ children, delay = 0, y = 30, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? (reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }) : {}}
      transition={{ duration: reduce ? 0.3 : 1, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word cinematic headline reveal */
function SplitText({ text, className = "", wordClass = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span ref={ref} className={className}>
        <span className={wordClass}>{text}</span>
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClass}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Magnetic button with gold sheen */
function MagneticButton({ children, href, variant = "solid", className = "", ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [p, setP] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setP({ x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35 });
  };
  const base =
    variant === "solid"
      ? "bg-gradient-to-r from-[#F5D0EC] to-[#D67CBF] text-[#35142B]"
      : "border border-[#D67CBF]/30 text-[#FBE9F1] backdrop-blur-md bg-[#F5D0EC]/10";
  return (
    <motion.a
      ref={ref}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={() => setP({ x: 0, y: 0 })}
      whileHover={{ y: -3, scale: 1.02, boxShadow: "0 14px 32px rgba(214,124,191,0.18)" }}
      whileTap={{ scale: 0.97 }}
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.45 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-[#F5D0EC] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${base} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.a>
  );
}

/** Count-up number */
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setV(to); return; }
    const dur = 1600, t0 = performance.now();
    let id;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, reduce]);
  const isFloat = !Number.isInteger(to);
  return (
    <span ref={ref} className={`text-4xl md:text-5xl font-light ${gold}`}>
      {isFloat ? v.toFixed(1) : Math.round(v)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ATMOSPHERE: noise, orbs, cursor glow, floating balloons             */
/* ------------------------------------------------------------------ */
function Balloon({ x, size, delay, dur, hue }) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-[50%]"
      style={{
        left: `${x}%`,
        width: size,
        height: size * 1.18,
        background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,.28), ${hue} 46%, rgba(17,14,12,.62) 100%)`,
        filter: "blur(.3px)",
        boxShadow: `0 0 42px ${hue}35`,
      }}
      initial={{ y: "110vh", opacity: 0 }}
      animate={{ y: "-25vh", opacity: [0, 0.55, 0.55, 0], x: [0, 12, -9, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      <span className="absolute left-1/2 top-full h-24 w-px -translate-x-1/2 bg-gradient-to-b from-white/40 to-transparent" />
    </motion.div>
  );
}

function Atmosphere() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [cur, setCur] = useState({ x: -300, y: -300 });

  useEffect(() => {
    if (reduce) return;
    const m = (e) => setCur({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", m, { passive: true });
    return () => window.removeEventListener("mousemove", m);
  }, [reduce]);

  const balloons = [
    { x: 6, size: 90, delay: 0, dur: 26, hue: "#D67CBF" },
    { x: 22, size: 56, delay: 5, dur: 32, hue: "#DEA3C7" },
    { x: 48, size: 70, delay: 11, dur: 29, hue: "#B27C9F" },
    { x: 71, size: 48, delay: 3, dur: 35, hue: "#F5E5F0" },
    { x: 88, size: 100, delay: 8, dur: 24, hue: "#D67CBF" },
  ];

  return (
    <>
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: bar }}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-[#D67CBF] to-[#F5D0EC]"
      />
      {!reduce && (
        <>
          {/* cursor glow */}
          <div
            className="pointer-events-none fixed z-0 h-[420px] w-[420px] rounded-full opacity-30 blur-[90px] transition-transform duration-300"
            style={{
              transform: `translate3d(${cur.x - 210}px, ${cur.y - 210}px, 0)`,
              background: "radial-gradient(circle, rgba(214,124,191,.20), transparent 65%)",
            }}
          />
          {/* orbs */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#D67CBF]/8 blur-[120px] animate-[orb_18s_ease-in-out_infinite]" />
            <div className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[#A962AB]/8 blur-[130px] animate-[orb_22s_ease-in-out_infinite_reverse]" />
            {balloons.map((b, i) => <Balloon key={i} {...b} />)}
          </div>
        </>
      )}
      {/* noise */}
      <div className="noise pointer-events-none fixed inset-0 z-[55] opacity-[0.05]" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* LOADER                                                              */
/* ------------------------------------------------------------------ */
function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1900);
    return () => clearTimeout(t);
  }, [reduce]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120613]"
          exit={{ opacity: 0, filter: reduce ? "none" : "blur(12px)" }}
          transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center">
            <motion.h1
              className={`font-serif text-3xl tracking-[0.35em] md:text-5xl ${gold}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.9em" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: reduce ? 0.2 : 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              BALLOONIQUE
            </motion.h1>
            <motion.div
              className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-[#D67CBF] to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 220 }}
              transition={{ duration: reduce ? 0.2 : 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* SECTION HELPERS                                                     */
/* ------------------------------------------------------------------ */
const Eyebrow = ({ children }) => (
  <div className="mb-5 flex items-center justify-center gap-3">
    <span className="h-px w-10 bg-[#D67CBF]/60" />
    <span className="text-[11px] uppercase tracking-[0.4em] text-[#E7A3D2]">{children}</span>
    <span className="h-px w-10 bg-[#D67CBF]/60" />
  </div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:py-40 ${className}`}>
    {children}
  </section>
);

/* ------------------------------------------------------------------ */
/* NAV                                                                 */
/* ------------------------------------------------------------------ */
function Nav() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const s = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || menuOpen ? "border-b border-white/10 bg-black/50 backdrop-blur-xl py-3" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className={`font-serif text-lg tracking-[0.25em] ${gold}`}>BALLOONIQUE</a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="relative text-xs uppercase tracking-[0.2em] text-white/60 transition hover:text-white">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href={waLink} className="!px-6 !py-3 !text-xs">
            Book Now <ArrowRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map(([l, h]) => (
                <li key={h}>
                  <a
                    href={h}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <MagneticButton href={waLink} className="!w-full !justify-center">
                  Book Now <ArrowRight className="h-3.5 w-3.5" />
                </MagneticButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduce) return;
    const h = (e) =>
      setM({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, [reduce]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: reduce ? "0%" : y }}
        className="absolute inset-0 bg-gradient-to-b from-[#120613]/90 via-[#120613]/70 to-[#120613]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <motion.div
          style={{ opacity: fade }}
          animate={reduce ? {} : { x: m.x * -14, y: m.y * -10 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="max-w-3xl text-left"
        >
          <Reveal delay={0.2}>
            <Eyebrow>{SITE.tagline} · {SITE.city}</Eyebrow>
          </Reveal>

          <h1 className="font-serif text-[13vw] leading-[0.9] tracking-tight md:text-[7.2vw]">
            <SplitText text="Moments That" className="block text-white/95" delay={0.35} />
            <SplitText text="Feel Like Cinema" className="block" wordClass={gold} delay={0.6} />
          </h1>

          <Reveal delay={1.1}>
            <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-white/65 md:text-lg">
              {SITE.intro}
            </p>
          </Reveal>

          <Reveal delay={1.25}>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Same-day styling', 'Premium imported materials', '500+ events styled'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/8 px-3.5 py-2 text-[11px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-md">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href={waLink}>Plan My Event <ArrowRight className="h-4 w-4" /></MagneticButton>
              <MagneticButton href="#gallery" variant="ghost">View Gallery</MagneticButton>
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0], rotate: [0, 0.6, 0] }}
          transition={reduce
            ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            : { duration: 1.1, delay: 0.6, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
          className="hero-panel"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.05] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="hero-panel__glow" />
            <div className="relative h-[360px] w-full overflow-hidden rounded-[1.4rem] bg-[#120613] md:h-[440px]">
              <motion.img
                src={HERO_IMG}
                alt="A Balloonique Decor luxury balloon installation"
                style={{ scale: reduce ? 1 : scale }}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120613] via-[#120613]/25 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <motion.div
                animate={reduce ? {} : { y: [0, -3, 0], scale: [1, 1.01, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex rounded-full border border-[#D67CBF]/35 bg-[#D67CBF]/12 px-3.5 py-2 text-[11px] uppercase tracking-[0.26em] text-[#F5CFE3]"
              >
                Luxury installation • curated by hand
              </motion.div>
              <motion.p
                initial={{ opacity: 0.8 }}
                animate={reduce ? { opacity: 1 } : { opacity: [0.8, 1, 0.85] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 max-w-md text-sm font-light leading-relaxed text-white/80"
              >
                We create spaces that feel calm, elegant and full of life — the kind of setting people remember long after the event ends.
              </motion.p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Bespoke themes', 'Flawless install', 'Punctual delivery'].map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0.7, y: 6 }}
                    animate={reduce ? { opacity: 1, y: 0 } : { opacity: [0.7, 1, 0.8], y: [6, 0, 4] }}
                    transition={{ duration: 2.6 + idx * 0.3, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
                    className="rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/65"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        animate={reduce ? {} : { y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-12 w-px bg-gradient-to-b from-[#D67CBF] to-transparent" />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */
function ServiceCard({ s, i }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [g, setG] = useState({ x: 50, y: 50, on: false });
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setG({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };
  const Icon = s.icon;

  return (
    <Reveal delay={i * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setG((p) => ({ ...p, on: false }))}
        whileHover={{ y: -8, scale: 1.01, boxShadow: "0 24px 60px rgba(184,137,79,0.12)" }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-9 backdrop-blur-xl transition-all duration-500 hover:border-[#D67CBF]/35"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            opacity: g.on ? 1 : 0,
            background: `radial-gradient(340px circle at ${g.x}% ${g.y}%, rgba(184,137,79,.16), transparent 70%)`,
          }}
        />
        <motion.div
          className="relative"
          animate={reduce ? {} : { rotate: [0, -2, 2, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon className="h-8 w-8 text-[#E7A3D2]" strokeWidth={1.2} />
        </motion.div>
        <h3 className="relative mt-7 font-serif text-2xl text-white">{s.title}</h3>
        <p className="relative mt-3 text-sm font-light leading-relaxed text-white/55">{s.text}</p>
        <div className="relative mt-7 h-px w-0 bg-gradient-to-r from-[#D67CBF] to-transparent transition-all duration-500 group-hover:w-full" />
      </motion.div>
    </Reveal>
  );
}

function Services() {
  return (
    <Section id="services">
      <Reveal className="text-center">
        <Eyebrow>Signature Experiences</Eyebrow>
        <h2 className="font-serif text-4xl md:text-6xl">
          <SplitText text="Every Occasion," className="text-white/95" />
          <SplitText text="Elevated." wordClass={gold} delay={0.15} />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-white/60">
          Every setup is designed to feel effortless, elevated and true to the people celebrating — never too loud, never too plain.
        </p>
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* WHY US + STATS                                                      */
/* ------------------------------------------------------------------ */
function WhyUs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <Section id="why">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>Why Balloonique</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              <span className="text-white/95">Obsessive detail. </span>
              <span className={gold}>Effortless for you.</span>
            </h2>
          </Reveal>

          <div ref={ref} className="relative mt-12 pl-10">
            <div className="absolute left-[3px] top-2 h-full w-px bg-white/10" />
            <motion.div style={{ height: h }} className="absolute left-[3px] top-2 w-px bg-gradient-to-b from-[#D67CBF] to-[#F5D0EC]" />
            {WHY.map((w, i) => (
              <Reveal key={w.k} delay={i * 0.1} className="relative mb-10">
                <span className="absolute -left-10 top-1.5 h-2 w-2 rounded-full bg-[#D67CBF] shadow-[0_0_16px_#D67CBF]/40" />
                <span className="text-[11px] tracking-[0.35em] text-[#E7A3D2]">{w.k}</span>
                <h3 className="mt-2 font-serif text-2xl text-white">{w.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/55">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 self-start lg:sticky lg:top-32">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl"
              >
                <Counter to={s.n} suffix={s.s} />
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/45">{s.l}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* GALLERY (masonry + tilt + lightbox)                                 */
/* ------------------------------------------------------------------ */
function TiltImage({ src, onClick, i }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setT({ ry: ((e.clientX - r.left) / r.width - 0.5) * 12, rx: -((e.clientY - r.top) / r.height - 0.5) * 12 });
  };
  return (
    <Reveal delay={(i % 3) * 0.08}>
      <motion.button
        type="button"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        onClick={onClick}
        aria-label={`Open gallery photo ${i + 1} in a larger view`}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{ transform: reduce ? undefined : `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
        className="group relative mb-6 block w-full overflow-hidden rounded-2xl border border-white/10 outline-none transition-transform duration-300 will-change-transform focus-visible:ring-2 focus-visible:ring-[#F5D0EC]"
      >
        <img
          src={src}
          alt={`Balloonique Decor event setup ${i + 1}`}
          loading="lazy"
          className="w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      </motion.button>
    </Reveal>
  );
}

function Gallery() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Section id="gallery">
      <Reveal className="text-center">
        <Eyebrow>Portfolio</Eyebrow>
        <h2 className="font-serif text-4xl md:text-6xl">
          <SplitText text="Our" className="text-white/95" />
          <SplitText text="Signature Work" wordClass={gold} delay={0.12} />
        </h2>
      </Reveal>

      <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {GALLERY.map((src, i) => (
          <div key={i} className="relative">
            <TiltImage src={src} i={i} onClick={() => setOpen(src)} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged gallery photo"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute right-8 top-8 text-white/70 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-[#F5D0EC]"
              aria-label="Close enlarged photo"
            >
              <X className="h-7 w-7" />
            </button>
            <motion.img
              src={open} alt="Balloonique Decor setup enlarged"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl border border-[#D67CBF]/25 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* PROCESS                                                             */
/* ------------------------------------------------------------------ */
function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 70%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <Section id="process">
      <Reveal className="text-center">
        <Eyebrow>How It Works</Eyebrow>
        <h2 className="font-serif text-4xl md:text-6xl">
          <SplitText text="Four Steps To" className="text-white/95" />
          <SplitText text="Breathtaking" wordClass={gold} delay={0.12} />
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-20">
        <div className="absolute left-0 top-7 hidden h-px w-full bg-white/10 md:block" />
        <motion.div style={{ width: w }} className="absolute left-0 top-7 hidden h-px bg-gradient-to-r from-[#D67CBF] to-[#F5D0EC] md:block" />
        <div className="grid gap-12 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D67CBF]/35 bg-[#120613] font-serif text-lg text-[#E7A3D2]">
                  {i + 1}
                </div>
                <h3 className="mt-6 font-serif text-2xl text-white">{p.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/55">{p.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* TESTIMONIALS                                                        */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const t = TESTIMONIALS[i];
  return (
    <Section id="reviews">
      <Reveal className="text-center">
        <Eyebrow>Kind Words</Eyebrow>
        <h2 className="font-serif text-4xl md:text-6xl">
          <SplitText text="Loved By" className="text-white/95" />
          <SplitText text="Our Clients" wordClass={gold} delay={0.12} />
        </h2>
      </Reveal>

      <div
        className="relative mx-auto mt-16 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl md:p-14">
          <Quote className="mx-auto h-8 w-8 text-[#E7A3D2]/70" strokeWidth={1.2} />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="mt-7 font-serif text-2xl font-light leading-relaxed text-white/85 md:text-3xl">&ldquo;{t.q}&rdquo;</p>
              <div className="mt-8 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-[#E7A3D2] text-[#E7A3D2]" />
                ))}
              </div>
              <p className={`mt-4 text-sm tracking-[0.2em] ${gold}`}>{t.n}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">{t.r}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button
              type="button"
              key={k} onClick={() => setI(k)} aria-label={`Show review ${k + 1} of ${TESTIMONIALS.length}`}
              aria-current={k === i}
              className={`h-1.5 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#F5D0EC] ${k === i ? "w-8 bg-[#E7A3D2]" : "w-1.5 bg-white/25"}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA + FOOTER                                                        */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <Section className="!py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#D67CBF]/20 bg-gradient-to-br from-[#D67CBF]/10 via-white/[0.03] to-transparent p-12 text-center backdrop-blur-xl md:p-24">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D67CBF]/12 blur-[100px]" />
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-[#D67CBF]/15" />
          <h2 className="relative font-serif text-4xl leading-tight md:text-6xl">
            <span className="text-white/95">Let's design your </span>
            <span className={gold}>unforgettable day.</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl font-light text-white/60">
            We take on a limited number of celebrations each month so every project gets the care it deserves. Tell us your date and let's make it feel truly special.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={waLink}>WhatsApp Us <ArrowRight className="h-4 w-4" /></MagneticButton>
            <MagneticButton href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} variant="ghost">
              <Phone className="h-4 w-4" /> {SITE.phones[0]}
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        <div>
          <h3 className={`font-serif text-2xl tracking-[0.2em] ${gold}`}>BALLOONIQUE</h3>
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/50">
            Luxury event decoration studio crafting thoughtful, elegant celebrations across {SITE.city}.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/40">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            {SITE.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[#E7A3D2]">
                  <Phone className="h-4 w-4 text-[#E7A3D2]" /> {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-[#E7A3D2]">
                <Mail className="h-4 w-4 text-[#E7A3D2]" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#E7A3D2]" /> {SITE.city}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/40">Follow</h4>
          <a
            href={SITE.instagram} target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 backdrop-blur-md transition hover:border-[#D67CBF]/40 hover:text-[#E7A3D2]"
          >
            <Camera className="h-4 w-4" /> @balloonique_decor
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wider text-white/35">
        © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* APP                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  // Lenis smooth scroll — skipped entirely if the user prefers reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.09 });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  // SEO (title, description, JSON-LD) without extra deps
  useEffect(() => {
    document.title = "Balloonique Decor | Luxury Balloon & Event Decoration in Delhi NCR";
    const meta = (attr, key, val) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    const desc = "Balloonique Decor creates luxury balloon decor for birthdays, anniversaries, proposals and baby showers across Delhi NCR. Book your cinematic setup today.";
    meta("name", "description", desc);
    meta("property", "og:title", "Balloonique Decor | Luxury Event Decoration");
    meta("property", "og:description", desc);
    meta("property", "og:type", "website");
    meta("property", "og:image", HERO_IMG);
    meta("name", "twitter:card", "summary_large_image");

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE.brand,
      description: desc,
      telephone: SITE.phones[0],
      email: SITE.email,
      url: typeof window !== "undefined" ? window.location.origin : undefined,
      address: { "@type": "PostalAddress", addressLocality: "Delhi NCR", addressCountry: "IN" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "180" },
    });
    document.head.appendChild(ld);
    return () => ld.remove();
  }, []);

  const clickTimer = useRef({ whatsapp: 0, phone: 0 });

  const openContactAction = (type, idx) => {
    const number = (SITE.phones[idx] || SITE.phones[0]).replace(/\D/g, "");
    if (type === "whatsapp") {
      const waUrl = `https://wa.me/${number}?text=${encodeURIComponent("Hi Balloonique Decor! I'd love a quote for my event.")}`;
      window.open(waUrl, "_blank");
    } else {
      window.location.href = `tel:${number}`;
    }
  };

  const handleContactClick = (type) => {
    if (clickTimer.current[type]) {
      window.clearTimeout(clickTimer.current[type]);
      clickTimer.current[type] = 0;
      openContactAction(type, 1);
      return;
    }

    clickTimer.current[type] = window.setTimeout(() => {
      openContactAction(type, 0);
      clickTimer.current[type] = 0;
    }, 260);
  };

  return (
    <div className="relative min-h-screen bg-[#120613] font-sans text-white antialiased selection:bg-[#D67CBF]/30">
      <Loader />
      <Atmosphere />
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Gallery />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      <div className="pointer-events-none fixed right-6 top-1/2 z-50 flex w-max -translate-y-1/2 flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => handleContactClick("whatsapp")}
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#120613]/90 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(214,124,191,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#2a0e25]/95"
        >
          <MessageCircle className="h-5 w-5 text-[#E7A3D2]" />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => handleContactClick("phone")}
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#120613]/90 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(214,124,191,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#2a0e25]/95"
        >
          <Phone className="h-5 w-5 text-[#E7A3D2]" />
          Call
        </button>
      </div>
    </div>
  );
}
