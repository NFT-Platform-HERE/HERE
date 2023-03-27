const withTwin = require("./withTwin.js");
const withTM = require("next-transpile-modules")(["react-quill"]);

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM(
  withTwin({
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    // ...
  }),
);
