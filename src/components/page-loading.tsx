import { useIsLoading } from "@/context/loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(CustomEase);

export const PageLoading = () => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const { onLoadingComplete } = useIsLoading();

  useGSAP(() => {
    const customEase = CustomEase.create("custom", ".87,0,.13,1");

    gsap.set("html", {
      overflow: "hidden",
    });

    gsap.set("#hero", {
      opacity: 0,
      pointerEvents: "none",
      rotation: -10,
    });

    gsap.set("#navbar", {
      opacity: 0,
      y: -100,
    });

    gsap.to("#hero-container", {
      clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
      ease: customEase,
      delay: 1,
      duration: 1.5,
    });

    gsap.to("#hero-container", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%",
      duration: 2,
      ease: customEase,
      delay: 3,

      onStart: () => {
        gsap.to("#progress-bar", {
          width: "100vw",
          duration: 2,
          ease: customEase,
        });

        gsap.to(counterRef.current, {
          innerHTML: 100,
          duration: 2,
          ease: customEase,
          snap: {
            innerHTML: 1,
          },
        });
      },
    });

    gsap.to("#hero-container", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      delay: 5,

      onStart: () => {
        gsap.to("#hero", {
          opacity: 1,
          pointerEvents: "auto",
          rotation: 0,
          duration: 1.25,
          ease: customEase,

          onComplete: () => {
            gsap.set("#hero-container", {
              backgroundColor: "transparent",
            });
          },
        });

        gsap.to("html", {
          overflow: "auto",
        });

        gsap.to("#navbar", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: customEase,

          onComplete: onLoadingComplete,
        });

        gsap.to("#loading-heading", {
          opacity: 0,
          duration: 0.75,
          ease: customEase,
        });

        gsap.to("#progress-bar", {
          opacity: 0,
          duration: 0.3,
        });
      },
    });
  });

  return (
    <>
      <div
        id="progress-bar"
        className="text-primary absolute top-1/2 left-0 flex w-[25vw] -translate-y-1/2 items-center justify-between p-[2em]"
      >
        <p className="uppercase">loading</p>
        <p>
          /
          <span ref={counterRef} id="count">
            0
          </span>
        </p>
      </div>
    </>
  );
};
