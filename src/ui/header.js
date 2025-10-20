const Panel = require("./panel");
const term = require("terminal-kit").terminal;

/**
 * Header (3 строки сверху):
 * 1) рамка
 * 2) бот + время + индикаторы
 * 3) рамка
 */
class Header extends Panel {
  draw() {
    // Нарисовать рамку (три строки) целиком
    super.drawFrame();

    // Сбор данных
    const mode = process.env.APP_MODE || "development";
    const title = ` dtrader-ui v1.0.0 [${mode}] `;
    const now = new Date().toLocaleTimeString();

    // Левый блок: название и режим
    term.moveTo(this.x + 2, this.y + 1).white(title);

    // Центр: текущее время
    const cx = Math.floor((term.width - now.length) / 2);
    term.moveTo(cx, this.y + 1).white(now);

    // Право: индикаторы SRV и EXC (заглушки)
    const srv = "SRV ⏺";
    const exc = "EXC ⏺";
    const indicators = `${srv}   ${exc}`;
    term
      .moveTo(this.x + this.width - indicators.length - 2, this.y + 1)
      .white(indicators);
  }
}

module.exports = Header;
