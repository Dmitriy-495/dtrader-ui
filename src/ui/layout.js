require("dotenv").config();
const term = require("terminal-kit").terminal;

const Header = require("./header");
const Footer = require("./footer");
const LeftBar = require("./leftbar");
const RightBar = require("./rightbar");
const Content = require("./content");

// Параметры из .env
const LEFTBAR_WIDTH = parseInt(process.env.LEFTBAR_WIDTH || "54");
const RIGHTBAR_WIDTH = parseInt(process.env.RIGHTBAR_WIDTH || "54");
const MIN_TERMINAL_WIDTH = parseInt(process.env.MIN_TERMINAL_WIDTH || "162");
const MIN_TERMINAL_HEIGHT = parseInt(process.env.MIN_TERMINAL_HEIGHT || "48");

class Layout {
  constructor() {
    // Подготовка терминала
    term.clear();
    term.hideCursor();
    term.grabInput({ mouse: "button" });

    // Ctrl+C → выход
    term.on("key", (name) => {
      if (name === "CTRL_C") this.exit();
    });

    // Первая отрисовка
    this.draw();

    // Перерисовка при изменении размера
    term.on("resize", () => this.draw());

    // Обновление часов
    this.startClock();
  }

  draw() {
    const { width, height } = term;

    // Минимальные размеры
    if (width < MIN_TERMINAL_WIDTH || height < MIN_TERMINAL_HEIGHT) {
      term.clear();
      term
        .moveTo(1, 1)
        .red(
          `Terminal too small. Required ≥${MIN_TERMINAL_WIDTH}×${MIN_TERMINAL_HEIGHT}. ` +
            `Current: ${width}×${height}`
        );
      return;
    }

    // Очищаем всё
    term.clear();

    // Header (3 строки сверху)
    this.header = new Header();
    this.header.setBounds({ x: 1, y: 1, width, height: 3 });

    // Footer (3 строки снизу)
    this.footer = new Footer();
    this.footer.setBounds({ x: 1, y: height - 2, width, height: 3 });

    // LeftBar
    this.leftbar = new LeftBar();
    this.leftbar.setBounds({
      x: 1,
      y: 4,
      width: LEFTBAR_WIDTH,
      height: height - 6,
    });

    // RightBar
    this.rightbar = new RightBar();
    this.rightbar.setBounds({
      x: width - RIGHTBAR_WIDTH + 1,
      y: 4,
      width: RIGHTBAR_WIDTH,
      height: height - 6,
    });

    // Content: между бартами
    const contentX = LEFTBAR_WIDTH + 2;
    const contentY = 4;
    const contentWidth = width - LEFTBAR_WIDTH - RIGHTBAR_WIDTH - 2;
    const contentHeight = height - 6;

    this.content = new Content({
      x: contentX,
      y: contentY,
      width: contentWidth,
      height: contentHeight,
    });

    // Отрисовываем всё
    this.header.draw();
    this.footer.draw();
    this.leftbar.draw();
    this.rightbar.draw();
    this.content.draw();
  }

  startClock() {
    this.clock = setInterval(() => {
      this.header && this.header.draw();
    }, 1000);
  }

  exit() {
    clearInterval(this.clock);
    term.grabInput(false);
    term.showCursor();
    term.clear();
    process.exit(0); // ✅ завершение без ошибки
  }
}

module.exports = Layout;
