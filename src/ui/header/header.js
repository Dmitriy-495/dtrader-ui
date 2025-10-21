const Panel = require("../panel");
const BotInfo = require("./botInfo");
const Clock = require("./clock");
const StatusConnect = require("./statusConnect");

class Header extends Panel {
  constructor() {
    super();
    this.botInfo = new BotInfo();
    this.clock = new Clock();
    this.statusConnect = new StatusConnect();
  }

  setBounds(bounds) {
    super.setBounds(bounds);

    this.botInfo.setBounds(bounds);
    this.clock.setBounds(bounds);
    this.statusConnect.setBounds(bounds);
  }

  draw() {
    super.drawFrame();

    // ⬅️ BotInfo: слева
    this.botInfo.draw();

    // 🕒 Clock: по центру
    const centerX = this.x + Math.floor(this.width / 2) - 5;
    this.clock.drawAt(centerX, this.y + 1);

    // ➡️ StatusConnect: справа
    const rightText = `Exchange: ${this.statusConnect.status}`;
    const rightX = this.x + this.width - rightText.length - 2;
    this.statusConnect.drawAt(rightX, this.y + 1);
  }

  setConnectionStatus(status) {
    this.statusConnect.setStatus(status);
  }
}

module.exports = Header;
