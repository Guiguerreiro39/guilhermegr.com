"use client";

import { AnimatedTitle } from "@/components/animated-title";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import Particles from "@/components/particles";
import { useTheme } from "@/context/theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Link from "next/link";
import { useRef } from "react";
import { FiMail } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const Contact = () => {
  const { slowTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const textAnimation = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        id: "contact",
        trigger: "#contact",
        start: "30% bottom",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    textAnimation.set("#contact-text", {
      opacity: 1,
    });

    const splitText = new SplitText("#contact-text", {
      type: "words",
      aria: "hidden",
    });

    textAnimation.from(splitText.words, {
      opacity: 0,
      duration: 1,
      ease: "sine.out",
      stagger: 0.1,
    });
  });

  return (
    <section
      id="contact"
      className="theme-element bg-foreground relative flex w-screen flex-col items-center justify-center pt-12 pb-36"
      ref={containerRef}
    >
      <div className="absolute inset-0 -top-75">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={400}
          particleSpread={5}
          speed={0.05}
          particleBaseSize={70}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div
        id="contact-content"
        className="flex flex-col items-center gap-8 text-center"
      >
        <AnimatedTitle title="Get in touch" />
        <p
          className="text-background font-paragraph max-w-md sm:max-w-lg"
          id="contact-text"
        >
          Always down to chat about sleek projects, wild ideas, or teaming up
          for something awesome.
        </p>
        <Link href="mailto:mail@guilhermegr.com">
          <Button rightIcon={<FiMail />} className="text mt-4">
            mail@guilhermegr<span className="font-paragraph">.</span>com
          </Button>
        </Link>
      </div>
    </section>
  );
};
