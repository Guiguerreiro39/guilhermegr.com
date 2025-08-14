import useMousePosition from "@/hooks/useMousePosition";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export const TransitionIcon = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const mousePosition = useMousePosition();

  return (
    <div
      className="stack-item col-span-1 flex-shrink-0"
      onMouseEnter={(e) => {
        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill();
          },
        });

        tl.timeScale(1.2);

        const media = e.currentTarget.querySelector("img");

        tl.to(media, {
          inertia: {
            x: {
              velocity: mousePosition.deltaX * 30, // Higher number = movement amplified
              end: 0, // Go back to the initial position
            },
            y: {
              velocity: mousePosition.deltaY * 30, // Higher number = movement amplified
              end: 0, // Go back to the initial position
            },
          },
        });

        tl.fromTo(
          media,
          {
            rotate: 0,
          },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30, // Returns a value between -15 & 15
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut", // Will slow at the begin and the end
          },
          "<",
        ); // Means that the animation starts at the same time as the previous tween
      }}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "pointer-events-none h-fit w-[50px] md:w-[60px]",
          className,
        )}
        style={{
          willChange: "transform",
        }}
      />
    </div>
  );
};
