// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

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
        console.log(message);

        if (message.author.bot) {
            return;
        }

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
        else if (content.includes('wet') && (content.includes('i') || content.includes('ako') || content.includes('im') || content.includes('i\'m'))) {
            await message.reply('baka nana lang yan. ipatingin mo sa doctor');
        }
        else if (content.match(/mo.nin.*/) || content.includes('umaga')) {
            await message.reply('magandang umaga din sayo BleuMooner!');
        }
        else if (content.includes('night') || content.includes('evening') || content.includes('gabi')) {
            await message.reply('magandang gabi din sayo BleuMooner!');
        }
        else if (content.includes('doggymon')) {
            message.reply('hello po sayo BlueMooner!');
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
    })
}
