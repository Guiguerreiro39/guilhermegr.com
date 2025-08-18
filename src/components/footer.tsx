import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants";

export const Footer = () => {
  return (
    <footer className="theme-element bg-foreground border-background text-background border-t py-10">
      <div className="px-5 sm:px-10">
        <div className="container mx-auto grid grid-cols-2 items-center justify-center gap-8 lg:grid-cols-4 lg:gap-12">
          <div className="order-2 col-span-2 space-y-4 place-self-center lg:order-1 lg:col-span-1 lg:place-self-start">
            <p className="font-secondary text-center text-sm lg:text-start">
              Guilherme Guerreiro &copy; {new Date().getFullYear()}. <br />
              All rights reserved.
            </p>
            <div className="visible flex justify-center space-x-4 lg:hidden lg:justify-start">
              <Link href={GITHUB_URL} target="_blank" aria-label="GitHub">
                <FaGithub className="size-6 transition-colors hover:text-gray-400" />
              </Link>
              <Link href={LINKEDIN_URL} target="_blank" aria-label="LinkedIn">
                <FaLinkedinIn className="size-6 transition-colors hover:text-gray-400" />
              </Link>
            </div>
          </div>

          <div className="order-1 col-span-2 flex flex-wrap justify-center gap-8 place-self-center md:space-x-12 lg:order-2">
            <Link href="#hero" className="nav-hover-btn">
              Home
            </Link>
            <Link href="#about" className="nav-hover-btn">
              About
            </Link>
            <Link href="#skills" className="nav-hover-btn">
              Skills
            </Link>
            <Link href="#timeline" className="nav-hover-btn">
              Timeline
            </Link>
            <Link href="#projects" className="nav-hover-btn">
              Projects
            </Link>
            <Link href="#contact" className="nav-hover-btn">
              Contact
            </Link>
          </div>

          <div className="order-3 hidden space-x-4 place-self-end self-center lg:flex">
            <Link href={GITHUB_URL} target="_blank" aria-label="GitHub">
              <FaGithub className="size-6 transition-colors hover:text-gray-400" />
            </Link>
            <Link href={LINKEDIN_URL} target="_blank" aria-label="LinkedIn">
              <FaLinkedinIn className="size-6 transition-colors hover:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
