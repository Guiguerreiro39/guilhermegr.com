import { AnimatedTitle } from "@/components/animated-title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const AboutText = () => {
  useGSAP(() => {
    const textAnimation = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        id: "about-text",
        trigger: "#about-text",
        start: "20% bottom",
        end: "center center",
        scrub: 0.5,
      },
    });

    textAnimation.set("#about-text", {
      opacity: 1,
    });

    const splitText = new SplitText("#about-text", {
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
    <div className="about-subtext space-y-2">
      <AnimatedTitle
        title="Who am I?"
        className="text-foreground text-center text-5xl leading-[0.8] uppercase md:text-6xl"
      />
      <div id="about-text">
        <p className="text-balance">
          I'm a Software Engineer riding the wave of the latest tech trends to
          turn big ideas into sleek projects!
        </p>
        <p className="text-foreground/55">Always curious, always leveling up</p>
      </div>
    </div>
  );
};
