// src/App.jsx
import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
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
import { Eyebrow, gold, MagneticButton, Reveal, Section, SplitText } from "./components/SectionPrimitives";
import { getImageDimensions } from "./imageDimensions";
import heroPhoto from "./assets/hero-birthday.jpg";
import Img0752 from "./assets/IMG_0752.jpg";
import Img0754 from "./assets/IMG_0754.jpg";
import Img0759 from "./assets/IMG_0759.jpg";
import Img0761 from "./assets/IMG_0761.jpg";
import Img0762 from "./assets/IMG_0762.jpg";
import Img0764 from "./assets/IMG_0764.jpg";
import Img0765 from "./assets/IMG_0765.jpg";
import Img0767 from "./assets/IMG_0767.jpg";
import Img0774 from "./assets/IMG_0774.jpg";
import Img0775 from "./assets/IMG_0775.jpg";
import Img0776 from "./assets/IMG_0776.jpg";
import Img0777 from "./assets/IMG_0777.jpg";
import Img0784 from "./assets/IMG_0784.jpg";
import Img0785 from "./assets/IMG_0785.jpg";
import Img0786 from "./assets/IMG_0786.jpg";
import Img0792 from "./assets/IMG_0792.jpg";
import Img0793 from "./assets/IMG_0793.jpg";
import Img0794 from "./assets/IMG_0794.jpg";
import Img0796 from "./assets/IMG_0796.jpg";
import Img0800 from "./assets/IMG_0800.jpg";
import Img0804 from "./assets/IMG_0804.jpg";
import Img0807 from "./assets/IMG_0807.jpg";
import Img0749 from "./assets/IMG_0749.jpg";
import Img0748 from "./assets/IMG_0748.jpg";
import Img0766 from "./assets/IMG_0766.jpg";

import Img0770 from "./assets/IMG_0770.jpg";
import Img0769 from "./assets/IMG_0769.jpg";
import Img0768 from "./assets/IMG_0768.jpg";
import Img0787 from "./assets/IMG_0787.jpg";
import Img0789 from "./assets/IMG_0789.jpg";
import Img0790 from "./assets/IMG_0790.jpg";
import Img0791 from "./assets/IMG_0791.jpg";
import Img0788 from "./assets/IMG_0788.jpg";
import Img0771 from "./assets/IMG_0771.jpg";
import Img0772 from "./assets/IMG_0772.jpg";
import Img0773 from "./assets/IMG_0773.jpg";
import Img0797 from "./assets/IMG_0797.jpg";
import Img0795 from "./assets/IMG_0795.jpg";
import Img0801 from "./assets/IMG_0801.jpg";
import Img0803 from "./assets/IMG_0803.jpg";
import Img0802 from "./assets/IMG_0802.jpg";
import Img0799 from "./assets/IMG_0799.jpg";
import Img0810 from "./assets/IMG_0810.jpg";
import Img0809 from "./assets/IMG_0809.jpg";





