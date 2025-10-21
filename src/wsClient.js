require("dotenv").config();
const WebSocket = require("ws");
const eventBus = require("./eventBus");

const mode = process.env.APP_MODE || "dev";
const ip =
  mode === "production" ? process.env.SERVER_IP : process.env.DEV_SERVER_IP;
const port = process.env.PORT || "8080";
const protocol = port === "443" ? "wss" : "ws";
const url = `${protocol}://${ip}:${port}`;

const ws = new WebSocket(url);

ws.on("open", () => {
  eventBus.emit("log", {
    type: "SUCCESS",
    channel: "ws",
    value: `Connected to ${url}`,
  });
  eventBus.emit("status", "Connected");

  // ✅ Никаких подписок — ждём system
});

ws.on("message", (data) => {
  try {
    const msg = JSON.parse(data);
    eventBus.emit("log", msg);
  } catch (err) {
    eventBus.emit("log", {
      type: "ERROR",
      channel: "ws",
      value: `Parse error: ${err.message}`,
    });
  }
});

ws.on("error", (err) => {
  eventBus.emit("log", {
    type: "ERROR",
    channel: "ws",
    value: `Connection error: ${err.message}`,
  });
});

ws.on("close", () => {
  eventBus.emit("status", "Disconnected");
});
