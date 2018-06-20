const botconfig = require("./botconfig.json");
const color = require("./color.json");
const Discord = require("discord.js");
const coins = require("./coins.js");
const ytdl = require('ytdl-core');




const bot = new Discord.Client({disableEveryone: true});

const swearWords = ["fuck", "שיט", "קקי", "חרא", "זבל", "פאק", "אמא", "זין", "קוקסינל", "הומו", "https://discord.gg/", "shit", "זונה", "חרא"];

bot.on("ready", async () => {
  console.log(`Bot is On!`);
bot.user.setActivity(`UnDeadCraft | /networkhelp`, {type: "PLAYING"});
});





// Updates the bot's status if he joins a server
bot.on("guildCreate", guild => {
bot.user.setActivity(`UnDeadCraft | /networkhelp`, {type: "PLAYING"});
});

/// Updates the bot's status if he leaves a servers
bot.on("guildDelete", guild => {
bot.user.setActivity(`UnDeadCraft | /networkhelp`, {type: "PLAYING"});
});

//welcome join
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', '👋welcome👋');
  if (!channel) return;
  channel.send(`Welcome to the server ${server}, ${member}`);

  
//add a role when joins

var role = member.guild.roles.find('name', 'member');
member.addRole(role)
});


//welcome left
bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', '👋welcome👋');
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

    //!kick @user break the rules
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("/networkkick [user] [reason]");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#d83c3c")
    .addField("User", `${kUser}`)
    .addField("Staff", `<@${message.author.id}>`)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Can't find channel called `logs`");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }


  if(cmd === `${prefix}needhelp`){
    message.delete();
     message.reply(`@${message.author.username} need help staff please help him.`)

  }

  if(cmd === `${prefix}ip`){
     message.reply("IP - UnDeadCraft.serv.gs")

  }


if( swearWords.some(word => message.content.includes(word)) ) {
     message.delete();
  message.reply("Swearing is not Allowed here");
  //Or just do message.delete();
}
   if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("/networkban [user] [reason]");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("**User**", `${bUser}`)
    .addField("**Staff**", `<@${message.author.id}>`)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return message.channel.send("Can't find channel called `logs`");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

    return;
  }

if(cmd === `${prefix}money`){
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let uCoins = coins[message.author.id].coins;


  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#00FF00")
  .addField("💸", uCoins);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});

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
  

  

  if(cmd === `${prefix}mute`){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
  if(args[0] == "help"){
    message.reply("Usage: /networkmute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please supply a reason.");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`You've been muted for ${mutetime}. Sorry!`)
  }catch(e){
    message.channel.send(`A user has been muted! for this time! ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`The User Mute by ${message.author}`)
  .setColor("0000FF")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Mute Time", mutetime)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "logs");
  if(!incidentschannel) return message.reply("Please create a incidents channel first!");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
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

  if (cmd === `${prefix}poll`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
 		message.delete()
  let question = args.slice(0).join(" ");

  if (args.length === 0)
  return message.reply('Invalid Format: /networkpoll <Question>')

  const embed = new Discord.RichEmbed()
  .setTitle("A Poll Has Been Started!")
  .setColor("#5599ff")
    .setDescription(`${question}`)
    .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)
  const pollTopic = await message.channel.send({embed});
  await pollTopic.react(`ג…`);
  await pollTopic.react(`ג`);
  const filter = (reaction) => reaction.emoji.name === 'ג…';
  const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
  collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
  collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}

    if(cmd === `${prefix}clear`){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You dont have the Permission `MANAGE_MESSAGES`");
  if(!args[0]) return message.channel.send("/networkclear [amount of messages]");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:white_check_mark: Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}
  
  
  if (cmd === `${prefix}creator`){
    let botembed = new Discord.RichEmbed()
    .setDescription("Creators of the Bot")
    .setColor("#ff9f04")
    .addField("\nCreators","<@354952398772371458>")

    return message.channel.send(botembed);
}

  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Help Commands")
    .setColor("#268ccf")
    .setThumbnail(bicon)
    .addField("Moderation Commands","/networkkick (user) (reason) - Kick a User.\n/networkgiverole - give to someone role.\n/networkremoverole - remove someone role.\n/networkclear - clear the chat\n/networkmute (user) (time) (reason) - mute member.\n/networkban (user) (reason) - Ban a User.\n/networkreport (user) (reason) - report about User.\n/networkwarns (user) (how much time was warned) - Warn a User.")
   .addField("Server Commands","/networkserverinfo - Server Informations.\n/networkbotinfo - the bot info\n/networkpoll (question) - Poll about Question\n/networkping - Ping Pong")
   .addField("Creators","/networkcreator - Bot Creators")
   .addField("Economy ","/networkmoney - show your money.")
   .addField("Levels",("Soon."));
    return message.author.send(botembed);
  }


    if(cmd === `${prefix}giverole`){
        //!addrole @andrew Dog Person
  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply("Usage: /networkgiverole <user> <role>");
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}
if(cmd === `${prefix}removerole`){
if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
if(args[0] == "help"){
  message.reply("Usage: /networkremoverole <user> <role>");
  return;
}
let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!rMember) return message.reply("Couldn't find that user, yo.");
let role = args.join(" ").slice(22);
if(!role) return message.reply("Specify a role!");
let gRole = message.guild.roles.find(`name`, role);
if(!gRole) return message.reply("Couldn't find that role.");

if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
await(rMember.removeRole(gRole.id));

try{
  await rMember.send(`RIP, you lost the ${gRole.name} role.`)
}catch(e){
  message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
}
}

if(cmd === `${prefix}bc`){
if( message.author.id === "354952398772371458") {
  let ideamessage = args.slice(0).join(" "); 

  message.guild.members.forEach(m => {
               var bc = new Discord.RichEmbed()
               .addField('● Sender :', ` → ***${message.author.tag}***`)
               .addField("● Server :", ` → ***${message.guild.name}***`)
               .addBlankField(true)
               .addField("● Message :", ideamessage)
               .setColor('#ff0000')
               // m.send(`[${m}]`);
               m.send(``,{embed: bc});
               message.delete();
           });
} else {
  message.reply(":X_: You dont have permission from administrator bot :X_:");
}
}

if(cmd === `${prefix}prefix`){
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No no no.");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: /networkprefix <desired prefix here>");
  
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };
  
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });
  
  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Prefix Set!")
  .setDescription(`Set to ${args[0]}`);
  
  message.channel.send(sEmbed);
  
  }

  if(cmd === `${prefix}warns`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("🔥You can't do that.🔥");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("🔥Couldn't find them yo🔥");
    let warnlevel = warns[wUser.id].warns;
    
    message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);
    
    }

  })

bot.on('message', msg => {
  if (msg.content === '/network ping') {
msg.reply(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms!  :ping_pong:`)
  }
  });
bot.on('message', msg => {
  if (msg.content === '/networkhelp') {
    msg.reply(`🔥Check Your DM!🔥`)
  }
});
bot.on('message', msg => {
  if (msg.content === '/networkavatar') {
    msg.reply(`🔥You need Mention someone🔥`)
  }
});

bot.login(process.env.BOT_TOKEN);
