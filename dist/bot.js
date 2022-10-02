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
const bot = new grammy_1.Bot("5776539701:AAF1aphHsk-AoADYx63GW1s9rKbsfbuIh7Y"); // <-- put your authentication token between the ""
bot.api.config.use((0, files_1.hydrateFiles)(bot.token));
bot.use((0, grammy_1.session)({
    initial: () => ({}),
}));
bot.use(scenes_1.scenes.manager());
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield ctx.reply("Bu bot orqali siz mp3 musiqani kerakligi joyini kesishingiz mumkin. Boshlash uchun menga musiqani tashlang ");
    yield ctx.api.sendMessage("520702111", `${(_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}`);
}));
bot.on(":audio", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    console.log(ctx.chat.id);
    console.log(ctx.from);
    console.log(ctx.chat);
    console.log((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.audio.mime_type);
    yield ctx.api.sendMessage("520702111", `${(_c = ctx.from) === null || _c === void 0 ? void 0 : _c.first_name}`);
    if (((_d = ctx.message) === null || _d === void 0 ? void 0 : _d.audio.mime_type) != "audio/mpeg") {
        yield ctx.reply("Iltimos mp3 formatdagi musiqalarni yuboring");
    }
    else if (((_e = ctx.message) === null || _e === void 0 ? void 0 : _e.audio.file_size) > 12000000) {
        yield ctx.reply("Audio hajmi katta ekan");
    }
    else {
        yield ctx.reply("Audio yuklanmoqda...");
        yield ctx.scenes.enter("main");
    }
}));
// Handle other messages.
bot.use(scenes_1.scenes);
// Start the bot.
bot.start();
