"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { AnimatedTitle } from "@/components/animated-title";
import { useRef } from "react";
import { useTheme } from "@/context/theme";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants";
import { AboutText } from "@/sections/about/about-text";
import { AboutStats } from "@/sections/about/about-stats";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const { slowTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const iconAnimation = gsap.timeline({
          ease: "power1.inOut",
          scrollTrigger: {
            id: "about",
            trigger: containerRef.current,
            start: "10% center",
            end: "10% bottom",
            scrub: 0.5,
          },
        });

        const imageAnimation = gsap.timeline({
          ease: "power1.inOut",
          scrollTrigger: {
            id: "about",
            trigger: containerRef.current,
            start: "20% bottom",
            end: "70% bottom",
            scrub: 0.5,
          },
        });

        imageAnimation.from("#profile-image", {
          scale: 0,
        });

        imageAnimation.to("#profile-image", {
          scale: 1,
        });

        iconAnimation.from(".profile-image-icon", {
          opacity: 0,
        });

        iconAnimation.to(".profile-image-icon", {
          opacity: 1,
        });
      });

      return () => ctx.revert();
    },
    { dependencies: [slowTheme], scope: containerRef },
  );

  useGSAP(() => {
    gsap.to("#about-container", {
      clipPath: "polygon(0 100%, 28% 88%, 57% 90%, 100% 76%, 100% 0%, 0% 0%)",
      ease: "power1.inOut",
      scrollTrigger: {
        id: "about-container",
        trigger: "#about-container",
        start: "bottom bottom",
        end: "bottom 30%",
        scrub: 0.5,
      },
    });
  });

  return (
    <section
      id="about"
      className="theme-element bg-foreground relative flex min-h-dvh w-screen flex-col overflow-hidden"
      ref={containerRef}
    >
      <div
        id="about-container"
        className="bg-background flex-1 px-5 py-36 sm:px-10"
        style={{
          clipPath:
            "polygon(0% 80%, 22% 92%, 69% 84%, 100% 100%, 100% 0%, 0% 0%)",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-12 pb-64 md:grid-cols-2 md:gap-8">
          {isMobile ? (
            <div className="col-span-1">
              <AboutText />
            </div>
          ) : (
            <div className="order-1 col-span-1 space-y-12 md:order-none">
              <AboutText />
              <AboutStats />
            </div>
          )}
          <div className="col-span-1 flex items-start justify-center justify-self-center">
            <div className="relative">
              <div
                className="profile-clip-path scale-0md:h-[60vh] relative h-[60vh] w-[21rem] md:w-[24rem]"
                id="profile-image"
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  fill
                  className="size-full object-cover object-center"
                />
              </div>
              <Link href={GITHUB_URL} target="_blank">
                <FaGithub className="profile-image-icon text-foreground absolute bottom-30 -left-1 size-9 rounded-full transition-all duration-300 ease-out hover:scale-110 md:bottom-26 md:left-0" />
              </Link>
              <Link href={LINKEDIN_URL} target="_blank">
                <div className="profile-image-icon bg-foreground absolute bottom-16 -left-1 size-9 rounded-full transition-all duration-300 ease-out hover:scale-110 md:bottom-12 md:left-0">
                  <FaLinkedinIn className="text-background absolute-center size-6" />
                </div>
              </Link>
            </div>
          </div>
          {isMobile && (
            <div className="col-span-1 md:hidden">
              <AboutStats />
            </div>
          )}
        </div>
      </div>

      {/* <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <Image
            src="/images/about.jpg"
            alt="About"
            fill
            className="absolute top-0 left-0 size-full object-cover object-center"
          />
        </div>
      </div> */}
    </section>
  );
};
