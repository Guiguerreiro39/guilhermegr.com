import { AnimatedTitle } from "@/components/animated-title";
import { TimelineContent } from "@/sections/timeline/timeline-content";

export const Timeline = () => {
  return (
    <section className="min-h-dvh w-screen overflow-hidden py-36">
      <AnimatedTitle title="My life in a nutshell" className="px-5 sm:px-10" />
      <TimelineContent />
    </section>
  );
};