import {
  Cake, Heart, Gem, Baby, Sparkles, PartyPopper, CalendarDays, Star,
  Phone, ArrowRight, X, Menu,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* SITE DATA — edit here                                              */
/* ------------------------------------------------------------------ */
const SITE = {
brand: "Balloonique Decor",
tagline: "Luxury Event Decoration",
phone: "+91 8368827064",
phoneLink: "tel:+918368827064",
alternatePhone: "+91 7015767715",
alternatePhoneLink: "tel:+917015767715",
email: "decorballoonique@gmail.com",
city: "Gurugram, India",
instagram: "https://instagram.com/ballooniquedecor1",
intro: "We turn special days into memorable spaces — thoughtful, beautiful, and made to feel effortless.",
};

const SERVICES = [
  {
icon: Cake,
title: "Birthday Decor",
text: "Thoughtful setups that feel joyful, polished and personal from the moment guests arrive.",
images: [Img0752, Img0754, Img0759, Img0761, Img0749, Img0764, Img0748],
  },
  {
icon: Heart,
title: "Anniversary",
text: "Soft lighting, elegant florals and romantic details that make the evening feel special.",
images: [Img0762, Img0765, Img0767, Img0766, Img0768, Img0769, Img0770],
  },
  {
icon: Gem,
title: "Proposal Setup",
text: "A memorable scene designed around the emotion of the moment — calm, cinematic and beautiful.",
images: [Img0790,Img0791,Img0789,Img0787,Img0788,Img0786,Img0784,Img0785],
  },
  {
icon: Baby,
title: "Baby Shower",
text: "Warm, dreamy spaces filled with gentle tones and details that feel welcoming and refined.",
images: [Img0776,Img0777,Img0775,Img0774,Img0771,Img0772,Img0773],
  },
  {
icon: Sparkles,
title: "Haldi & Mehndi",
text: "Rich colour, texture and celebration — designed to feel festive without losing elegance.",
images: [Img0797,Img0795,Img0796,Img0794,Img0793,Img0792],
  },
  {
icon: PartyPopper,
title: "Corporate & Launch",
text: "Modern, brand-led setups that feel elevated, sharp and made to impress.",
images: [Img0800,Img0801,Img0804,Img0803,Img0802,Img0799,Img0810,Img0809],
  },
];

const WHY = [
  { k: "01", t: "Designed Around Your Story", d: "We build every setup around your theme, venue and the feeling you want people to remember." },
  { k: "02", t: "Only the Finest Materials", d: "We use premium-quality balloons and decor elements that stay rich, smooth and beautiful throughout the event." },
  { k: "03", t: "Reliable from Start to Finish", d: "From planning to installation, we stay calm, organised and focused on making everything look effortless." },
  { k: "04", t: "Trusted by Many Happy Families", d: "We've styled hundreds of celebrations across Gurugram  and know how to make each one feel personal." },
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
Img0807,
Img0796,
Img0785,
Img0777,
Img0765,
Img0767,
Img0774,
];
const HERO_IMG = heroPhoto;

const NAV_LINKS = [
  ["Services", "#services"],
  ["Why Us", "#why"],
  ["Gallery", "#gallery"],
  ["Process", "#process"],
  ["Reviews", "#reviews"],
];

const HERO_FEATURES = [
  { icon: CalendarDays, label: "Same-Day Styling" },
  { icon: Gem, label: "Premium Materials" },
  { icon: Star, label: "500+ Events Styled" },
];

/** Count-up number */
const Counter = memo(function Counter({ to, suffix = "" }) {
const ref = useRef(null);
const inView = useInView(ref, { once: true });
const reduce = useReducedMotion();
useEffect(() => {
if (!inView) return;
const format = (value) => Number.isInteger(to) ? String(Math.round(value)) : value.toFixed(1);
if (reduce) {
if (ref.current) ref.current.textContent = format(to);
return;
}
const dur = 1600, t0 = performance.now();
let id;
const tick = (t) => {
const p = Math.min((t - t0) / dur, 1);
if (ref.current) ref.current.textContent = format(to * (1 - Math.pow(1 - p, 3)));
if (p < 1) id = requestAnimationFrame(tick);
    };
id = requestAnimationFrame(tick);
return () => cancelAnimationFrame(id);
  }, [inView, to, reduce]);
return (
<span className={`text-4xl md:text-5xl font-light ${gold}`}>
<span ref={ref}>{Number.isInteger(to) ? "0" : "0.0"}</span>
{suffix}
</span>
  );
});

/* ------------------------------------------------------------------ */
/* ATMOSPHERE: noise, orbs, cursor glow, floating balloons             */
/* ------------------------------------------------------------------ */
const ATMOSPHERE_BALLOONS = [
  { x: 6, size: 90, delay: 0, dur: 26, hue: "#D67CBF" },
  { x: 22, size: 56, delay: 5, dur: 32, hue: "#DEA3C7" },
  { x: 48, size: 70, delay: 11, dur: 29, hue: "#B27C9F" },
  { x: 71, size: 48, delay: 3, dur: 35, hue: "#F5E5F0" },
  { x: 88, size: 100, delay: 8, dur: 24, hue: "#D67CBF" },
];

const Balloon = memo(function Balloon({ x, size, delay, dur, hue }) {
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
});

const Atmosphere = memo(function Atmosphere({ heroRef }) {
const reduce = useReducedMotion();
const heroInView = useInView(heroRef, { amount: 0.2 });
const { scrollYProgress } = useScroll();
const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
const cursorRef = useRef(null);
const skipHeavy = reduce || window.matchMedia("(max-width: 767px)").matches;

useEffect(() => {
if (skipHeavy || !heroInView) return undefined;
let frame = 0;
let pointerX = -300;
let pointerY = -300;
const update = (event) => {
pointerX = event.clientX;
pointerY = event.clientY;
if (frame) return;
frame = requestAnimationFrame(() => {
if (cursorRef.current) {
cursorRef.current.style.transform = `translate3d(${pointerX - 210}px, ${pointerY - 210}px, 0)`;
}
frame = 0;
});
};
window.addEventListener("mousemove", update, { passive: true });
return () => {
window.removeEventListener("mousemove", update);
if (frame) cancelAnimationFrame(frame);
};
  }, [heroInView, skipHeavy]);

return (
<>
{/* scroll progress */}
<motion.div
style={{ scaleX: bar }}
className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-[#D67CBF] to-[#F5D0EC]"
/>
{!skipHeavy && (
<>
{/* cursor glow */}
<div
ref={cursorRef}
className="pointer-events-none fixed z-0 h-[420px] w-[420px] rounded-full opacity-30 blur-[90px] transition-transform duration-300"
style={{ background: "radial-gradient(circle, rgba(214,124,191,.20), transparent 65%)" }}
/>
{/* orbs */}
<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
<div className={`absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#D67CBF]/8 blur-[120px] ${heroInView ? "animate-[orb_18s_ease-in-out_infinite]" : ""}`} />
<div className={`absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[#A962AB]/8 blur-[130px] ${heroInView ? "animate-[orb_22s_ease-in-out_infinite_reverse]" : ""}`} />
{heroInView && ATMOSPHERE_BALLOONS.map((balloon) => <Balloon key={balloon.x} {...balloon} />)}
</div>
</>
      )}
{/* noise */}
<div className="noise pointer-events-none fixed inset-0 z-[55] opacity-[0.05]" />
</>
  );
});

/* ------------------------------------------------------------------ */
/* LOADER                                                              */
/* ------------------------------------------------------------------ */
const Loader = memo(function Loader() {
const reduce = useReducedMotion();
const [done, setDone] = useState(false);
useEffect(() => {
const isMobile = window.innerWidth < 768;
const t = setTimeout(() => setDone(true), reduce ? 200 : isMobile ? 900 : 1900);
return () => clearTimeout(t);
  }, [reduce]);
return (
<AnimatePresence>
{!done && (
<motion.div
className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120613]"
exit={{ opacity: 0 }}
transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
>
<div className="text-center">
<motion.h1
className={`font-serif text-3xl tracking-[0.35em] md:text-5xl ${gold}`}
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: reduce ? 0.2 : 1.6, ease: [0.16, 1, 0.3, 1] }}
>
              BALLOONIQUE
</motion.h1>
<motion.div
className="mx-auto mt-6 h-px w-[220px] origin-center bg-gradient-to-r from-transparent via-[#D67CBF] to-transparent"
initial={{ scaleX: 0 }}
animate={{ scaleX: 1 }}
transition={{ duration: reduce ? 0.2 : 1.5, ease: "easeInOut" }}
/>
</div>
</motion.div>
      )}
</AnimatePresence>
  );
});

