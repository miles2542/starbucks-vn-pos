/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pos: {
          header: "#f3f4f6",
          footer: "#e5e7eb",
          cardGreen: "#78c257",
          cardGreenHover: "#6cb04e",
          cardGreenBorder: "#539739",
          summerCyan: "#38bdf8",
          summerCyanHover: "#0ea5e9",
          summerCyanBorder: "#0284c7",
          actionRed: "#ea580c",
          actionRedHover: "#c2410c",
          actionRedBorder: "#9a3412",
          btnBg: "#f8fafc",
          btnBorder: "#94a3b8",
          tenderCyan: "#bae6fd",
          tenderCyanBorder: "#7dd3fc",
          serveYellow: "#fef08a",
          serveYellowHover: "#fde047",
          serveYellowBorder: "#eab308",
          orderPurple: "#312e81",
          orderPurpleHeader: "#4338ca",
          orderHighlight: "#a3e635",
        },
      },
      boxShadow: {
        "pos-btn": "inset 1px 1px 0px rgba(255,255,255,0.8), inset -1px -1px 0px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)",
        "pos-btn-pressed": "inset 1px 1px 2px rgba(0,0,0,0.4), inset -1px -1px 0px rgba(255,255,255,0.4)",
        "pos-panel": "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
