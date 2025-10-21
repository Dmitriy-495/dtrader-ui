const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class Logs extends Panel {
  constructor() {
    super();
    this.buffer = [];
    this.maxLines = 100;
  }

  push(type, text) {
    const maxWidth = this.width - 4;
    const lines = this.wrapText(text, maxWidth);

    for (const line of lines) {
      this.buffer.push({ type, text: line });
      if (this.buffer.length > this.maxLines) {
        this.buffer.shift();
      }
    }
  }

  wrapText(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (const word of words) {
      if ((line + word).length + 1 <= maxWidth) {
        line += (line ? " " : "") + word;
      } else {
        lines.push(line);
        line = word;
      }
    }

    if (line) lines.push(line);
    return lines;
  }

  draw() {
    super.drawFrame();

    const startY = this.y + 1;
    const visibleLines = this.height - 2;
    const recent = this.buffer.slice(-visibleLines);

    for (let i = 0; i < recent.length; i++) {
      const { type, text } = recent[i];
      const color = this.getColor(type);
      term.moveTo(this.x + 2, startY + i)[color](text.padEnd(this.width - 4));
    }
  }

  getColor(type) {
    const level = type.toLowerCase();
    return (
      {
        error: "red",
        warn: "yellow",
        warning: "yellow",
        success: "brightGreen",
        info: "green",
        debug: "gray",
      }[level] || "white"
    );
  }
}

module.exports = Logs;
