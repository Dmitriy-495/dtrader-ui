require("dotenv").config();

const StatusBar = require("./statusbar");
const Logs = require("./logs");
const News = require("./news");

/**
 * Центральная область контента между боковыми панелями.
 * Содержит:
 * - Logs (верхняя часть)
 * - News (нижняя часть)
 * - StatusBar (3 строки внизу)
 */
class Content {
  constructor(bounds) {
    this.x = bounds.x;
    this.y = bounds.y;
    this.width = bounds.width;
    this.height = bounds.height;

    // Загружаем пропорции из .env
    const LOGS_HEIGHT_PERCENT = parseInt(
      process.env.LOGS_HEIGHT_PERCENT || "65"
    );
    const NEWS_HEIGHT_PERCENT = parseInt(
      process.env.NEWS_HEIGHT_PERCENT || "35"
    );

    // Высота без statusbar (теперь 3 строки)
    const subHeight = this.height - 3;

    // Вычисляем высоты логов и новостей
    const logsHeight = Math.floor(subHeight * (LOGS_HEIGHT_PERCENT / 100));
    const newsHeight = subHeight - logsHeight;

    // Инициализация компонентов
    this.logs = new Logs();
    this.logs.setBounds({
      x: this.x,
      y: this.y,
      width: this.width,
      height: logsHeight,
    });

    this.news = new News();
    this.news.setBounds({
      x: this.x,
      y: this.y + logsHeight,
      width: this.width,
      height: newsHeight,
    });

    this.statusbar = new StatusBar();
    this.statusbar.setBounds({
      x: this.x,
      y: this.y + this.height - 3,
      width: this.width,
      height: 3,
    });
  }

  draw() {
    this.logs.draw();
    this.news.draw();
    this.statusbar.draw();
  }
}

module.exports = Content;
