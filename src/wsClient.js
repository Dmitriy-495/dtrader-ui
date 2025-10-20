require("dotenv").config();
const WebSocket = require("ws");
const { logMessage } = require("./logger");

const {
  SERVER_IP,
  DEV_SERVER_IP,
  PORT,
  APP_MODE = "development",
} = process.env;

const targetIP = APP_MODE === "production" ? SERVER_IP : DEV_SERVER_IP;
const WS_URL = `ws://${targetIP}:${PORT}`;

function connectWebSocket() {
  logMessage("info", `🚀 App mode: ${APP_MODE}`);
  logMessage("info", `📡 Connecting to ${WS_URL}...`);

  const ws = new WebSocket(WS_URL);

  ws.on("open", () => {
    logMessage("success", "✅ Connected to server");

    const subscribeMessage = {
      type: "subscribe",
      channels: ["logs", "indicators", "ticks"],
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(subscribeMessage));
    logMessage(
      "info",
      "📨 Sent subscription to channels: logs, indicators, ticks"
    );
  });

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (message.type === "log") {
        logMessage(message.level, `[${message.category}] ${message.message}`);
      }

      if (message.type === "tick") {
        logMessage("info", `📈 Tick: ${message.symbol} @ ${message.price}`);
      }

      if (message.type === "indicator") {
        logMessage(
          "info",
          `📊 Indicator: ${message.name} → ${JSON.stringify(message.data)}`
        );
      }

      if (message.type === "subscribed") {
        logMessage(
          "success",
          `✅ Subscribed to: ${message.channels.join(", ")}`
        );
      }

      if (message.type === "error") {
        logMessage("error", `❌ ${message.error} - ${message.details}`);
      }
    } catch (err) {
      logMessage("error", `Failed to parse message: ${err.message}`);
    }
  });

  ws.on("close", () => {
    logMessage("warn", "⚠️ Connection closed");
  });

  ws.on("error", (err) => {
    logMessage("error", `WebSocket error: ${err.message}`);
  });
}

module.exports = { connectWebSocket };
