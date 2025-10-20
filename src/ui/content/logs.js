const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class Logs extends Panel {
  draw() {
    super.drawFrame();

    // Заголовок
    term.moveTo(this.x + 2, this.y + 1).white("📜 Logs");

    // Пример вывода строки лога (заглушка)
    term.moveTo(this.x + 2, this.y + 2).gray("System initialized...");
  }
}

module.exports = Logs;
