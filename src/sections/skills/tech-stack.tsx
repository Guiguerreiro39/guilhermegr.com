import { cn } from "@/lib/utils";
import { TechStackHeader } from "@/sections/skills/tech-stack-header";
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
      <div className="japanese:md:right-10 japanese:sm:-bottom-1 japanese:right-24 japanese:sm:right-6 japanese:-bottom-30 absolute right-auto -bottom-34 left-8 flex items-center gap-2 sm:right-8 sm:-bottom-2 sm:left-auto">
        <Icon src="/logos/react.png" alt="React" />
        <Icon src="/logos/nextjs.png" alt="Next.js" />
        <Icon src="/logos/tailwindcss.png" alt="Tailwind CSS" />
      </div>
      <div className="japanese:md:-bottom-18 japanese:sm:left-6 japanese:md:left-20 japanese:-left-12 japanese:-bottom-15 absolute -bottom-20 -left-16 flex items-center gap-2 sm:left-10 md:left-32">
        <Icon src="/logos/typescript.png" alt="TypeScript" />
        <Icon src="/logos/shadcn.svg" alt="Shadcn" />
        <Icon src="/logos/react-query.png" alt="React Query" />
        <Icon src="/logos/trpc.png" alt="TRPC" className="p-1.5" />
        <Icon src="/logos/prisma.png" alt="Prisma" className="p-2" />
        <Icon src="/logos/effect.png" alt="Effect" />
      </div>
    </div>
  );
};
