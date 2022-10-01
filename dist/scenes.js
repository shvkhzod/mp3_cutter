"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenes = void 0;
const grammy_scenes_1 = require("grammy-scenes");
const main_1 = require("./main");
exports.scenes = new grammy_scenes_1.ScenesComposer();
exports.scenes.scene(main_1.mainScene);
