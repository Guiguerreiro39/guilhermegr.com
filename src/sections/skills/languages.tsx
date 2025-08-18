import { LanguagesHeader } from "@/sections/skills/languages-header";
import { Icon } from "@/sections/skills/icon";
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
      <div className="japanese:-right-36 japanese:md:top-1 japanese:sm:top-4 japanese:-top-2 retro:md:top-6 retro:sm:top-4 absolute top-0 -right-23 flex rotate-[10deg] items-center sm:top-2 md:top-6 md:-right-26">
        <Icon src="/logos/portugal.png" alt="Portuguese" className="p-1.5" />
        <Icon src="/logos/uk.png" alt="English" className="p-1.5" />
        <Icon src="/logos/spain.png" alt="Spanish" className="p-1.5" />
        <Icon src="/logos/japan.png" alt="Japanese" className="mt-5 p-1.5" />
      </div>
    </div>
  );
};
