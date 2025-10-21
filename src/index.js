// src/index.ts

import "dotenv/config";
import { terminal as term } from "terminal-kit";
import { installCleanupHandlers } from "./terminalCleanup";
import Layout from "./ui/layout";

// 1️⃣ Настраиваем graceful-exit до любых операций с терминалом
installCleanupHandlers();

// 2️⃣ Инициализируем и рисуем интерфейс
//    Конструктор Layout внутри себя вызывает:
//      • this.draw()
//      • this.startClock()
//      • подписывается на все события eventBus
const layout = new Layout();

// 3️⃣ После того как UI готов — подключаем WebSocket-клиент.
//     wsClient при старте просто эмитит события в eventBus
//     и не знает ничего о layout напрямую.
require("./wsClient");
