import "dotenv/config";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

export default bot;
export { message };
