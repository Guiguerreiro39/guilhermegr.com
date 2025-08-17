import { TransitionHeader } from "@/sections/transition/transition-header";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect } from "react";
import { useTheme } from "@/context/theme";

const IMAGES = {
  japanese: "transition-japanese.jpg",
  base: "transition-base.jpg",
};

gsap.registerPlugin(ScrollTrigger);

export const Transition = () => {
  const { slowTheme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#transition-image", {
        width: "100vw",
        height: "100vh",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: 0,
        scale: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });
    });

    return () => ctx.revert();
  }, [slowTheme]);

  return (
    <div className="relative min-h-screen w-screen" id="transition">
      <div className="z-20 h-[100vh] w-screen overflow-hidden" id="clip">
        <div
          id="transition-image"
          style={{
            clipPath: "polygon(20% 6%, 100% 0%, 79% 92%, 0% 100%)",
          }}
          className="absolute top-1/2 left-1/2 z-20 h-[60vh] w-96 origin-center -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden rounded-3xl md:w-[30vw]"
        >
          <TransitionHeader />
          <div className="bg-foreground/20 absolute inset-0 z-30" />
          <Image
            src={`/images/${IMAGES[slowTheme]}`}
            fill
            alt="Transition"
            className="size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
