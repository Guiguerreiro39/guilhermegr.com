import { gsap } from "gsap";
import { ScrollTrigger, DrawSVGPlugin, MotionPathPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TIMELINE_DATA } from "@/constants";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
gsap.defaults({ ease: "none" });

export const TimelineContent = () => {
  useGSAP(() => {
    const pulses = gsap
      .timeline({
        defaults: {
          duration: 0.05,
          autoAlpha: 1,
          scale: 2,
          transformOrigin: "center",
          ease: "elastic(2.5, 1)",
        },
      })
      .to(".ball02, .text01", {}, 0.152)
      .to(".ball03, .text02", {}, 0.268)
      .to(".ball04, .text03", {}, 0.372)
      .to(".ball05, .text04", {}, 0.475)
      .to(".ball06, .text05", {}, 0.578)
      .to(".ball07, .text06", {}, 0.688)
      .to(".ball08, .text07", {}, 0.804);

    const main = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: "#timeline-stage",
          scrub: true,
          start: "top 105%",
          end: "bottom center",
        },
      })
      .to(".ball01", { duration: 0.05, autoAlpha: 1 })
      .from(".theLine", { drawSVG: 0 }, 0)
      .to(
        ".ball01",
        {
          motionPath: {
            path: ".theLine",
            align: ".theLine",
            alignOrigin: [0.5, 0.5],
          },
        },
        0,
      )
      .add(pulses, 0);

    return () => {
      main.kill();
      pulses.kill();
    };
  });

  return (
    <svg
      id="timeline-stage"
      className="mt-36 max-w-screen overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 1650"
    >
      <path className="line01 line" d="M 30 200 570 200"></path>
      <path className="line02 line" d="M 30 400 570 400"></path>
      <path className="line03 line" d="M 30 600 570 600"></path>
      <path className="line04 line" d="M 30 800 570 800"></path>
      <path className="line05 line" d="M 30 1000 570 1000"></path>
      <path className="line06 line" d="M 30 1200 570 1200"></path>
      <path className="line07 line" d="M 30 1400 570 1400"></path>
      {TIMELINE_DATA.map((item, index) => (
        <Fragment key={item.title}>
          <text
            className={cn("text-[12px]", item.id)}
            x="60"
            y={index * 200 + 180}
          >
            {item.date}
          </text>
          <text className={cn("text-[8px]", item.id)} x={item.x} y={item.y}>
            {item.title}
            <tspan
              className={cn("fill-background/70 text-end text-[5px]", item.id)}
              x={item.dx}
              y={item.y + 8}
            >
              {item.description}
            </tspan>
          </text>
        </Fragment>
      ))}

      <path
        className="theLine"
        d="M -5 0 Q 398 238 343 375 T 343 579 Q 427 670 348 853 T 388 1173 C 559 1337 287 1329 428 1463 C 502 1540 402 1587 267 1651"
        fill="none"
        strokeWidth="10px"
      />

      <circle
        className="ball ball01"
        style={{ visibility: "visible" }}
        r="20"
        cx="50"
        cy="100"
      ></circle>
      <circle className="ball ball02" r="20" cx="274" cy="201"></circle>
      <circle className="ball ball03" r="20" cx="334" cy="401"></circle>
      <circle className="ball ball04" r="20" cx="345" cy="601"></circle>
      <circle className="ball ball05" r="20" cx="363" cy="801"></circle>
      <circle className="ball ball06" r="20" cx="312" cy="1001"></circle>
      <circle className="ball ball07" r="20" cx="405" cy="1201"></circle>
      <circle className="ball ball08" r="20" cx="380" cy="1401"></circle>
    </svg>
  );
};
