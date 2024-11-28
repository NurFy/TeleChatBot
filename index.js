import bot, { message } from "./lib/connection.js";
import { requestApi } from "./lib/components.js";
import { printer } from "./lib/logger.js";

bot.command(
  "start",
  async (ctx) =>
    await ctx.reply("*Telegram Chat Bot*\n\nSilahkan mulai percakapan\\.", {
      parse_mode: "MarkdownV2",
    })
);

bot.on(message(), async (ctx) => {
  const message = (ctx.update || ctx).message;
  try {
    const result = await requestApi(message.text);
    await ctx.reply(result);
  } catch (error) {
    console.log(error);
    await ctx.reply("error, please check log");
  } finally {
    printer(ctx);
  }
});

bot.launch({ dropPendingUpdates: true }, async () =>
  console.log("logged in as", (await bot.telegram.getMe()).username)
);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
