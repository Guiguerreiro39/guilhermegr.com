"use client";
import { FaArrowRight, FaGithub, FaGlobe } from "react-icons/fa";
import { useState, useRef, useId, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

interface SlideData {
  title: string;
  description: string;
  button: string;
  src: string;
  video?: string;
  github: string;
  link?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, video, title, github, link, description } = slide;

  const handleClick = (index: number) => {
    if (current !== index) {
      handleSlideClick(index);
    }

    if (current === index) {
      setOpenDialog(true);
    }
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative z-10 mx-[4vmin] flex h-[60vmin] w-[90vmin] flex-1 flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out"
        onClick={() => handleClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="bg-background absolute top-0 left-0 h-full w-full overflow-hidden rounded-[1%] transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <div className="relative h-full w-full">
            <Image
              className="absolute inset-0 object-cover object-center opacity-100 transition-opacity duration-600 ease-in-out"
              style={{
                opacity: current === index ? 1 : 0.5,
              }}
              alt={title}
              src={src}
              fill
              onLoad={imageLoaded}
              loading="eager"
              decoding="sync"
            />
            {current === index && (
              <div className="bg-foreground/40 absolute inset-0 transition-all duration-1000" />
            )}
          </div>
        </div>

        <article
          className={`relative p-[4vmin] transition-all duration-400 ease-in-out ${
            current === index ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <h2 className="font-text relative text-lg font-semibold uppercase drop-shadow-xl md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <Link href={github} target="_blank">
              <Button
                onClick={(e) => e.stopPropagation()}
                rightIcon={<FaGithub />}
              >
                Github
              </Button>
            </Link>
            {link && (
              <Link href={link} target="_blank">
                <Button
                  className="bg-accent text-accent-foreground"
                  onClick={(e) => e.stopPropagation()}
                  leftIcon={<FaGlobe />}
                >
                  Link
                </Button>
              </Link>
            )}
          </div>
        </article>
      </li>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <div className="my-4 h-[55dvh] w-[85dvw] drop-shadow-lg md:h-[50vmin] md:w-[80vmin] lg:h-[60vmin] lg:w-[90vmin]">
              {video ? (
                <video autoPlay loop className="h-full w-full" src={video} />
              ) : (
                <Image
                  alt={title}
                  src={src}
                  fill
                  onLoad={imageLoaded}
                  loading="eager"
                  decoding="sync"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-center gap-4">
              <Link href={github} target="_blank">
                <Button rightIcon={<FaGithub />}>Github</Button>
              </Link>
              {link && (
                <Link href={link} target="_blank">
                  <Button
                    className="bg-accent text-accent-foreground"
                    leftIcon={<FaGlobe />}
                  >
                    Link
                  </Button>
                </Link>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`bg-foreground focus:border-primary mx-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-transparent transition duration-200 hover:-translate-y-0.5 focus:outline-none active:translate-y-0.5 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <FaArrowRight className="text-background" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(Math.floor(slides.length / 2));

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative mx-auto h-[60vmin] w-[90vmin]"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute mx-[-4vmin] flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute top-[calc(100%+1rem)] flex w-full justify-center">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
