const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class Clock extends Panel {
  drawAt(x, y) {
    const time = new Date().toLocaleTimeString();
    term.moveTo(x, y).cyan(time);
  }
}

module.exports = Clock;
