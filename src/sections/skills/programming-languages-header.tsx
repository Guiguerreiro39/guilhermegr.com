import { useIsMobile } from "@/hooks/useIsMobile";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const ProgrammingLanguagesHeader = () => {
  const isMobile = useIsMobile();

  const xValue = isMobile ? -10 : 30;

  useGSAP(() => {
    const ctx = gsap.context(() => {
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
          x: (i) => (i % 2 ? i * xValue : -i * xValue),
          opacity: 1,
        },
      );
    });

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <h2
      className="text-background font-headers text-3xl uppercase sm:text-4xl md:text-5xl"
      id="programming-languages-header"
    >
      <span>Code dialects</span>
      <br />
      <span>I’m most</span>
      <br />
      <span>fluent in</span>
    </h2>
  );
};
