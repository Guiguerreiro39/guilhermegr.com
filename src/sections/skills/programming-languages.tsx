import { cn } from "@/lib/utils";
import { ProgrammingLanguagesHeader } from "@/sections/skills/programming-languages-header";
import { Icon } from "@/sections/skills/icon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, InertiaPlugin } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(InertiaPlugin);

type Props = {
  className?: string;
};

export const ProgrammingLanguages = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stack-item", {
        opacity: 0,
        y: 50,
        ease: "sine.out",
        stagger: 0.5,
        scrollTrigger: {
          id: "programming-languages",
          trigger: containerRef.current,
          start: "top 70%",
          end: "30% center",
          scrub: 0.3,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      className={cn("relative", className)}
      id="programming-languages"
      ref={containerRef}
    >
      <ProgrammingLanguagesHeader />
      <div className="japanese:sm:-right-20 japanese:sm:bottom-0 japanese:left-auto japanese:-bottom-12 japanese:right-10 retro:sm:-right-10 retro:md:-right-24 absolute right-12 -bottom-14 flex items-center gap-1 sm:-right-24 sm:-bottom-2 md:-right-16">
        <Icon
          src="/logos/javascript.png"
          alt="Javascript"
          className="japanese:p-2 p-1.5"
        />
        <Icon src="/logos/go.png" alt="Golang" />
        <Icon
          src="/logos/python.png"
          alt="Python"
          className="japanese:p-2 p-1.5"
        />
        <Icon src="/logos/c-sharpe.png" alt="C#" className="japanese:p-1" />
      </div>
    </div>
  );
};
