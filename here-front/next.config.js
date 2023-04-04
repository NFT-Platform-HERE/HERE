const withTwin = require("./withTwin.js");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: true,
  images: {
    domains: ["s3.ap-northeast-2.amazonaws.com"], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  },
  swcMinify: true,
  output: "standalone",
  // ...
});
