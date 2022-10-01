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
exports.mainScene = void 0;
const grammy_1 = require("grammy");
const grammy_scenes_1 = require("grammy-scenes");
const fs = require("fs");
const MP3 = require("mp3-cutter");
exports.mainScene = new grammy_scenes_1.Scene("main");
var thePath = "";
var startPoint = 0;
var endPoint = 0;
var theMusic;
var outPath = "";
exports.mainScene.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    theMusic = (_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.audio;
    const fileId = theMusic === null || theMusic === void 0 ? void 0 : theMusic.file_id;
    const file = yield ctx.getFile();
    const path = yield file.download();
    thePath = path;
    outPath = thePath.slice(0, thePath.length - 8) + "output.mp3";
    // const path = await file.download(`./media/${ctx.chat?.id}`)
    // thePath = path
    // outPath = thePath.slice(0, thePath.length) + "-output.mp3"
    console.log("File saved at ", path);
    console.log(outPath);
    console.log("entering to the main scene");
    return next();
}));
exports.mainScene.do((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(`Boshlang'ich nuqtasini kiriting, masalan 02:37`);
}));
exports.mainScene.wait().on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.message.text.includes(":") || ctx.message.text.length == 5) {
        const splitted = ctx.message.text.split(":");
        const mins = parseInt(splitted[0]);
        const seconds = parseInt(splitted[1]);
        const total = 60 * mins + seconds;
        console.log(total);
        startPoint = total;
        yield ctx.reply("Tugatish nuqtasini kiriting, masalan 02:37");
        ctx.scene.resume();
    }
    else {
        yield ctx.reply("Xato format,boshlang'ich nuqtani qaytadan kiriting, masalan 00:40 yoki 01:56");
    }
}));
exports.mainScene.wait().on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.message.text.includes(":") || ctx.message.text.length == 5) {
        const splitted = ctx.message.text.split(":");
        const mins = parseInt(splitted[0]);
        const seconds = parseInt(splitted[1]);
        const total = 60 * mins + seconds;
        endPoint = total;
        if (endPoint < startPoint) {
            console.log("Invalid");
            yield ctx.reply("Tugatish nuqtasi boshlash nuqtasidan kichik bo'lishi kerak, qaytadan tugatish nuqtasini kiriting");
        }
        else {
            console.log(thePath, startPoint, endPoint);
            console.log(outPath);
            yield ctx.reply("Musiqani kesmoqdaman, iltimos biroz kuting...");
            var theAudio = yield MP3.cut({
                src: thePath,
                target: outPath,
                start: startPoint,
                end: endPoint
            });
            yield ctx.replyWithAudio(new grammy_1.InputFile(outPath));
            // fs.unlinkSync(thePath)
            // fs.unlinkSync(outPath)
            ctx.scene.exit();
        }
    }
    else {
        yield ctx.reply("Xato format,boshlang'ich nuqtani qaytadan kiriting, masalan 00:40 yoki 01:56");
    }
}));
