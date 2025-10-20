const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class StatusBar extends Panel {
  draw() {
    super.drawFrame();

    // Единственная строка содержимого между рамками
    term
      .moveTo(this.x + 2, this.y + 1)
      .white("Status: OK | Mode: ACTIVE | SRV: ⏺ | EXC: ⏺");
  }
}

module.exports = StatusBar;
