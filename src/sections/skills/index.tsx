import { Languages } from "@/sections/skills/languages";
import { ProgrammingLanguages } from "@/sections/skills/programming-languages";
import { TechStack } from "@/sections/skills/tech-stack";

export const Skills = () => {
  return (
    <section
      className="flex min-h-dvh w-screen flex-col gap-28 overflow-hidden px-5 py-36 sm:px-10"
      id="skills"
    >
      <TechStack className="ml-18 self-center sm:self-start md:ml-24" />
      <ProgrammingLanguages className="japanese:sm:ml-12 japanese:sm:mr-22 japanese:ml-12 retro:sm:ml-24 retro:ml-20 mt-32 ml-12 self-start sm:mt-16 sm:mr-24 sm:ml-24 sm:self-end" />
      <Languages className="japanese:mr-24 mt-16 mr-8 self-center sm:ml-24 sm:self-start md:ml-44" />
    </section>
  );
};
