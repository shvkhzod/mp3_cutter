"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const scenes_1 = require("./scenes");
const files_1 = require("@grammyjs/files");
// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new grammy_1.Bot("5776539701:AAG02oyoncsPGAnJO4JPJ1C0Ee2jr8yi3pI"); // <-- put your authentication token between the ""
bot.api.config.use((0, files_1.hydrateFiles)(bot.token));
bot.use((0, grammy_1.session)({
    initial: () => ({})
}));
bot.use(scenes_1.scenes.manager());
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Bu bot orqali siz mp3 musiqani kerakligi joyini kesishingiz mumkin. Boshlash uchun menga musiqani tashlang ");
}));
bot.on(":audio", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Audio yuklanmoqda...");
    yield ctx.scenes.enter("main");
}));
// Handle other messages.
bot.use(scenes_1.scenes);
// Start the bot.
bot.start();
