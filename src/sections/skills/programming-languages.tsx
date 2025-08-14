import { cn } from "@/lib/utils";
import { ProgrammingLanguagesHeader } from "@/sections/skills/programming-languages-header";
import { TechStackHeader } from "@/sections/skills/tech-stack-header";
import { TransitionIcon } from "@/sections/skills/transition-icon";
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
      <div className="japanese:sm:right-8 japanese:xs:-right-1 japanese:sm:bottom-0 japanese:-bottom-12 japanese:right-40 absolute -right-8 bottom-0 flex items-center gap-1">
        <TransitionIcon
          src="/logos/javascript.png"
          alt="Javascript"
          className="japanese:p-2 p-1.5"
        />
        <TransitionIcon src="/logos/go.png" alt="Golang" />
        <TransitionIcon
          src="/logos/python.png"
          alt="Python"
          className="japanese:p-2 p-1.5"
        />
        <TransitionIcon
          src="/logos/c-sharpe.png"
          alt="C#"
          className="japanese:p-1"
        />
      </div>
    </div>
  );
};
