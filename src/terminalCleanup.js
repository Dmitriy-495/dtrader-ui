// src/terminalCleanup.js
const term = require("terminal-kit").terminal;

function cleanupAndExit(code = 0) {
  // Отключаем захват клавиатуры и мыши
  term.grabInput(false);
  // Показываем курсор, если он был скрыт
  term.hideCursor(false);
  // Сбрасываем все стили (цвета, подчёркивания и т.д.)
  term.styleReset();
  // Очищаем экран и возвращаем курсор в начало
  term.clear();
  term.moveTo(1, 1);
  process.exit(code);
}

function installCleanupHandlers() {
  // Захватываем все клавиши в терминале
  term.grabInput({ mouse: "button" });
  // Скрываем курсор для UI
  term.hideCursor();

  // При нажатии Ctrl+C, Ctrl+D или ESC — выходим
  term.on("key", (name) => {
    if (name === "CTRL_C" || name === "CTRL_D" || name === "ESCAPE") {
      cleanupAndExit();
    }
  });

  // Обрабатываем внешние сигналы
  process.on("SIGINT", () => cleanupAndExit(0));
  process.on("SIGTERM", () => cleanupAndExit(0));
  process.on("uncaughtException", (err) => {
    console.error(err);
    cleanupAndExit(1);
  });
}

module.exports = { installCleanupHandlers, cleanupAndExit };
