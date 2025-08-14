import { cn } from "@/lib/utils";
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

export const TechStack = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".stack-item", {
        opacity: 0,
        y: 50,
        ease: "sine.out",
        stagger: 0.5,
        scrollTrigger: {
          id: "tech-stack",
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
      id="tech-stack"
      ref={containerRef}
    >
      <TechStackHeader />
      <div className="japanese:md:right-48 japanese:sm:-bottom-1 japanese:sm:right-36 japanese:right-58 japanese:-bottom-30 absolute right-20 bottom-0 flex items-center gap-2">
        <TransitionIcon src="/logos/react.png" alt="React" />
        <TransitionIcon src="/logos/nextjs.png" alt="Next.js" />
        <TransitionIcon src="/logos/tailwindcss.png" alt="Tailwind CSS" />
      </div>
      <div className="japanese:md:-bottom-18 japanese:sm:-left-8 japanese:-left-24 japanese:-bottom-15 absolute -bottom-18 -left-8 flex items-center gap-2">
        <TransitionIcon src="/logos/typescript.png" alt="TypeScript" />
        <TransitionIcon src="/logos/shadcn.svg" alt="Shadcn" />
        <TransitionIcon src="/logos/react-query.png" alt="React Query" />
        <TransitionIcon src="/logos/trpc.png" alt="TRPC" className="p-1.5" />
        <TransitionIcon src="/logos/prisma.png" alt="Prisma" className="p-2" />
        <TransitionIcon src="/logos/effect.png" alt="Effect" />
      </div>
    </div>
  );
};