/* ------------------------------------------------------------------ */
/* NAV                                                                 */
/* ------------------------------------------------------------------ */
const Nav = memo(function Nav({ onLowerSectionNavigate }) {
const [solid, setSolid] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const solidRef = useRef(false);
useEffect(() => {
let frame = 0;
const update = () => {
if (frame) return;
frame = requestAnimationFrame(() => {
frame = 0;
const nextSolid = window.scrollY > 40;
if (nextSolid !== solidRef.current) {
solidRef.current = nextSolid;
setSolid(nextSolid);
}
});
};
update();
window.addEventListener("scroll", update, { passive: true });
return () => {
window.removeEventListener("scroll", update);
if (frame) cancelAnimationFrame(frame);
};
 }, []);
const handleNavClick = useCallback((event, href) => {
setMenuOpen(false);
const targetId = href.slice(1);
if (["gallery", "process", "reviews", "contact"].includes(targetId) && !document.getElementById(targetId)) {
event.preventDefault();
onLowerSectionNavigate?.(targetId);
}
}, [onLowerSectionNavigate]);

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
<a href={h} onClick={(event) => handleNavClick(event, h)} className="relative text-xs uppercase tracking-[0.2em] text-white/60 transition hover:text-white">
{l}
</a>
</li>
          ))}
