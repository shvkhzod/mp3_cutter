import { Bot, Context, MemorySessionStorage, session, SessionFlavor } from "grammy";
import {ScenesSessionFlavor, ScenesFlavor} from "grammy-scenes"
import { scenes } from "./scenes";
import { FileFlavor, hydrateFiles } from "@grammyjs/files";



type SessionData = ScenesSessionFlavor & {

}




export type BotContext = SessionFlavor<SessionData> & ScenesFlavor & FileFlavor<Context>;

// Create an instance of the `Bot` class and pass your authentication token to it.
const bot = new Bot<BotContext>("5776539701:AAF1aphHsk-AoADYx63GW1s9rKbsfbuIh7Y"); // <-- put your authentication token between the ""

bot.api.config.use(hydrateFiles(bot.token))


bot.use(
    session({
        initial: () => ({}),
    })
)
bot.use(scenes.manager())


bot.command("start", async (ctx) => {
    await ctx.reply("Bu bot orqali siz mp3 musiqani kerakligi joyini kesishingiz mumkin. Boshlash uchun menga musiqani tashlang ")
   
})

bot.on(":audio", async (ctx) => {
    console.log(ctx.message?.audio.mime_type)
    if(ctx.message?.audio.mime_type != "audio/mpeg") {
        await ctx.reply("Iltimos mp3 formatdagi musiqalarni yuboring")
    } else if(ctx.message?.audio.file_size! > 12000000){
        await ctx.reply("Audio hajmi katta ekan")
    }else {
        await ctx.reply("Audio yuklanmoqda...")
        await ctx.scenes.enter("main")
    }
    
})
// Handle other messages.



bot.use(scenes)

// Start the bot.
bot.start();