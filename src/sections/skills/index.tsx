import { Languages } from "@/sections/skills/languages";
import { ProgrammingLanguages } from "@/sections/skills/programming-languages";
import { TechStack } from "@/sections/skills/tech-stack";

export const Skills = () => {
  return (
    <section className="flex min-h-dvh w-screen flex-col gap-28 overflow-hidden px-5 py-36 sm:px-10">
      <TechStack className="ml-24 self-center sm:self-start" />
      <ProgrammingLanguages className="mt-24 mr-8 ml-16 self-center sm:mt-16 sm:self-end md:mr-24 md:ml-24" />
      <Languages className="mr-20 self-center sm:ml-24 sm:self-start md:ml-44" />
    </section>
  );
};
