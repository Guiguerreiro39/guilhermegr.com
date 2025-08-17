import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const TechStackHeader = () => {
  useGSAP(() => {
    const textAnimation = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        id: "tech-stack-header",
        trigger: "#tech-stack-header",
        start: "20% bottom",
        end: "top 55%",
        scrub: 0.5,
      },
    });

    textAnimation.fromTo(
      new SplitText("#tech-stack-header", {
        type: "words, lines",
        aria: "hidden",
      }).lines,
      {
        y: 0,
        x: 0,
        opacity: 0,
        ease: "sine.out",
        stagger: 0.2,
      },
      {
        x: (i) => i * -30,
        opacity: 1,
      },
    );
  });

  return (
    <h2
      className="text-background font-headers text-3xl uppercase sm:text-4xl md:text-5xl"
      id="tech-stack-header"
    >
      <span>My secret recipe</span>
      <br />
      <span>for cooking up</span>
      <br />
      <span>cool stuff</span>
    </h2>
  );
};
