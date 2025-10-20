const Panel = require("./panel");
const term = require("terminal-kit").terminal;

/**
 * Левая боковая панель:
 * фиксированная ширина, placeholder для меню/метрик
 */
class LeftBar extends Panel {
  draw() {
    super.drawFrame();
    // Заголовок-заглушка
    term.moveTo(this.x + 2, this.y + 1).white("📂 LeftBar");
  }
}

module.exports = LeftBar;
