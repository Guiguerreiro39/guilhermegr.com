import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const TransitionHeader = () => {
  useGSAP(() => {
    const textAnimation = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        id: "transition-header",
        trigger: "#transition",
        start: "95% 80%",
        end: "85% top",
        scrub: 0.5,
      },
    });

    textAnimation.set("#transition-header", {
      opacity: 1,
    });

    const splitText = new SplitText("#transition-header", {
      type: "chars, words",
      mask: "chars",
      aria: "hidden",
    });

    textAnimation.from(splitText.chars, {
      yPercent: "random([-150, 150])",
      xPercent: "random([-150, 150])",
      stagger: {
        from: "random",
        amount: 0.6,
      },
      ease: "sine.inOut",
      opacity: 0,
    });
  });

  return (
    <div className="absolute top-1/2 left-1/2 z-40 w-screen -translate-x-1/2 -translate-y-1/2">
      <h2
        id="transition-header"
        className="split text-background font-headers w-screen px-12 text-center text-4xl text-balance uppercase drop-shadow-xl sm:text-6xl md:text-7xl"
      >
        The weird and wonderful things I’ve created
      </h2>
    </div>
  );
};
