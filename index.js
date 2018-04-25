const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();

const bot = new Discord.Client({disableEveryone: true});

client.on("ready", async () => {
  console.log(`Bot is Online!`);
client.user.setActivity(`${client.guilds.size} servers | /help`, {type: "WATCHING"});
});

// Updates the bot's status if he joins a server
client.on("guildCreate", guild => {
client.user.setActivity(`${client.guilds.size} servers | /help`, {type: "WATCHING"});
});

/// Updates the bot's status if he leaves a servers
client.on("guildDelete", guild => {
client.user.setActivity(
        `${client.guilds.size} servers | /help`, {type: "WATCHING"});
});

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("**Commands List**")
    .setColor("#268ccf")
    .setThumbnail(bicon)
    .addField("/kick (user) (reason)", "kick a User.")
    .addField("/ban (user) (reason)", "ban a User.")
    .addField("/report (user) (reason)", "report about User.")
    .addField("/serverinfo", "Server Informations.")
    .addField("/botinfo", "Bot Informations.")
    .addField("/membercount", "Member Count.")
    .addField("/say (message)", "say anything on embed message")
    .addField("/help", "Help Commands.");

    return message.author.send(botembed);
  }
});

client.on('message', msg => {
  if (msg.content === '/ping') {
    msg.reply(`Pong! The ping is **${(client.ping).toFixed(0)}**ms!  :ping_pong:`)
  }
});

client.on('message', msg => {
  if (msg.content === '/avatar') {
    msg.reply("You need to Mention User")
  }
});

client.on('message', msg => {
  if (msg.content === '/userinfo') {
    msg.reply("You need to Mention User")
  }
});

client.on('message', message => {
  if (message.content === 'test') {
    message.reply("`/help` אני מחוברת, כדאי להתחיל תרשום");
  }
});

client.login(process.env.BOT_TOKEN);
