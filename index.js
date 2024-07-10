import "dotenv/config";

import { Telegraf } from "telegraf";
import chalk from "chalk";
import { ChatBot } from "./lib/components.js";

const time = new Date().toLocaleTimeString("id-ID", {
  timeZone: "Asia/Jakarta",
});

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.command("start", async (ctx) => {
  await ctx.reply("*Telegram Chat Bot*\n\nSilahkan mulai percakapan\\.", {
    parse_mode: "MarkdownV2",
  });
});

bot.on("message", async (ctx) => {
  const message = (ctx.update || ctx).message;
  if (!message.text) return;

  try {
    const { data } = await ChatBot(message.text);
    const response = data.result || data.data.answer;
    await ctx.reply(response, {
      reply_parameters: {
        message_id: message.message_id,
      },
    });
    // logging
    console.log(
      `${chalk.gray(time)} ${chalk.bold(
        chalk.italic(message.from.first_name + (message.from.last_name || ""))
      )} (${chalk.blueBright(message.chat.type)})${
        message.text && ": " + message.text
      }`
    );
  } catch (error) {
    console.log(error);
    return await ctx.reply("error", {
      reply_parameters: {
        message_id: message.message_id,
      },
    });
  }
});

bot.launch(async () => {
  const { username } = await bot.telegram.getMe();
  console.log(`${chalk.gray(time)} logged in as ${chalk.blueBright(username)}`);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
