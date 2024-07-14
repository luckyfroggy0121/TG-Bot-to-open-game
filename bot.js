const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config();

// Replace 'YOUR_API_TOKEN' with your actual API token
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });
console.log("==========Bot for Feedback===========")

// Handle '/start' command
bot.onText(/\/start/, (msg) => {
    try {
        const chatId = msg.chat.id;
        const userName = msg.from.first_name || "there";
        console.log(chatId, msg.from.username);

        const appUrl = `https://telegram-tapping-game.vercel.app/?userId=${chatId}&userName=${encodeURIComponent(userName)}`;
        console.log(appUrl);
        // const appUrl = `https://telegram-tapping-game-git-scroll-fix-john-garcias-projects.vercel.app/?userId=${chatId}&userName=${encodeURIComponent(userName)}`;
        
        const welcomeMessage = `Hello, *${userName}*! This is SmartLitre 💧\n*Our Goal*: To Revolutionise Hydration 🚀 \nYou've heard about Sweatcoin and Stepn. \nEnough about the steps! 👣\nBring on the water! 💧\nTap to hydrate sea creatures and earn DROPS.\nInvite your friends, unlock new levels, \nearn more DROPS, and become the \nultimate Hydration Hero! 💧`;

        const opts = {
            parse_mode: 'Markdown',  // Enable Markdown parsing mode
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: ' Let\'s hydrate💧', web_app: { url: appUrl } }
                    ],
                    [
                        { text: ' SmartLitre Community', url: 'https://t.me/smartlitrecommunity' }
                    ],
                    // [
                    //     { text: ' How to earn', url: 'https://telegra.ph/dscghadchkbxkzb-07-06' }
                    // ]
                ]
            }
        };
        bot.sendMessage(chatId, welcomeMessage, opts);
    } catch (error) {
        console.log("Error occured: ", error);
    }
});