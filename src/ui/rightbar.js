const Panel = require("./panel");
const term = require("terminal-kit").terminal;

/**
 * Правая боковая панель:
 * фиксированная ширина, placeholder для индикаторов
 */
class RightBar extends Panel {
  draw() {
    super.drawFrame();
    term.moveTo(this.x + 2, this.y + 1).white("📊 RightBar");

    // Пример latency (заглушка)
    term
      .moveTo(this.x + 2, this.y + 3)
      .white("Latency:")
      .green(" 77 ms");

    // Пример статуса биржи
    term
      .moveTo(this.x + 2, this.y + 5)
      .white("Exchange:")
      .green(" Connected");
  }
}

module.exports = RightBar;
