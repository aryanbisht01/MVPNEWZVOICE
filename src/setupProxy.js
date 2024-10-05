// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://kcvjp07281.execute-api.us-east-1.amazonaws.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove /api prefix when forwarding the request
      },
    })
  );
};
