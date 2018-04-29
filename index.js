const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

//bot.on("ready", async () => {
  //console.log(`${bot.user.username} is online!`);

  //bot.user.setActivity("bots", {type: "MAKING"});

  //bot.user.setGame("${server} Servers | /help");

bot.on("ready", async () => {
  console.log(`Bot is Online!`);
bot.user.setActivity(`${bot.guilds.size} servers | /help`, {type: "WATCHING"});
});

// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`${bot.guilds.size} servers | /help`, {type: "WATCHING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(
        `${bot.guilds.size} servers | /help`, {type: "WATCHING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

//welcome left
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`${member}, left the Server`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("EROR");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#d83c3c")
    .addField("Kicked", `${kUser}`)
    .addField("Moderator", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
    if(!kickChannel) return message.channel.send("Can't find mod-log channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }


  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("/ban (@user) (time) (reason)\n** **\n**Example:**\n** **\n/ban @user 1 h break the rules\n** **\nits will ban the user for one hour for brekaing the rules");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("**Banned**", `${bUser}`)
    .addField("**Moderator**", `<@${message.author.id}>`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "mod-log");
    if(!incidentchannel) return message.channel.send("Can't find mod-log channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("/report (@user) (reason)\n** **\n**Example:**\n** **\n/report @user break the rules\n** **\nits will report the user for brekaing the rules");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffdc00")
    .addField("Reported", `${rUser}`)
    .addField("Moderator", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "mod-log");
    if(!reportschannel) return message.channel.send("Couldn't find mod-log channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }




  if(cmd === `${prefix}membercount`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("**Member Count**")
    .setColor("#eb8f1b")
    .setThumbnail(sicon)
    .addField("Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }




  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }




  if (cmd === `${prefix}say`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(0x4d433e)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}
  if (cmd === `${prefix}mute `){
    if (!message.guild.member(message.author).hasPermission('MUTE_MEMBERS')) {
        message.channel.send(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`');
        return;
    }

    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) {
        return message.reply(':lock: **I** need `MANAGE_ROLES` Permissions to execute `mute`').catch(e => logger.error(e));
    }
    let reason = message.content.split(' ').slice(3).join(' ');
    let time = message.content.split(' ')[2];
    let guild = message.guild;
  // Let adminRole = guild.roles.find("name", "TOA");
    let member = message.guild.member;
    let modlog = message.guild.channels.find('name', 'mod-log');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
    if (!modlog) {
        return message.reply('I need a text channel named `mod-log` to print my ban/kick logs in, please create one');
    }

    if (!muteRole) {
        return message.reply('`Please create a role called "muted"`');
    }

    if (message.mentions.users.size < 1) {
        return message.reply('You need to mention someone to Mute him!.');
    }
    if (message.author.id === user.id) {
        return message.reply('You cant punish yourself :wink:');
    }
    if (!time) {
        return message.reply('specify the time for the mute!**Usage:**`/mute [@mention] [1m] [example]`');
    }
    if (!time.match(/[1-60][s,m,h,d,w]/g)) {
        return message.reply('I need a valid time ! look at the Usage! right here: **Usage:**`/mute [@mention] [1m] [example]`');
    }
    if (!reason) {
        return message.reply('You must give me a reason for Mute **Usage:**`/mute [@mention] [15m] [example]`');
    }
    if (reason.time < 1) {
        return message.reply('TIME?').then(message => message.delete(2000));
    }
    if (reason.length < 1) {
        return message.reply('You must give me a reason for Mute');
    }
    message.guild.member(user).addRole(muteRole).catch(e => logger.error(e));

    setTimeout(() => {
        message.guild.member(user).removeRole(muteRole).catch(e => logger.error(e));
    }, ms(time));
    message.guild.channels.filter(textchannel => textchannel.type === 'text').forEach(cnl => {
        cnl.overwritePermissions(muteRole, {
            SEND_MESSAGES: false
        });
    });

    const embed = new Discord.RichEmbed()
.setColor(16745560)
.setTimestamp()
.addField('Mute', `**Muted:**${user.username}#${user.discriminator}\n**Moderator:** ${message.author.username}\n**Duration:** ${ms(ms(time), {long: true})}\n**Reason:** ${reason}`);
    modlog.send({embed})
  .catch(e => logger.error(e));

    knexDB.from('bans').where('guildid', message.guild.id).andWhere('userid', user.id).then(count => {
        if (count.length > 0) {
            knexDB.update({
                mutecount: parseInt(count[0].mutecount, 10) + 1
            }).into('bans').where('guildid', message.guild.id).andWhere('userid', user.id).then(() => {

            })
            .catch(e => logger.error(e));
        } else {
            knexDB.insert({
                userid: user.id,
                guildid: message.guild.id,
                mutecount: 1
            }).into('bans').where('guildid', message.guild.id).andWhere('userid', user.id).then(() => {

            })
              .catch(e => logger.error(e));
        }
    });
};
module.exports.help = {
    name: 'mute'
}




  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Help Commands")
    .setColor("#268ccf")
    .setThumbnail(bicon)
    .addField("/kick (user) (reason)", "kick a User.")
    .addField("/ban (user) (reason)", "ban a User.")
    .addField("/report (user) (reason)", "report about User.")
    .addField("/serverinfo", "Server Informations.")
    .addField("/botinfo", "Bot Informations.")
    .addField("/membercount", "Member Count.")
    .addField("/say (message)", "say your message.")
    .addField("/avatar @user", "Avatar of the user.")
    .addField("/ping", "Ping Pong, your Wifi");

    return message.author.send(botembed);
  }
});

const prefix = botconfig.prefix;
bot.on("message", (message) => {

  if(!message.content.startsWith(prefix)) return;

if(message.content.startsWith(prefix + "avatar ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = user.tag /*Nickname and Discriminator*/ +
           "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
  } else
  if (message.content === (prefix + "kick")) {
    message.channel.send({embed: {
      color: 3447003,
      title: "\n \n__Kick",
      description: "** **\n/kick (@user) (reason)\n** **\n**Example:**\n** **\n/kick @user break the rules\n** **\nits will kick the user for brekaing the rules",
      footer: 
      {
          icon_url: client.user.avatarURL,
          text: "Banana"
      }
    }});
    }
  }});

bot.on('message', msg => {
  if (msg.content === '/ping') {
    msg.reply(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms!  :ping_pong:`)
  }
});

bot.on('message', msg => {
  if (msg.content === '/help') {
    msg.reply(`Check your dms`)
  }
});

bot.on('message', msg => {
  if (msg.content === '/avatar') {
    msg.reply(`You need Mention someone`)
  }
});

bot.login(process.env.BOT_TOKEN);
