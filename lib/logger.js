import chalk from "chalk";

/**
 * @param {import("telegraf").Context} ctx
 */
export function printer(ctx) {
  /** @type {import("telegraf/types").Message} */
  const message = (ctx.update || ctx).message;
  const time = new Date().toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  const name = message.from.first_name + (" " + message.from.last_name || "");
  return console.log(
    `${chalk.gray(time)} ${chalk.italic(chalk.bold(name))} (${chalk.blueBright(
      message.chat.type || "null"
    )})${message.text && ": " + message.text}`
  );
}
