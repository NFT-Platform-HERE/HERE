const px_to_rem = (x) => {
  return { ...Array.from(Array(x + 1)).map((_, i) => `${i / 16}rem`) };
};

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: px_to_rem(100),
      borderRadius: px_to_rem(100),
      fontSize: px_to_rem(50),
      lineHeight: px_to_rem(100),
      width: px_to_rem(1000),
      height: px_to_rem(1000),
      margin: px_to_rem(100),
      padding: px_to_rem(100),
      minWidth: px_to_rem(300),
      minHeight: px_to_rem(300),
      spacing: px_to_rem(50),
      screens: {
        mobile: { max: "480px" },
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        "red-0": "#ede1e1",
        "red-1": "#ff9999",
        "red-2": "#ff5050",
        "red-3": "#ff2d54",
        "pink-0": "#fff6f6",
        "pink-1": "#ffe4e4",
        "pink-2": "#fadbda",
        "pen-0": "#e5e5e5",
        "pen-1": "#9f9f9f",
        "pen-2": "#655f5f",
      },
    },
  },
  plugins: [],
};
