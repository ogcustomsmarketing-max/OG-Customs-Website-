import { motion, useScroll, useTransform } from "motion/react";

import heroPolish from "@/assets/hero-polish-v3.mp4";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const fade = useTransform(scrollY, [0, 520], [1, 0.35]);

  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <video
          src={heroPolish}
          
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
            "radial-gradient(60% 100% at 50% 50%, color-mix(in oklab, var(--gold) 20%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(80% 100% at 20% 100%, color-mix(in oklab, var(--violet) 55%, transparent), transparent 70%)",
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
            Your vehicle is an investment.{" "}
            <span className="text-gold-gradient">We're the engineers trained to protect it.</span>
          </motion.h1>

        </motion.div>
      </div>
    </section>
  );
}
