const px_to_rem = (x) => {
  return { ...Array.from(Array(x + 1)).map((_, i) => `${i / 16}rem`) };
};

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      borderWidth: px_to_rem(100),
      borderRadius: px_to_rem(100),
      fontSize: px_to_rem(100),
      lineHeight: px_to_rem(100),
      width: px_to_rem(1500),
      height: px_to_rem(1500),
      margin: px_to_rem(100),
      padding: px_to_rem(100),
      minWidth: px_to_rem(1500),
      minHeight: px_to_rem(1500),
      spacing: px_to_rem(300),
      screens: {
        mobile: { max: "480px" },
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        white: "#ffffff",
        "red-0": "#ede1e1",
        "red-1": "#ff9999",
        "red-2": "#ff5050",
        "red-3": "#ff2d54",
        "pink-0": "#fff6f6",
        "pink-1": "#ffe4e4",
        "pink-2": "#fadbda",
        "pink-3": "#FFC6CC",
        "pen-0": "#e5e5e5",
        "pen-1": "#9f9f9f",
        "pen-2": "#655f5f",
        "pen-3": "#443B3B",
        "pen-4": "#868E96",
        "icon-1": "#FFD8D9",
        "icon-2": "#FFC6CC",
        "icon-3": "#FFF4EF",
        "icon-4": "#FFE2E5",
        "icon-5": "#FFF0F0",
      },
      keyframes: {
        wave: {
          "0%, 50%, 100%": {
            transform: "translate(0%, -10%)",
          },
          "25%, 75%": {
            transform: "translate(2%, 10%)",
          },
        },
        blob: {
          "0%": {
            "border-radius": "65% 60% 35% 50% / 65% 38% 75% 36%",
          },
          "25%": {
            "border-radius": "89% 54% 62% 42% / 83% 45% 75% 63%",
          },
          "50%": {
            "border-radius": "65% 60% 35% 50% / 65% 38% 75% 36%",
          },
          "75%": {
            "border-radius": "46% 54% 50% 50% / 35% 61% 39% 65%",
          },
          "100%": {
            "border-radius": "65% 60% 35% 50% / 65% 38% 75% 36%",
          },
        },
      },
      animation: {
        wave: "wave 5s ease-in-out infinite",
        blob: "blob 15s ease-in-out infinite",
      },
    },
  },
  important: true,
  plugins: [],
};
