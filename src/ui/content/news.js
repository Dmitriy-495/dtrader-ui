const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class News extends Panel {
  draw() {
    super.drawFrame();

    // Заголовок
    term.moveTo(this.x + 2, this.y + 1).white("📰 News");

    // Пример новости (заглушка)
    term.moveTo(this.x + 2, this.y + 2).gray("No news available.");
  }
}

module.exports = News;
