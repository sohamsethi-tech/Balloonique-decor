import { useRef } from "react";
import { motion, useInView, useReducedMotion, useSpring } from "framer-motion";

export const gold = "bg-gradient-to-r from-[#F6D7E6] via-[#D886A8] to-[#F6D7E6] bg-clip-text text-transparent";

export function Reveal({ children, delay = 0, y = 30, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={inView ? (reduce ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
      transition={{ duration: reduce ? 0.3 : 1, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SplitText({ text, className = "", wordClass = "", delay = 0 }) {
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

export function MagneticButton({ children, href, variant = "solid", className = "", ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.45 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.45 });
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
      onMouseMove={(event) => {
        if (reduce || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.25);
        y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-[#F5D0EC] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${base} ${className}`}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.45 }}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.a>
  );
}

export function Eyebrow({ children }) {
  return (
    <div className="mb-5 flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-[#D67CBF]/60" />
      <span className="text-[11px] uppercase tracking-[0.4em] text-[#E7A3D2]">{children}</span>
      <span className="h-px w-10 bg-[#D67CBF]/60" />
    </div>
  );
}

export function Section({ id, children, className = "", ...rest }) {
  return (
    <section {...rest} id={id} className={`relative z-10 mx-auto w-full max-w-7xl px-6 py-28 md:py-40 ${className}`}>
      {children}
    </section>
  );
}
