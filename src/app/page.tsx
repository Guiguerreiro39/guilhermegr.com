"use client";

import { About } from "@/sections/about";
import NavBar from "@/components/navbar";
import { useTheme } from "@/context/theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Skills } from "@/sections/skills";
import { Timeline } from "@/sections/timeline";
import Particles from "@/components/particles";
import { Transition } from "@/sections/transition";
import { Projects } from "@/sections/projects";
import Threads from "@/components/threads";
import { Contact } from "@/sections/contact";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { Hero } from "@/sections/hero";
import { PageLoading } from "@/components/page-loading";

export default function Home() {
  const { fastTheme, slowTheme, themeHasChanged } = useTheme();

  useGSAP(
    () => {
      if (!themeHasChanged) return;

      const themeTimeline = gsap.timeline();

      themeTimeline.to(".theme-element", {
        opacity: 0,
        duration: 1,
      });

      themeTimeline.to(".theme-element", {
        opacity: 1,
        duration: 1,
      });
    },
    { dependencies: [fastTheme], revertOnUpdate: true },
  );

  return (
    <main
      className={cn(
        "bg-background relative min-h-screen w-screen overflow-x-hidden transition-colors duration-2000",
        slowTheme,
      )}
    >
      <h1
        id="loading-heading"
        className="hero-heading absolute top-[10vh] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 !text-2xl whitespace-nowrap sm:top-[95vh]"
      >
        Guilherme Guerreiro
      </h1>
      <NavBar />
      <div
        id="hero-container"
        className="bg-foreground w-100vw h-100svh relative flex origin-center flex-col justify-between will-change-[clip-path]"
        style={{
          clipPath: "polygon(0% 45%, 0% 45%, 0% 55%, 0% 55%",
        }}
      >
        <PageLoading />
        <Hero />
      </div>
      <About />
      <div className="bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 -top-60">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={1300}
            particleSpread={5}
            speed={0.05}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <Skills />
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>
        <Timeline />
        <Transition />
      </div>
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
