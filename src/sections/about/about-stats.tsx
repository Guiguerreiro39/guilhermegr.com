"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const AboutStats = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add("(width >= 48rem)", () => {
      const ctx = gsap.context(() => {
        const textAnimation = gsap.timeline({
          ease: "power1.inOut",
          scrollTrigger: {
            id: "about-stats",
            trigger: textContainerRef.current,
            start: "20% bottom",
            end: "5% center",
            scrub: 0.5,
          },
        });

        textAnimation.set(textContainerRef.current, {
          opacity: 1,
          y: 0,
        });

        const splitText = new SplitText(textContainerRef.current, {
          type: "words",
          aria: "hidden",
        });

        textAnimation.from(splitText.words, {
          opacity: 0,
          y: -40,
          ease: "sine.out",
          stagger: 0.1,
        });
      });

      return () => {
        ctx.revert();
      };
    });

    gsap.matchMedia().add("(width < 48rem)", () => {
      const ctx = gsap.context(() => {
        const textAnimation = gsap.timeline({
          ease: "power1.inOut",
          scrollTrigger: {
            id: "about-stats",
            trigger: textContainerRef.current,
            start: "10% bottom",
            end: "170% bottom",
            scrub: 0.5,
          },
        });

        textAnimation.set(textContainerRef.current, {
          opacity: 1,
          y: 0,
        });

        const splitText = new SplitText(textContainerRef.current, {
          type: "words",
          aria: "hidden",
        });

        textAnimation.from(splitText.words, {
          opacity: 0,
          y: -40,
          ease: "sine.out",
          stagger: 0.1,
        });
      });

      return () => {
        ctx.revert();
      };
    });
  });

  return (
    <div
      className="grid grid-cols-1 gap-8 will-change-[opacity,transform] lg:grid-cols-3"
      id="about-stats"
      ref={textContainerRef}
    >
      <StatItem
        title="Education"
        description="Bachelor's degree in Computer Science at University of Minho"
      />
      <StatItem
        title="6 Years"
        description="Professional experience developing web applications"
        className="lg:mt-12"
      />
      <StatItem
        title="Typescript"
        description="Prefered language to build applications"
      />
    </div>
  );
};

const StatItem = ({
  className,
  title,
  description,
}: {
  className?: string;
  title: string;
  description: string;
}) => (
  <div
    className={cn(
      "col-span-1 flex flex-col items-center text-center",
      className,
    )}
  >
    <h3 className="text-foreground font-headers text-3xl lg:text-2xl xl:text-3xl">
      {title}
    </h3>
    <p className="font-paragraph max-w-60 text-balance">{description}</p>
  </div>
);
