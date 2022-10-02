
import { InputFile } from "grammy"
import {Scene} from "grammy-scenes"
import { Audio } from "grammy/out/types.node"
const fs = require("fs")

import { BotContext } from "./bot"

const MP3 = require("mp3-cutter")

export const mainScene = new Scene<BotContext>("main")
    var thePath = ""
    var startPoint = 0
    var endPoint = 0
    var theMusic:Audio;
    var outPath = ""
mainScene.use(async(ctx, next)=> {
    theMusic = ctx.msg?.audio!
    const fileId = theMusic?.file_id

    const file = await ctx.getFile()

    const path = await file.download()
    thePath = path
    outPath = thePath.slice(0, thePath.length - 8) + "output.mp3"

    // const path = await file.download(`./media/${ctx.chat?.id}`)
    // thePath = path
    // outPath = thePath.slice(0, thePath.length) + "-output.mp3"

    console.log("File saved at ", path)
    console.log(outPath)

   

    console.log("entering to the main scene")
    
    return next()
})




mainScene.do( async (ctx) => {
    await ctx.reply(`Boshlang'ich nuqtasini kiriting, masalan 02:37`)
   
})

mainScene.wait().on("message:text", async(ctx, next) => {
    if(ctx.message.text.includes(":") || ctx.message.text.length == 5) {
        const splitted = ctx.message.text.split(":")
        const mins = parseInt(splitted[0])
        const seconds = parseInt(splitted[1])
        const total = 60 * mins + seconds
        console.log(total)
        startPoint = total
        await ctx.reply("Tugatish nuqtasini kiriting, masalan 02:37")
        return next()
        
    } else {
        await ctx.reply("Xato format,boshlang'ich nuqtani qaytadan kiriting, masalan 00:40 yoki 01:56")
    }
})


   

mainScene.wait().on("message:text", async(ctx) => {
    if(ctx.message.text.includes(":") || ctx.message.text.length == 5) {
        const splitted = ctx.message.text.split(":")
        const mins = parseInt(splitted[0])
        const seconds = parseInt(splitted[1])
        const total = 60 * mins + seconds
        endPoint = total
    
        if(endPoint<startPoint) {
            console.log("Invalid")
            await ctx.reply("Tugatish nuqtasi boshlash nuqtasidan kichik bo'lishi kerak, qaytadan tugatish nuqtasini kiriting")
        } else {
            console.log(thePath, startPoint, endPoint)
            console.log(outPath)
            await ctx.reply("Musiqani kesmoqdaman, iltimos biroz kuting...")
            var theAudio = await MP3.cut({
                src: thePath,
                target: outPath,
                start: startPoint,
                end: endPoint
        
                
            })
            await ctx.replyWithAudio(new InputFile(outPath))
            fs.unlinkSync(thePath)
            fs.unlinkSync(outPath)
            ctx.scene.exit()
        }
    } else {
        await ctx.reply("Xato format,boshlang'ich nuqtani qaytadan kiriting, masalan 00:40 yoki 01:56")
    }
 
})