</ul>

<div className="hidden md:block">
<MagneticButton href={SITE.phoneLink} className="!px-6 !py-3 !text-xs">
           📞 {SITE.phone}
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
initial={{ opacity: 0, y: -8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -8 }}
transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
className="overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur-xl md:hidden"
>
<ul className="flex flex-col gap-1 px-6 py-6">
{NAV_LINKS.map(([l, h]) => (
<li key={h}>
<a
href={h}
onClick={(event) => handleNavClick(event, h)}
className="block py-3 text-sm uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
>
{l}
</a>
</li>
              ))}
<li className="pt-3">
<MagneticButton href={SITE.phoneLink} className="!w-full !justify-center">
                  {SITE.phone}
</MagneticButton>
</li>
</ul>
</motion.div>
        )}
</AnimatePresence>
</header>
  );
});

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */
const HeroOfferBadge = memo(function HeroOfferBadge() {
  return (
    <div className="hero-offer-badge" aria-label="Limited-time offer: flat 20 percent off">
      <svg aria-hidden="true" viewBox="0 0 240 270" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="offer-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#541642" />
            <stop offset="0.5" stopColor="#2b1029" />
            <stop offset="1" stopColor="#7b3155" />
          </linearGradient>
          <linearGradient id="offer-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe7bd" />
            <stop offset="0.45" stopColor="#e9a1ca" />
            <stop offset="1" stopColor="#fff0cf" />
          </linearGradient>
        </defs>
        <path
          d="M120 28 134 37 151 33 162 47 180 47 187 64 204 72 204 91 219 103 213 121 223 137 212 153 215 172 198 183 194 202 175 208 165 225 145 222 120 247 95 222 75 225 65 208 46 202 42 183 25 172 28 153 17 137 27 121 21 103 36 91 36 72 53 64 60 47 78 47 89 33 106 37Z"
          fill="url(#offer-fill)"
          stroke="url(#offer-stroke)"
          strokeWidth="2.5"
        />
        <path
          d="M120 42 132 50 148 47 157 59 173 59 179 74 194 81 193 97 206 108 200 123 208 137 198 151 200 167 185 177 181 193 165 198 156 213 139 210 120 229 101 210 84 213 75 198 59 193 55 177 40 167 42 151 32 137 40 123 34 108 47 97 46 81 61 74 67 59 83 59 92 47 108 50Z"
          fill="none"
          stroke="url(#offer-stroke)"
          strokeOpacity=".62"
          strokeWidth="1"
        />
        <circle cx="120" cy="137" r="75" fill="none" stroke="#f8c9dd" strokeOpacity=".2" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 100 58" className="hero-offer-badge__bow">
        <path d="M49 29C31 5 10 5 8 19c-2 13 20 19 41 10M51 29C69 5 90 5 92 19c2 13-20 19-41 10" fill="#b44f82" stroke="#ffd8e8" strokeWidth="2" />
        <path d="m49 29-8 26 10-6 8 6-8-26" fill="#8f315f" stroke="#ffd8e8" strokeWidth="1.5" />
        <circle cx="50" cy="29" r="7" fill="#f3b4d2" stroke="#fff0d6" strokeWidth="2" />
      </svg>
      <div className="hero-offer-badge__copy">
        <span>Limited-Time Offer</span>
        <strong>20 <small>%</small></strong>
        <b>OFF</b>
      </div>
    </div>
  );
});

