import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export const AboutStats = () => {
  useGSAP(() => {
    ScrollTrigger.getById("about-stats")?.kill();

    const textAnimation = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        id: "about-stats",
        trigger: "#about-stats",
        start: "20% bottom",
        end: "30% center",
        scrub: 0.5,
      },
    });

    textAnimation.set("#about-stats", {
      opacity: 1,
      y: 0,
    });

    const splitText = new SplitText("#about-stats", {
      type: "words",
      aria: "hidden",
    });

    textAnimation.from(splitText.words, {
      opacity: 0,
      y: -40,
      ease: "sine.out",
      stagger: 0.1,
    });

    setTimeout(() => {
      ScrollTrigger.getById("about-text")?.refresh();
    }, 100);

    return () => {
      textAnimation.kill();
    };
  });

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3" id="about-stats">
      <StatItem
        title="Education"
        description="Bachelor's degree in Computer Science at University of Minho"
      />
      <StatItem
        title="6 Years"
        description="Professional experience developing web applications"
        className="lg:mt-12"
      />
      <StatItem
        title="Typescript"
        description="Prefered language to build applications"
      />
    </div>
  );
};

const StatItem = ({
  className,
  title,
  description,
}: {
  className?: string;
  title: string;
  description: string;
}) => (
  <div
    className={cn(
      "col-span-1 flex flex-col items-center text-center",
      className,
    )}
  >
    <h3 className="text-foreground font-headers text-3xl lg:text-2xl xl:text-3xl">
      {title}
    </h3>
    <p className="max-w-60 text-balance">{description}</p>
  </div>
);
