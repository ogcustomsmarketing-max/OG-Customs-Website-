import { motion, useScroll, useTransform } from "motion/react";
import heroCar from "@/assets/hero-car.jpg";
import heroPolish from "@/assets/hero-polish.mp4.asset.json";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const fade = useTransform(scrollY, [0, 520], [1, 0.35]);

  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <video
          src={heroPolish.url}
          poster={heroCar}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="A detailer machine-polishing the glossy black paint of a luxury car inside the OG Customs detailing studio in Bangalore"
          className="h-[115%] w-full scale-105 object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden
      />
      <div
        className="animate-sheen absolute inset-x-0 top-1/3 -z-10 h-64 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-24">
        <motion.div style={{ opacity: fade }} className="max-w-3xl">


          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl leading-[1.03] font-semibold text-balance sm:text-6xl lg:text-7xl"
          >
            Your car doesn't need a wash. <span className="text-gold-gradient">It needs proper care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A detailing studio in Domlur, Bangalore — for cars and bikes. Ceramic coating, paint
            correction, PPF and interior work, done by hand, checked before we quote, built to
            survive city roads.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