const Hero = memo(function Hero({ heroRef, onLowerSectionNavigate }) {
const reduce = useReducedMotion();
const heroInView = useInView(heroRef, { amount: 0.2 });

return (
<section ref={heroRef} id="top" className="relative isolate grid min-h-[100svh] grid-cols-1 items-center overflow-hidden bg-[#120613] pb-10 pt-28 md:grid-cols-2 md:content-center md:py-24">
<div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_74%_38%,rgba(113,35,83,0.2),transparent_42%),linear-gradient(115deg,#120613_0%,#1a0a18_56%,#120613_100%)]" />

<div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:col-start-1 md:row-start-1 md:px-10 md:pl-[max(2.5rem,calc((100vw-80rem)/2))]">
<Reveal delay={0.2}>
<Eyebrow>{SITE.tagline} · {SITE.city}</Eyebrow>
</Reveal>
<Reveal delay={0.35}>
<h1 className="mt-7 max-w-[650px] font-serif text-[clamp(3.5rem,6.5vw,6.6rem)] leading-[0.86] tracking-[-0.045em] text-white/95">
<span className="block">Moments That</span>
<span className="hero-accent block">Feel Like</span>
<span className="block">Cinema</span>
</h1>
</Reveal>
<Reveal delay={0.65}>
<p className="mt-10 max-w-lg text-base font-light leading-relaxed text-white/70 md:text-lg">
{SITE.intro}
</p>
</Reveal>
</div>

<figure className="hero-art relative z-0 mt-10 w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-full md:w-[58%]">
<img
src={HERO_IMG}
alt="Pink and rose-gold balloon arch framing an illuminated Happy Birthday sign"
className="hero-art__image absolute inset-0 h-full w-full object-cover"
loading="eager"
decoding="async"
fetchPriority="high"
width={2200}
height={1466}
/>
<div aria-hidden="true" className="hero-art__shade absolute inset-0" />
<HeroOfferBadge />
</figure>

<div className="relative z-10 mx-auto mt-8 w-full max-w-7xl px-6 md:col-start-1 md:row-start-2 md:mt-8 md:px-10 md:pl-[max(2.5rem,calc((100vw-80rem)/2))]">
<Reveal delay={0.85}>
<div className="flex max-w-[38rem] flex-wrap gap-3">
{HERO_FEATURES.map(({ icon: Icon, label }) => (
<span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-white/75 sm:text-[11px] sm:tracking-[0.2em]">
<Icon className="h-4 w-4 text-[#edb3d2]" aria-hidden="true" />
{label}
</span>
))}
</div>
</Reveal>
<Reveal delay={1}>
<div className="mt-8 flex flex-wrap items-center gap-5">
<MagneticButton href={SITE.phoneLink}>Plan My Event <ArrowRight className="h-4 w-4" /></MagneticButton>
<MagneticButton href="#gallery" variant="ghost" onClick={(event) => {
if (!document.getElementById("gallery")) {
event.preventDefault();
onLowerSectionNavigate?.("gallery");
}
}}>View Gallery <ArrowRight className="h-4 w-4" /></MagneticButton>
</div>
</Reveal>
</div>

<motion.div
className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
animate={reduce || !heroInView ? {} : { y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
>
<div className="h-12 w-px bg-gradient-to-b from-[#D67CBF] to-transparent" />
</motion.div>
</section>
  );
});

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */
const ServiceCard = memo(function ServiceCard({ s, i, onSelect }) {
const reduce = useReducedMotion();
const ref = useRef(null);
const glowRef = useRef(null);
const inView = useInView(ref, { amount: 0.2 });
const onMove = (e) => {
if (reduce || !ref.current || !glowRef.current) return;
const r = ref.current.getBoundingClientRect();
const x = ((e.clientX - r.left) / r.width) * 100;
const y = ((e.clientY - r.top) / r.height) * 100;
glowRef.current.style.background = `radial-gradient(340px circle at ${x}% ${y}%, rgba(184,137,79,.16), transparent 70%)`;
glowRef.current.style.opacity = "1";
  };
const Icon = s.icon;

return (
<Reveal delay={i * 0.08}>
<motion.button
type="button"
ref={ref}
onMouseMove={onMove}
onMouseLeave={() => { if (glowRef.current) glowRef.current.style.opacity = "0"; }}
onClick={() => onSelect(s)}
whileHover={{ y: -8, scale: 1.01 }}
transition={{ type: "spring", stiffness: 220, damping: 20 }}
className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-9 backdrop-blur-xl transition-all duration-500 hover:border-[#D67CBF]/35 focus:outline-none focus:ring-2 focus:ring-[#D67CBF]/40"
>
<div
ref={glowRef}
className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
style={{ background: "radial-gradient(340px circle at 50% 50%, rgba(184,137,79,.16), transparent 70%)" }}
/>
<motion.div
className="relative"
animate={!reduce && inView ? { rotate: [0, -2, 2, 0] } : { rotate: 0 }}
transition={{ duration: 4.5, repeat: !reduce && inView ? Infinity : 0, ease: "easeInOut" }}
>
<Icon className="h-8 w-8 text-[#E7A3D2]" strokeWidth={1.2} />
</motion.div>
<h3 className="relative mt-7 font-serif text-2xl text-white">{s.title}</h3>
<p className="relative mt-3 text-sm font-light leading-relaxed text-white/55">{s.text}</p>
<div className="relative mt-7 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#D67CBF] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
</motion.button>
</Reveal>
  );
});


const Services = memo(function Services({ onSelect }) {
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
{SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} onSelect={onSelect} />)}
</div>
</Section>
  );
});

