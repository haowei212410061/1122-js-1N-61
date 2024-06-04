var express = require("express");
var app = express();

const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end("hello world\n");
});

/**
 * request:request是一個對象, 表示前端的http請求
 * 請求包含了：查詢字符串, 參數, 內容 ,http頭部等屬性
 */

/**
 * 常見屬性
 *
 */
app.get("/", async (request, response) => {
  response.setEncoding("hello world");
});

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
