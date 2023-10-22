const { program } = require('commander');
const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const chatId = process.env.BOT_CHAT_ID;

if (!token || !chatId) {
  console.error('BOT_TOKEN and/or CHAT_ID is not set in info.env file.');
  process.exit(1);
}


const bot = new TelegramApi(token, {polling:true})

program
  .command('m <message>')
  .description('Send a text message to the Telegram chat.')
  .action(async (message) => {
      await bot.sendMessage(chatId, message);
      process.exit(0)
  });


program
  .command('p <path>')
  .description('Send a photo to the Telegram chat.')
  .action(async (photo) => {
		await bot.sendPhoto(chatId, photo);
		process.exit(0);
	});


program.helpOption('-h, --help', 'Display help for the available commands and options.');

program.parse(process.argv);