const ServiceModal = memo(function ServiceModal({ service, onClose }) {
const dialogRef = useRef(null);
const modalContentRef = useRef(null);
const closeButtonRef = useRef(null);
const touchStartRef = useRef(null);

useEffect(() => {
if (!service) return;

const previouslyFocused = document.activeElement;
closeButtonRef.current?.focus();
const handleKeyDown = (event) => {
if (event.key === "Escape") {
event.stopPropagation();
onClose();
return;
}
if (event.key !== "Tab") return;

const focusable = dialogRef.current?.querySelectorAll(
'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
);
if (!focusable?.length) return;
const first = focusable[0];
const last = focusable[focusable.length - 1];
if (event.shiftKey && document.activeElement === first) {
event.preventDefault();
last.focus();
} else if (!event.shiftKey && document.activeElement === last) {
event.preventDefault();
first.focus();
}
};

const overlay = dialogRef.current;
const isInsideModal = (target) => target instanceof Node && Boolean(modalContentRef.current?.contains(target));
const closeForPageWheel = (event) => {
if (!isInsideModal(event.target)) onClose();
};
const handleTouchStart = (event) => {
const touch = event.changedTouches[0];
if (!touch) return;
touchStartRef.current = {
insideModal: isInsideModal(event.target),
x: touch.clientX,
y: touch.clientY,
};
};
const handleTouchMove = (event) => {
const start = touchStartRef.current;
const touch = event.changedTouches[0];
if (!start || start.insideModal || !touch) return;
if (Math.hypot(touch.clientX - start.x, touch.clientY - start.y) < 8) return;
touchStartRef.current = null;
onClose();
};
const clearTouchStart = () => {
touchStartRef.current = null;
};

document.addEventListener("keydown", handleKeyDown);
overlay?.addEventListener("wheel", closeForPageWheel, { passive: true });
overlay?.addEventListener("touchstart", handleTouchStart, { passive: true });
overlay?.addEventListener("touchmove", handleTouchMove, { passive: true });
overlay?.addEventListener("touchend", clearTouchStart, { passive: true });
overlay?.addEventListener("touchcancel", clearTouchStart, { passive: true });
return () => {
document.removeEventListener("keydown", handleKeyDown);
overlay?.removeEventListener("wheel", closeForPageWheel);
overlay?.removeEventListener("touchstart", handleTouchStart);
overlay?.removeEventListener("touchmove", handleTouchMove);
overlay?.removeEventListener("touchend", clearTouchStart);
overlay?.removeEventListener("touchcancel", clearTouchStart);
if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
previouslyFocused.focus();
}
};
}, [service, onClose]);

if (!service) return null;

return (
<AnimatePresence mode="wait">
<motion.div
ref={dialogRef}
role="dialog"
aria-modal="true"
aria-label={`${service.title} preview`}
tabIndex={-1}
className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 md:p-6"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
onClick={onClose}
>
<motion.div
ref={modalContentRef}
data-lenis-prevent
className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#120613]/95 p-6 md:p-10 shadow-2xl"
initial={{ y: 24, opacity: 0, scale: 0.98 }}
animate={{ y: 0, opacity: 1, scale: 1 }}
exit={{ y: 24, opacity: 0, scale: 0.98 }}
transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
onClick={(e) => e.stopPropagation()}
>
<button
ref={closeButtonRef}
type="button"
onClick={onClose}
className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 transition hover:text-white"
aria-label="Close preview"
>
<X className="h-5 w-5" />
</button>

<div className="mb-6 flex flex-col gap-5">
<div>
<p className="text-sm uppercase tracking-[0.35em] text-[#E7A3D2]/80">Signature experience</p>
<h3 className="mt-3 text-3xl font-serif text-white">{service.title}</h3>
<p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{service.text}</p>
</div>

<div className="flex flex-col gap-3 sm:flex-row">
<a
href={SITE.phoneLink}
aria-label={`Call now to book ${service.title}`}
className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D67CBF]/35 bg-[#D67CBF]/[0.08] px-6 py-3 text-sm font-medium text-[#F5CFE3] transition hover:border-[#D67CBF]/60 hover:bg-[#D67CBF]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D0EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120613]"
>
<Phone aria-hidden="true" className="h-4 w-4" />
Call Now
</a>
</div>
</div>

<div className="-mx-6 flex-1 overflow-y-auto overscroll-contain px-6 md:-mx-10 md:px-10">
<div className="columns-1 gap-4 sm:columns-2">
{service.images.map((src, idx) => {
const [width, height] = getImageDimensions(src);
return (
<div
key={idx}
className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-[#0d0710]"
>
<img src={src} alt={`${service.title} photo ${idx + 1}`} loading="lazy" decoding="async" width={width} height={height} className="h-auto w-full" />
</div>
);
})}
</div>
</div>
</motion.div>
</motion.div>
</AnimatePresence>
  );
});

