import { useTheme } from "@/context/theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const ANIMATION_VALUES = {
  base: {
    x: 30,
    y: 10,
  },
  japanese: {
    x: 50,
    y: 20,
  },
};

export const LanguagesHeader = () => {
  const { slowTheme } = useTheme();

  const values = useMemo(() => ANIMATION_VALUES[slowTheme], [slowTheme]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const textAnimation = gsap.timeline({
        ease: "power1.inOut",
        scrollTrigger: {
          id: "languages-header",
          trigger: "#languages-header",
          start: "20% bottom",
          end: "top 55%",
          scrub: 0.5,
        },
      });

      textAnimation.fromTo(
        new SplitText("#languages-header", {
          type: "words, lines",
          aria: "hidden",
        }).lines,
        {
          y: 0,
          x: 0,
          rotate: 0,
          opacity: 0,
          ease: "sine.out",
          stagger: 0.2,
        },
        {
          x: (i) => (i % 2 ? i * values.x : i * -values.x),
          rotate: (i) => (i % 2 ? i * 10 : 0),
          y: (i) => (i % 2 ? i * values.y : 0),
          opacity: 1,
        },
      );
    });

    return () => {
      ctx.revert();
    };
  }, [slowTheme]);

  return (
    <h2
      className="text-background font-headers japanese:text-4xl japanese:md:text-5xl relative text-6xl uppercase"
      id="languages-header"
    >
      <span className="japanese:md:pl-26 japanese:pl-20">My</span>
      <br />
      <span>linguistic</span>
      <br />
      <span className="japanese:absolute japanese:-bottom-14 japanese:left-20 japanese:md:-bottom-16">
        arsenal
      </span>
    </h2>
  );
};
