const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config();

// Replace 'YOUR_API_TOKEN' with your actual API token
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Handle '/start' command
bot.onText(/\/start/, (msg) => {
    try {
        const chatId = msg.chat.id;
        const userName = msg.from.first_name || "there";
        console.log(chatId, msg.from.username);

        const appUrl = `https://bluemoon-mini-app.vercel.app?userId=${chatId}&userName=${encodeURIComponent(userName)}`;

        const welcomeMessage = `Hello, ${userName}! This is Bluemoon 👋\n\nTap on the DOT and earn your coins.\nA little bit later you will be very surprised.\n\nGot friends? Invite them to the game. That’s the way you’ll both earn even more coins together.\n\nThat’s all you need to know to get started.`;

        const opts = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🕹 Let\'s go', web_app: { url: appUrl } }
                    ],
                    [
                        { text: '🤙 Bluemoon Community', url: 'https://t.me/BluemoonMetaverse' }
                    ],
                    [
                        { text: '🎓 How to play', url: 'https://telegra.ph/Moon-Coin-05-27' }
                    ]
                ]
            }
        };
        bot.sendMessage(chatId, welcomeMessage, opts);
    } catch (error) {
        console.log("Error occured: ", error);
    }
});