import { memo, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Camera, Mail, MapPin, Phone, Quote, Star } from "lucide-react";
import {
  Eyebrow,
  gold,
  MagneticButton,
  Reveal,
  Section,
  SplitText,
} from "./components/SectionPrimitives";
import { getImageDimensions } from "./imageDimensions";

const TiltImage = memo(function TiltImage({ src, i }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });

  const onMove = (event) => {
    if (reduce || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    rotateY.set((((event.clientX - bounds.left) / bounds.width) - 0.5) * 12);
    rotateX.set(-(((event.clientY - bounds.top) / bounds.height) - 0.5) * 12);
  };
  const [width, height] = getImageDimensions(src);

  return (
    <Reveal delay={(i % 3) * 0.08}>
      <motion.button
        type="button"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          rotateX.set(0);
          rotateY.set(0);
        }}
        aria-label={`Open gallery photo ${i + 1} in a new tab`}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={reduce ? undefined : {
          rotateX,
          rotateY,
          transformPerspective: 900,
        }}
        className="group relative mb-6 block w-full overflow-hidden rounded-2xl border border-white/10 outline-none transition-transform duration-300 will-change-transform focus-visible:ring-2 focus-visible:ring-[#F5D0EC]"
      >
        <img
          src={src}
          alt={`Balloonique Decor event setup ${i + 1}`}
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
          className="w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      </motion.button>
    </Reveal>
  );
});

const Gallery = memo(function Gallery({ images }) {
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
        {images.map((src, i) => (
          <div key={src} className="relative">
            <TiltImage src={src} i={i} />
          </div>
        ))}
      </div>
    </Section>
  );
});

const ProcessSection = memo(function ProcessSection({ steps }) {
  const ref = useRef(null);
  const progress = useInView(ref, { once: true, amount: 0.2 });
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
        <motion.div
          initial={{ scaleX: 0 }}
          animate={progress ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
          className="absolute left-0 top-7 hidden h-px w-full bg-gradient-to-r from-[#D67CBF] to-[#F5D0EC] md:block"
        />
        <div className="grid gap-12 md:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.t} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D67CBF]/35 bg-[#120613] font-serif text-lg text-[#E7A3D2]">
                  {i + 1}
                </div>
                <h3 className="mt-6 font-serif text-2xl text-white">{step.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/55">{step.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
});

const Testimonials = memo(function Testimonials({ testimonials }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.15 });

  useEffect(() => {
    if (reduce || paused || !inView) return undefined;
    const timer = window.setInterval(() => {
      setI((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [inView, paused, reduce, testimonials.length]);

  const testimonial = testimonials[i];
  return (
    <Section id="reviews">
      <div ref={sectionRef}>
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="mt-7 font-serif text-2xl font-light leading-relaxed text-white/85 md:text-3xl">&ldquo;{testimonial.q}&rdquo;</p>
                <div className="mt-8 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-4 w-4 fill-[#E7A3D2] text-[#E7A3D2]" />
                  ))}
                </div>
                <p className={`mt-4 text-sm tracking-[0.2em] ${gold}`}>{testimonial.n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/40">{testimonial.r}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.n}
                onClick={() => setI(index)}
                aria-label={`Show review ${index + 1} of ${testimonials.length}`}
                aria-current={index === i}
                className={`h-1.5 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#F5D0EC] ${index === i ? "w-8 bg-[#E7A3D2]" : "w-1.5 bg-white/25"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
});

const CTA = memo(function CTA({ site }) {
  return (
    <Section id="contact" className="!py-24" aria-labelledby="contact-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#D67CBF]/20 bg-gradient-to-br from-[#D67CBF]/10 via-white/[0.03] to-transparent p-12 text-center backdrop-blur-xl md:p-24">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D67CBF]/12 blur-[100px]" />
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-[#D67CBF]/15" />
          <h2 id="contact-heading" tabIndex={-1} className="relative font-serif text-4xl leading-tight outline-none md:text-6xl">
            <span className="text-white/95">Let's design your </span>
            <span className={gold}>unforgettable day.</span>
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl font-light text-white/60">
            We take on a limited number of celebrations each month so every project gets the care it deserves. Tell us your date and let's make it feel truly special.
          </p>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-4">
            <MagneticButton href={site.phoneLink} variant="ghost">
              <Phone className="h-4 w-4" /> {site.phone}
            </MagneticButton>
            <MagneticButton href={site.alternatePhoneLink} variant="ghost">
              <Phone className="h-4 w-4" /> {site.alternatePhone}
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
});

const Footer = memo(function Footer({ site }) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">
        <div>
          <h3 className={`font-serif text-2xl tracking-[0.2em] ${gold}`}>BALLOONIQUE</h3>
          <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/50">
            Luxury event decoration studio crafting thoughtful, elegant celebrations across {site.city}.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/40">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            <li>
              <a href={site.phoneLink} className="flex items-center gap-3 hover:text-[#E7A3D2]">
                <Phone className="h-4 w-4 text-[#E7A3D2]" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={site.alternatePhoneLink} className="flex items-center gap-3 hover:text-[#E7A3D2]">
                <Phone className="h-4 w-4 text-[#E7A3D2]" /> {site.alternatePhone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-[#E7A3D2]">
                <Mail className="h-4 w-4 text-[#E7A3D2]" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#E7A3D2]" /> {site.city}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] text-white/40">Follow</h4>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm text-white/70 backdrop-blur-md transition hover:border-[#D67CBF]/40 hover:text-[#E7A3D2]"
          >
            <Camera className="h-4 w-4" /> @balloonique_decor
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wider text-white/35">
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </div>
    </footer>
  );
});

function BelowFold({ site, galleryImages, processSteps, testimonials, onLoaded }) {
  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);
  return (
    <>
      <Gallery images={galleryImages} />
      <ProcessSection steps={processSteps} />
      <Testimonials testimonials={testimonials} />
      <CTA site={site} />
      <Footer site={site} />
    </>
  );
}

export default memo(BelowFold);