/* ------------------------------------------------------------------ */
/* WHY US + STATS                                                      */
/* ------------------------------------------------------------------ */
const WhyUs = memo(function WhyUs() {
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
const h = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
<motion.div style={{ scaleY: h, transformOrigin: "top" }} className="absolute left-[3px] top-2 h-full w-px bg-gradient-to-b from-[#D67CBF] to-[#F5D0EC]" />
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
});

const LazyBelowFold = lazy(() => import("./BelowFold.jsx"));

const DeferredBelowFold = memo(function DeferredBelowFold({
  requested,
  onLoaded,
}) {
  const sentinelRef = useRef(null);
  const [scrollNear, setScrollNear] = useState(false);
  const nearViewport = useInView(sentinelRef, { once: true, margin: "500px 0px" });
  useEffect(() => {
    if (requested || scrollNear) return undefined;
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    let frame = 0;
    const checkPosition = () => {
      frame = 0;
      if (sentinel.getBoundingClientRect().top <= window.innerHeight + 500) {
        setScrollNear(true);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(checkPosition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    checkPosition();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [requested, scrollNear]);

  return (
    <div ref={sentinelRef} className="min-h-px">
      {(requested || nearViewport || scrollNear) && (
        <Suspense fallback={null}>
          <LazyBelowFold
            site={SITE}
            galleryImages={GALLERY}
            processSteps={PROCESS}
            testimonials={TESTIMONIALS}
            onLoaded={onLoaded}
          />
        </Suspense>
      )}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* APP                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
const [selectedService, setSelectedService] = useState(null);
const [loadBelowFold, setLoadBelowFold] = useState(false);
const pendingSectionRef = useRef(null);
const heroRef = useRef(null);

useEffect(() => {
const sectionId = window.location.hash.slice(1);
if (["gallery", "process", "reviews", "contact"].includes(sectionId)) {
pendingSectionRef.current = sectionId;
setLoadBelowFold(true);
}
}, []);

// Keep native touch scrolling; use Lenis only for desktop wheel scrolling.
useEffect(() => {
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 767px)").matches;
if (prefersReduced || isMobile) return undefined;

const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.09 });
let frame = 0;
const run = (time) => {
lenis.raf(time);
frame = requestAnimationFrame(run);
};
const start = () => {
if (!frame && document.visibilityState === "visible") frame = requestAnimationFrame(run);
};
const stop = () => {
if (frame) cancelAnimationFrame(frame);
frame = 0;
};
const onVisibilityChange = () => document.visibilityState === "visible" ? start() : stop();
document.addEventListener("visibilitychange", onVisibilityChange);
start();
return () => {
stop();
document.removeEventListener("visibilitychange", onVisibilityChange);
lenis.destroy();
};
  }, []);

const closeServiceModal = useCallback(() => {
setSelectedService(null);
}, []);

const handleLowerSectionNavigate = useCallback((sectionId) => {
pendingSectionRef.current = sectionId;
setLoadBelowFold(true);
}, []);

const handleBelowFoldLoaded = useCallback(() => {
const sectionId = pendingSectionRef.current;
if (!sectionId) return;
pendingSectionRef.current = null;
if (window.location.hash !== `#${sectionId}`) window.history.pushState(null, "", `#${sectionId}`);
requestAnimationFrame(() => {
document.getElementById(sectionId)?.scrollIntoView({
behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
block: "start",
});
});
}, []);

// SEO (title, description, JSON-LD) without extra deps
useEffect(() => {
document.title = "Balloonique Decor | Luxury Balloon & Event Decoration in Gurugram";
const meta = (attr, key, val) => {
let el = document.querySelector(`meta[${attr}="${key}"]`);
if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
el.setAttribute("content", val);
    };
const desc = "Balloonique Decor creates luxury balloon decor for birthdays, anniversaries, proposals and baby showers across Gurugram. Book your cinematic setup today.";
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
telephone: SITE.phone,
email: SITE.email,
url: typeof window !== "undefined" ? window.location.origin : undefined,
address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "180" },
    });
document.head.appendChild(ld);
return () => ld.remove();
  }, []);

const trackPhoneConversion = useCallback(() => {
  // Google Ads conversion tracking
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-18378520451/ThETCM-fu94cEIPvx7tE",
    });
  }
}, []);

