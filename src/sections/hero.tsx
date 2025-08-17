"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { type Theme, useTheme } from "@/context/theme";
import { cn } from "@/lib/utils";
import useMousePosition from "@/hooks/useMousePosition";
import { ReactTyped } from "react-typed";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = ["hero-base.jpg", "hero-japanese.jpg"];
const THEMES: Theme[] = ["base", "japanese"];
const TOTAL_IMAGES = IMAGES.length;

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const nextImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { xOffset, yOffset } = useMousePosition(containerRef);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { changeTheme, slowTheme } = useTheme();

  const upcomingImageIndex = (currentIndex + 1) % TOTAL_IMAGES;

  useEffect(() => {
    setIsMoving(true);

    const timeout = setTimeout(() => {
      if (!isHovering) {
        setIsMoving(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [xOffset, yOffset, isHovering]);

  const fullImageIndex = () => {
    if (!hasClicked) {
      return currentIndex;
    }

    if (currentIndex === TOTAL_IMAGES - 1) {
      return 0;
    }

    if (currentIndex === 0) {
      return TOTAL_IMAGES - 1;
    }

    return currentIndex - 1;
  };

  const handleMiniImageClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingImageIndex);
    changeTheme(THEMES[upcomingImageIndex]);
  };

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedImages === TOTAL_IMAGES - 1) {
      setIsLoading(false);
    }
  }, [loadedImages]);

  useGSAP(
    () => {
      if (hasClicked) {
        // Current Mini Image
        gsap.from(".current-mini-image", {
          visibility: "visible",
          duration: 1.5,
        });

        gsap.to(".current-mini-image", {
          visibility: "hidden",
          duration: 1.2,
        });

        // Next Image container
        gsap.set("#next-image-container", { visibility: "visible" });

        gsap.from("#next-image-container", {
          transformOrigin: "center center",
          duration: 1.5,
          visibility: "visible",
          ease: "power1.inOut",
        });

        gsap.to("#next-image-container", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          delay: 0.2,
          ease: "power1.inOut",
          onComplete: () => {
            setHasClicked(false);
          },
        });

        // Next Image
        gsap.from("#next-image", {
          scale: 1.5,
        });

        gsap.to("#next-image", {
          scale: 1,
          duration: 0.5,
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  useGSAP(() => {
    gsap.set("#image-frame", {
      clipPath: "polygon(11% 3%, 68% 15%, 100% 82%, 0% 100%)",
      borderRadius: "0 0 35% 0",
    });

    gsap.from("#image-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-frame",
        start: "center center",
        end: "90% center",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden"
    >
      <div
        className="bg-background relative z-10 h-dvh w-screen overflow-hidden backdrop-grayscale-50"
        id="image-frame"
      >
        <div>
          <div
            className={cn(
              "imask-clip-path absolute-center z-50 size-64 overflow-hidden opacity-0 drop-shadow-2xl transition-opacity duration-500",
              isMoving && !isHovering && "opacity-50",
              isHovering && "opacity-100",
            )}
            style={{
              transform: `translate(${xOffset * 20}px, ${yOffset * 20}px) rotateX(${-yOffset * 20}deg) rotateY(${xOffset * 20}deg)`,
              perspective: "1000px",
            }}
          >
            <div
              id="mini-image"
              className="current-mini-image h-full w-full origin-center scale-50 cursor-pointer transition-all duration-500 hover:scale-100"
              onClick={handleMiniImageClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Image
                alt="Current mini image"
                ref={nextImageRef}
                src={`/images/${IMAGES[upcomingImageIndex]}`}
                fill
                className="current-mini-image size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleImageLoad}
              />
            </div>
          </div>

          <div
            className="absolute-center invisible z-20 size-64 translate-y-[-30%] overflow-hidden"
            id="next-image-container"
          >
            <Image
              alt="Next image"
              id="next-image"
              src={`/images/${IMAGES[currentIndex]}`}
              fill
              className="object-cover object-center"
              onLoadedData={handleImageLoad}
            />
          </div>

          <Image
            src={`/images/${IMAGES[fullImageIndex()]}`}
            alt="Current image"
            id="current-image"
            className="absolute top-0 left-0 size-full object-cover object-center"
            fill
            onLoadedData={handleImageLoad}
            priority
          />
        </div>

        <h1 className="hero-heading theme-element text-background drop-shadow-foreground absolute right-5 bottom-5 z-40 drop-shadow-lg">
          Guerreiro
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full overflow-hidden">
          <div className="theme-element mt-24 px-5 sm:px-10">
            <h1 className="hero-heading text-background drop-shadow-foreground drop-shadow-lg">
              Guilherme
            </h1>

            <p className="japanese:text-2xl font-secondary text-background mb-5 ml-4 text-xl uppercase">
              <ReactTyped
                loop
                typeSpeed={80}
                backSpeed={30}
                strings={[
                  "I'm a <span class='accent text-primary'>Software Engineer</span>",
                  "I'm a <span class='accent text-primary'>Frontend Developer</span>",
                  "I'm a <span class='accent text-primary'>creative mind</span>",
                  "I'm an <span class='accent text-primary'>awesome person</span>",
                ]}
                smartBackspace
                backDelay={1500}
                loopCount={0}
                showCursor
                cursorChar={(() => {
                  switch (slowTheme) {
                    case "base":
                      return "|";
                    case "japanese":
                      return " < ";
                    default:
                      return "|";
                  }
                })()}
                className="typed"
              />
            </p>
          </div>
        </div>
      </div>

      <h1 className="hero-heading text-foreground theme-element absolute top-0 left-0 mt-24 px-5 sm:px-10">
        Guilherme
      </h1>

      <h1 className="hero-heading text-foreground theme-element absolute right-5 bottom-5">
        Guerreiro
      </h1>
    </section>
  );
};
