const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

const swearWords = ["darn", "shucks", "frak", "shite", "arse", "ass", "asshole", "bastard", "bitch", "bollocks", "child-fucker", "Christ on a bike", "Christ on a cracker", "crap", "cunt", "damn", "frigger", "fuck", "goddamn", "godsdamn", "hell", "holy shit", "Jesus", "Jesus Christ", "Jesus H. Christ", "Jesus Harold Christ", "Jesus wept", "Jesus", "Mary and Joseph", "Judas Priest", "motherfucker", "nigga", "nigger", "shit", "shit ass", "shitass", "son of a bitch", "son of a motherless goat", "son of a whore", "sweet Jesus", "twat", "Can i suck your boobs", "Carpet muncher", "Choking your chicken", "Cock eyed Cunt.", "Cock muncher", "Cocklump", "Colder than a witches titty in a brass bra", "Creampie", "Cretinous cunting fuckhead", "Cum", "Cum Dumpster", "Cum on your face", "Cuntface", "can i fuck you from behind", "chimney sweeper", "chutney ferret", "cockeye", "coral stomper", "crotte", "cum dumpster", "cuntlapper", "cus", "Ai sat (directed at a man)", "Ain't", "Arrogant, Gum-chewing fat cunt", "As much use as a chocolate teapot", "a-hole", "arse bandit", "arvind kejriwal", "ask me bollix"];

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
    if(!kUser) return message.channel.send("/kick (@user) (time) (reason)\n** **\n**Example:**\n** **\n/kick <@!440182142207655947> break the rules\n** **\nits will kick the user for brekaing the rules");
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



if( swearWords.some(word => message.content.includes(word)) ) {
     message.delete();
  message.reply("Oh no you said a bad word!!!");
  // Or just do message.delete();
}


  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("/ban (@user) (time) (reason)\n** **\n**Example:**\n** **\n/ban <@!440182142207655947> break the rules\n** **\nits will ban the user for one hour for brekaing the rules");
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
    if(!rUser) return message.channel.send("/report (@user) (reason)\n** **\n**Example:**\n** **\n/report <@!440182142207655947> break the rules\n** **\nits will report the user for brekaing the rules");
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




    if(cmd === `${prefix}purge`) {
        let messagecount = parseInt(args[1]) || 1;

        var deletedMessages = -1;

        message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
            messages.forEach(m => {
                if (m.author.id == bot.user.id) {
                    m.delete().catch(console.error);
                    deletedMessages++;
                }
            });
        }).then(() => {
                if (deletedMessages === -1) deletedMessages = 0;
                message.channel.send(`:white_check_mark: Purged \`${deletedMessages}\` messages.`)
                    .then(m => m.delete(2000));
        }).catch(console.error);
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




    if (cmd === `${prefix}mute`) { // creates the command mute
        if (!message.member.roles.some(r=>["Moderator"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!") // if memebr is an admin
        var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") // if no reason
        mutedmember.addRole(muted) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${mutedmember.user} has been muted by ${message.author} because: ${mutereason}`); // sends a message saying he was kicked
    }

    if (cmd === `${prefix}mute`) { // creates the command unmute
        if (!message.member.roles.some(r=>["Moderation"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        unmutedmember.removeRole(muted) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
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




  if (cmd === `${prefix}esay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(0x4d433e)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}




  if (cmd === `${prefix}embedsay`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(0x4d433e)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}




  if (cmd === `${prefix}embed`){
 		message.delete()
         const embed = new Discord.RichEmbed()
 		.setColor(0x4d433e)
 		.setDescription(args.join(" "));
 		message.channel.send({embed})
}




  if (cmd === `${prefix}poll`){
  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('Invalid Format: /Poll <Question>')

  const embed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor("#5599ff")
    .setDescription(`${question}`)
    .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)
  message.channel.send({embed})
  message.react('👍')
  .then(() => message.react('👎'))
  .then(() => message.react('🤷‍♂️'))
  .catch(() => console.error('Emoji failed to react.'));

}





  if (cmd === `${prefix}say`){
 		message.delete()
 		message.channel.send(args.join(" "));
}




  if (cmd === `${prefix}clear`){
 		message.delete()
 		message.channel.send("Cleard" + args.join(" "));
}





  //if(cmd === `${prefix}clear`) {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    //const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    //if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      //return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    //const fetched = await message.channel.fetchMessages({count: deleteCount});
    //message.channel.bulkDelete(fetched)
      //.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  //}




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

exports.run = (client, message, args) => {
if(message.author.id !== botconfig.ownerID) return;
if(message.content.startsWith(prefix + "prefix")) {
    // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    // change the configuration in memory
    botconfig.prefix = newPrefix;
    message.channel.send(`Prefix has been updated to ${newPrefix}`).catch(console.error);
  
    // Now we have to save the file.
    fs.writeFile("./botconfig.json", JSON.stringify(botconfig), (err) => console.error);
  }
}

if(message.content.startsWith(prefix + "avatar ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = user.tag /*Nickname and Discriminator*/ +
           "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
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

bot.on('message', message => {
    if(message.author.bot) return;
    var re =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.exec(message.cleanContent);
    if(re != null){
        message.delete().then(message => {
            message.reply('Links is not allowed here!');
        });
    }
});

bot.login(process.env.BOT_TOKEN);
