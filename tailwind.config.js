/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: { 500: "#4F55F0" },
      white: "#FBF8FF",
      gray: { 400: "#ADA9BB", 600: "#484554" },
      neutral: {
        100: "#F4ECFF",
        200: "#E2CDFF",
        500: "#948BB7",
        800: "#312C4A",
      },
      black: "#1C1A27",
      danger: "#FF4951",
      transparent: "transparent",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