return (
<div className="relative min-h-screen bg-[#120613] font-sans text-white antialiased selection:bg-[#D67CBF]/30">
<Loader />
<Atmosphere heroRef={heroRef} />
<Nav onLowerSectionNavigate={handleLowerSectionNavigate} />
<main>
<Hero heroRef={heroRef} onLowerSectionNavigate={handleLowerSectionNavigate} />
<Services onSelect={setSelectedService} />
<ServiceModal service={selectedService} onClose={closeServiceModal} />
<WhyUs />
<DeferredBelowFold requested={loadBelowFold} onLoaded={handleBelowFoldLoaded} />
</main>

<a
href={SITE.phoneLink}
className="fixed bottom-4 left-4 z-[49] inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D67CBF]/35 bg-[#1a0c19]/95 px-3.5 py-3 text-xs font-medium text-white shadow-[0_18px_50px_rgba(214,124,191,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#D67CBF]/60 hover:bg-[#2a0e25]/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D0EC] sm:bottom-6 sm:left-6 sm:gap-3 sm:px-5 sm:text-sm"
>
<Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-[#E7A3D2]" />
Plan Your Event
</a>

<div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-max flex-col items-end gap-3 sm:right-6 sm:bottom-6">
<a
href={SITE.phoneLink}
onClick={trackPhoneConversion}
className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#120613]/90 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_50px_rgba(214,124,191,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-[#2a0e25]/95"
>
<Phone className="h-5 w-5 text-[#E7A3D2]" />
          Call
</a>
</div>
</div>
  );
}