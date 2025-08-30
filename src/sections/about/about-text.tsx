import { AnimatedTitle } from "@/components/animated-title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const AboutText = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const textAnimation = gsap.timeline({
        ease: "power1.inOut",
        scrollTrigger: {
          id: "about-text",
          trigger: textContainerRef.current,
          start: "120% bottom",
          end: "center center",
          scrub: 0.5,
        },
      });

      textAnimation.set(textContainerRef.current, {
        opacity: 1,
      });

      const splitText = new SplitText(textContainerRef.current, {
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

    return () => ctx.revert();
  });

  return (
    <div className="about-subtext space-y-4">
      <AnimatedTitle
        title="Who am I?"
        className="text-foreground text-center text-5xl leading-[0.8] uppercase md:text-6xl"
      />
      <div id="about-text" ref={textContainerRef}>
        <p className="text-balance">
          I'm a Software Engineer riding the wave of the latest tech trends to
          turn big ideas into sleek projects!
        </p>
        <p className="text-foreground/55 font-secondary japanese:text-2xl retro:text-2xl mt-2 text-balance">
          Always curious<span className="font-paragraph">,</span> always
          leveling up
        </p>
      </div>
    </div>
  );
};
