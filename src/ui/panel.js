const term = require("terminal-kit").terminal;

/**
 * Базовый класс «панели» с рамкой.
 * Рисует прямоугольник символами:
 *  ┌─…─┐
 *  │    │
 *  └─…─┘
 */
class Panel {
  constructor() {
    // Координаты верхнего-левого угла и размер
    this.x = 1;
    this.y = 1;
    this.width = 10;
    this.height = 5;
  }

  /**
   * Устанавливает новые границы панели
   * @param {{x:number,y:number,width:number,height:number}}
   */
  setBounds({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Рисует рамку символами Box-drawing.
   * Высота и ширина ≥ 2.
   */
  drawFrame() {
    const { x, y, width, height } = this;

    // Верхняя граница
    term.moveTo(x, y).white("┌" + "─".repeat(width - 2) + "┐");

    // Боковые границы
    for (let row = 1; row < height - 1; row++) {
      term.moveTo(x, y + row).white("│");
      term.moveTo(x + width - 1, y + row).white("│");
    }

    // Нижняя граница
    term.moveTo(x, y + height - 1).white("└" + "─".repeat(width - 2) + "┘");
  }

  /**
   * Основной метод отрисовки.
   * Можно дописать в подклассах.
   */
  draw() {
    this.drawFrame();
  }
}

module.exports = Panel;
