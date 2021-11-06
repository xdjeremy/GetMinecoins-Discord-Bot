console.clear();

require('dotenv').config();
const discord = require('discord.js');
const p = require('phin')

const intents = new discord.Intents(32767);

const client = new discord.Client({
    intents
});

// on bot start
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('messageCreate', msg => {
    // ignore messesage if it is from bot
    if (msg.author.bot) return;

    // ignore messages that don't start with the prefix
    if (msg.content.indexOf(process.env.PREFIX) !== 0) {
        msg.delete();
    };

    // get the command and the args
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // get the command
    if (command === 'download') {
        async function getDownloadLink() {
            const res = await p({
                url: 'https://getminecoins.com/generate_download.php?key=' + process.env.API_KEY,
                parse: 'json',
            });
            if (res.body) {
                msg.reply(res.body.url);
            }
        }
        getDownloadLink();
    };

    if (command === 'done') {
        msg.author.send('https://drive.protonmail.com/urls/WX34HX1NFR#WVHmqvJtfL1u');
    }

    if (command === 'download' && command === 'done') {
        msg.delete();
    }
});

client.login(process.env.TOKEN);