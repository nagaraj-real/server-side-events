import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import SSEManager from "./sse-manager.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use("/static", express.static("client"));

app.use("/home", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use("/test", (req, res) => {
  res.setHeader("content-type", "text/content");
  res.send("test");
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const testData = "testdata";
  // Register a listener for SSE messages
  function onSSEMessage(data) {
    res.write(`data: ${testData}\n\n`);
    res.write(`data: ${data}\n\n`);
    res.end();
  }
  console.log(onSSEMessage);
  SSEManager.addListener("add", onSSEMessage);

  // Remove the listener when the connection is closed
  res.on("close", () => {
    SSEManager.removeListener("add", onSSEMessage);
  });
});

app.post("/api/save", (req, res) => {
  SSEManager.emit("add", "saving done");
  res.json({});
});

app.listen("3000", () => {
  console.log("listening to 3000");
});
