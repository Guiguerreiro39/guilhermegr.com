import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const ProgrammingLanguagesHeader = () => {
  useGSAP(() => {
    const textAnimation = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        id: "programming-languages-header",
        trigger: "#programming-languages-header",
        start: "20% bottom",
        end: "top 55%",
        scrub: 0.5,
      },
    });

    textAnimation.fromTo(
      new SplitText("#programming-languages-header", {
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
        x: (i) => (i % 2 ? i * 30 : -i * 30),
        opacity: 1,
      },
    );
  });

  return (
    <h2
      className="text-background font-headers japanese:text-4xl japanese:md:text-5xl text-6xl uppercase"
      id="programming-languages-header"
    >
      <span>The code</span>
      <br />
      <span>dialects I’m most</span>
      <br />
      <span>fluent in</span>
    </h2>
  );
};
