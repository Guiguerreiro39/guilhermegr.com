"use client";

import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useIsLoading } from "@/context/loading";

const NavBar = () => {
  // Refs for audio and navigation container
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobile = useIsMobile();
  const { isLoading } = useIsLoading();

  useEffect(() => {
    if (currentScrollY < 50) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY && !isMenuOpen) {
      // Scrolling down: hide navbar
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY - 10 && !isMenuOpen) {
      // Scrolling up: show navbar
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (isLoading) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useGSAP(() => {
    if (isMobile) {
      if (isMenuOpen) {
        gsap.from(mobileMenuRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
        });

        gsap.to(mobileMenuRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }

      if (!isMenuOpen) {
        gsap.from(mobileMenuRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });

        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
        });
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <div
        ref={navContainerRef}
        id="navbar"
        className="theme-element fixed inset-x-2 top-2 z-40 h-16 opacity-0 backdrop-blur-sm md:inset-x-6 md:top-4"
      >
        <div className="bg-foreground/50 absolute top-1/2 h-full w-full -translate-y-1/2 rounded-lg border border-none">
          <div className="flex size-full items-center justify-between p-4">
            {/* Logo and Product button */}
            <div className="flex items-center gap-7">
              <p className="font-headers text-background text-xl">GG</p>
            </div>

            {/* Navigation Links and Audio Button */}
            <nav className="flex h-full items-center">
              <div className="hidden gap-4 md:flex">
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
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <RiMenu4Line className="fill-background size-6" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {isMobile && isMenuOpen && (
        <div
          className="bg-background fixed inset-0 z-50 h-screen w-screen origin-top-right p-6"
          ref={mobileMenuRef}
        >
          <button
            className="border-foreground float-right border p-1"
            onClick={() => setIsMenuOpen(false)}
          >
            <IoMdClose className="fill-foreground size-6" />
          </button>
          <nav className="flex h-full flex-col items-center justify-center gap-8 p-4">
            <Link
              href="#hero"
              className="nav-hover-btn !text-foreground !text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="nav-hover-btn !text-foreground !text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#skills"
              className="nav-hover-btn !text-foreground !text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills
            </Link>
            <Link
              href="#timeline"
              className="nav-hover-btn !text-foreground !text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Timeline
            </Link>
            <Link
              href="#projects"
              className="nav-hover-btn !text-foreground !text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="nav-hover-btn !text-foreground !text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavBar;
