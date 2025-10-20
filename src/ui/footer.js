const Panel = require("./panel");
const term = require("terminal-kit").terminal;

/**
 * Footer (3 строки снизу):
 * 1) рамка
 * 2) prompt
 * 3) рамка
 */
class Footer extends Panel {
  draw() {
    super.drawFrame();
    // Командная строка внутри
    term.moveTo(this.x + 2, this.y + 1).white("> ");
  }
}

module.exports = Footer;
