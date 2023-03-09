const { join } = require('path');

const px_to_rem = (x) => { return { ...Array.from(Array(x)).map((_, i) => `${i / 16}rem`) } };

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
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
    },
  },
  plugins: [],
}