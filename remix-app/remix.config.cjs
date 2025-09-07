const {netlifyPlugin} = require('@netlify/remix-adapter/plugin')

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  plugins: [netlifyPlugin()],
  future: {
    unstable_spaMode: true,
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
}
