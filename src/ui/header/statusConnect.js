const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class StatusConnect extends Panel {
  constructor() {
    super();
    this.status = "Disconnected";
  }

  setStatus(status) {
    this.status = status;
  }

  drawAt(x, y) {
    const color = this.status === "Connected" ? "green" : "red";
    term.moveTo(x, y)[color](`Exchange: ${this.status}`);
  }
}

module.exports = StatusConnect;
