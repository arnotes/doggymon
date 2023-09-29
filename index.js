// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const pepTalkGreetings = [
    "Hello, {{sender}}. Tayo na at magsagawa ng misyon!",
    "{{sender}}, handa ka na ba? Tara na at mag-aventura!",
    "Hala, {{sender}}. Laban tayo sa kakaibang mundo!",
    "Hey, {{sender}}. Tara, sa ating tagumpay!",
    "Kamusta, {{sender}}? Tara na, andito ang pagkakataon!",
    "{{sender}}, handang-handa ka na ba? Tara, akyat sa bundok!",
    "Hello, {{sender}}. Sa ating paglalakbay, tagumpay ang layunin!",
    "{{sender}}, tayo'y isang hakbang na lang sa kaganapan. Laban!",
    "Hoy, {{sender}}! Ang iyong kaharian ay naghintay para sa iyo!",
    "Hello, {{sender}}. Sa ating pag-alsa, magtatagumpay tayo!"
];

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent
    ]
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    listenToMessages();
});

// Log in to Discord with your client's token
client.login(token);

function listenToMessages() {
    console.log('listening to messages!');
    client.on('messageCreate', async (message) => {
        console.log(client.user);
        console.log('-----------------------');
        console.log(message);

        if (message.author.bot) {
            return;
        }

        //----------basic greeting---------------
        const greetingsMap = new Map();
        const sender = message.author;
        const lastGreeted = greetingsMap.get(sender.id);
        const now = new Date();
        if (!lastGreeted || ((now - lastGreeted) / 1000 * 60 * 60) > 12) {
            greetingsMap.set(sender.id, now);
            const randomNumber = Math.floor(Math.random() * 10);
            const greeting = pepTalkGreetings[randomNumber].replace('{{sender}}', sender.toString());
            await message.reply(greeting);
            return;
        }
        //----------basic greeting---------------

        const content = message.content.toLowerCase();
        if (content.includes('test')) {
            await message.react('🧪');
            await message.reply('mama mo test');
        }
        else if (content.includes('mama mo')) {
            await message.reply('tatay mo transgender');
        }
        else if (content.includes('server') && content.includes('up')) {
            await message.reply('ilong mo naka up');
        }
        else if (content.match(/\bwet\b/) && (content.match(/\bi\b/) || content.match(/\bako\b/) || content.match(/\bim\b/) || content.match(/\bi'm\b/))) {
            await message.reply('baka nana lang yan. ipatingin mo sa doctor');
        }
        else if (content.match(/mo.nin.*/) || content.includes('umaga')) {
            await message.reply('magandang umaga din sayo BleuMooner!');
        }
        else if (content.includes('night') || content.includes('evening') || content.includes('gabi')) {
            await message.reply('magandang gabi din sayo BleuMooner!');
        }
        else if (content.match(/.*tang.*na.*mo/)) {
            message.reply('tatay mo shokoy!');
        }
        else if (content.includes('brb')) {
            message.reply('wag na bumalik wala ka ambag');
        }
        else if (content.includes('tulog') || content.includes('sleep')) {
            message.reply('wag ka na gumising');
        }
        else if (content.includes('doggymon') || message?.mentions?.users?.has(client.user.id)) {
            message.reply('di tayo close');
        }
    })
}
