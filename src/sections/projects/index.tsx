import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { Carousel } from "@/components/carousel";
import { PROJECTS_DATA } from "@/constants";
import { useTheme } from "@/context/theme";

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  const containerRef = useRef(null);
  const { slowTheme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
          start: "top 102%",
          end: "top +=50",
        },
      });

      tl.to(".transition-column", {
        height: "600px",
        stagger: 0.2,
      });

      gsap.set("#projects-frame", {
        clipPath: "polygon(11% 3%, 68% 15%, 100% 82%, 0% 100%)",
        borderRadius: "0 0 35% 0",
      });

      gsap.matchMedia().add("(width >= 48rem)", () => {
        gsap.from("#projects-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#projects-frame",
            start: "bottom 110%",
            end: "120% center",
            scrub: true,
          },
        });
      });

      gsap.matchMedia().add("(width < 48rem)", () => {
        gsap.from("#projects-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0 0 0 0",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#projects-frame",
            start: "bottom 80%",
            end: "120% center",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slowTheme]);

  return (
    <section
      className="bg-foreground relative min-h-screen w-screen pb-64"
      id="projects"
      ref={containerRef}
    >
      <div className="absolute bottom-full left-0 z-20 grid h-auto w-screen grid-cols-5 items-end">
        <div
          className="bg-background transition-column h-0"
          id="section-transition-div_1"
        ></div>
        <div
          className="bg-background transition-column h-0"
          id="section-transition-div_2"
        ></div>
        <div
          className="bg-background transition-column h-0"
          id="section-transition-div_3"
        ></div>
        <div
          className="bg-background transition-column h-0"
          id="section-transition-div_4"
        ></div>
        <div
          className="bg-background transition-column h-0"
          id="section-transition-div_5"
        ></div>
      </div>
      <div
        className="bg-background relative z-10 flex min-h-dvh w-screen py-36"
        id="projects-frame"
      >
        <div className="w-full self-center justify-self-center">
          <div className="bg-background h-0 md:h-[50px]" />
          <div className="relative flex w-full items-center justify-center overflow-hidden py-20">
            <Carousel slides={PROJECTS_DATA} />
          </div>
        </div>
      </div>
    </section>
  );
};
