import localFont from "next/font/local";

const hayamichi = localFont({
  src: [
    {
      path: "./_fonts/hayamichi.ttf",
      weight: "400",
    },
  ],
  variable: "--font-hayamichi",
});

const lastShuriken = localFont({
  src: [
    {
      path: "./_fonts/last-shuriken.otf",
      weight: "400",
    },
  ],
  variable: "--font-last-shuriken",
});

const general = localFont({
  src: [
    {
      path: "./_fonts/general.woff2",
      weight: "400",
    },
  ],
  variable: "--font-general",
});

const circularWeb = localFont({
  src: [
    {
      path: "./_fonts/circularweb-book.woff2",
      weight: "400",
    },
  ],
  variable: "--font-circular-web",
});

const monsterBeast = localFont({
  src: [
    {
      path: "./_fonts/monster-beast.otf",
      weight: "400",
    },
  ],
  variable: "--font-monster-beast",
});

const leagueSpartan = localFont({
  src: [
    {
      path: "./_fonts/league-spartan.otf",
      weight: "400",
    },
  ],
  variable: "--font-league-spartan",
});

export default [
  hayamichi.variable,
  lastShuriken.variable,
  general.variable,
  circularWeb.variable,
  monsterBeast.variable,
  leagueSpartan.variable,
].join(" ");
