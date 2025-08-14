import { LanguagesHeader } from "@/sections/skills/languages-header";
import { ProgrammingLanguagesHeader } from "@/sections/skills/programming-languages-header";
import { TechStackHeader } from "@/sections/skills/tech-stack-header";
import { TransitionIcon } from "@/sections/skills/transition-icon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, InertiaPlugin } from "gsap/all";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(InertiaPlugin);

type Props = {
  className?: string;
};

export const Languages = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stack-item", {
        opacity: 0,
        y: 50,
        ease: "sine.out",
        stagger: 0.5,
        scrollTrigger: {
          id: "languages",
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
      id="languages"
      ref={containerRef}
    >
      <LanguagesHeader />
      <div className="japanese:-right-30 japanese:-top-1 absolute -top-2 -right-26 flex rotate-[10deg] items-center">
        <TransitionIcon
          src="/logos/portugal.png"
          alt="Portuguese"
          className="p-1.5"
        />
        <TransitionIcon src="/logos/uk.png" alt="English" className="p-1.5" />
        <TransitionIcon
          src="/logos/spain.png"
          alt="Spanish"
          className="p-1.5"
        />
        <TransitionIcon
          src="/logos/japan.png"
          alt="Japanese"
          className="mt-12 p-1.5"
        />
      </div>
    </div>
  );
};
