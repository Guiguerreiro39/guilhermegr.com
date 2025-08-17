import { ComponentProps, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Props = Exclude<ComponentProps<"h3">, "children"> & {
  title: string;
};

export const AnimatedTitle = ({ title, className, ...props }: Props) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateX(0) rotateY(0)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <h2
      className={cn(
        "text-background flex flex-col gap-1 text-6xl leading-[.8] uppercase drop-shadow-lg md:text-7xl",
        className,
      )}
      ref={containerRef}
      {...props}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="animated-word font-headers font-foreground opacity-0"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </h2>
  );
};
