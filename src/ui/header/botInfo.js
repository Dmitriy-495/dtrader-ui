require("dotenv").config();
const Panel = require("../panel");
const term = require("terminal-kit").terminal;

class BotInfo extends Panel {
  draw() {
    const text = `${process.env.BOT_NAME} v${process.env.BOT_VERSION} [${process.env.APP_MODE}]`;
    term.moveTo(this.x + 2, this.y + 1).gray(text);
  }
}

module.exports = BotInfo;
