const term = require("terminal-kit").terminal;

const levelColors = {
  info: term.cyan,
  warn: term.yellow,
  error: term.red,
  debug: term.gray,
  success: term.green,
};

function logMessage(level, message) {
  const timestamp = new Date().toISOString();
  const color = levelColors[level] || term.white;
  const label = `[${level.toUpperCase()}][${timestamp}] `;
  color(`${label}${message}\n`);
}

module.exports = { logMessage };
