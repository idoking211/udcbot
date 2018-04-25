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

client.on("message", (message) => {

  if (!message.content.startsWith(prefix)) return;

  if (message.content === (prefix + "discord")) {
    message.channel.send({embed: {
      color: 3447003,
      title: "\n \n__:קישור לדיסקורד__",
      description: "** **\nhttps://discord.gg/sdQDrYT",
      footer: 
      {
          icon_url: client.user.avatarURL,
          text: "Banana"
      }
    }});
  } else
  if (message.content === (prefix + "أنا ابن العاهرة")) {
    message.channel.send({embed: {
      color: 0xffff00,
      title: "\n \n**                                                                              __:חוקים__**",
      description: "** **\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n:one: (לא :x: לקלל :scream:  גם בשיחות :telephone_receiver:  וגם בצאטים :speech_left:  (גם אם זה במשחק שמישהו שאיתך\n:joy:  בשיחה הורג אותך בצחוק\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n:two:  לא :x: להספים!\nשאני אומרת ספאם אני מתכוונת\n:rage:  דגשלכדיחלחכחדלכחדלח\nוגם\n:rage:  מילה אחרי מילה אחרי מילה בלי משמעות....\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n:three:  לא :x:  לפרסם שרתי דיסקורד או דברים אחרים בלי אישור \n ( סרטונים :camera:  זה רק ליוטיוברים עם 200+ סאבים)\n:white_check_mark:  אני יגיד בקרוב איך אפשר להשיג אישור\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n:four: לא :x: לשאול דברים אישיים על אחרים\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n:five: לכתוב כל דבר במקום המתאים\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
      footer: 
      {
          icon_url: client.user.avatarURL,
          text: "Banana"
      }
    }});
  } else
    if (message.content == (prefix + "invite")) {
    message.author.sendMessage("**__Invite The Bot:__**\n \nhttps://discordapp.com/api/oauth2/authorize?client_id=436126804365803520&permissions=0&scope=bot");
    message.reply("Please check your direct messages :mailbox_with_no_mail:");
  } else
  if (message.content === (prefix + "staff")) {
    message.channel.send({embed: {
      color: 3447003,
      title: "\n \n__:צוות השרת שלנו__",
      description: "** **\n<@&436035474075680768> - <@!378455858100699136> , <@!436161342395908100> , <@311604263379795970> , <@343052053482045450>\n<@&436008360635269120> - <@404663294687838218>\n<@&436008418290171905> - \n<@&436008493900759041> - <@!302904462123466752>\n<@&436008494118731797> - <@331837257004744704>\n<@&436008754794725387> - <@347135990499901442>",
      footer:
      {
          icon_url: client.user.avatarURL,
          text: "Banana"
      }
    }});
  } else
  if (message.content === (prefix + "roles")) {
    message.channel.send({embed: {
      color: 3447003,
      title: "\n \n__:הרולים של בננה סרבר__",
      description: "** **\n**Main Owner**\n**Owner**\n**Co-Owner**\n**ADMIN**\n**MOD**\n**Friend**\n**HELPER**\n**Staff**\n**Bot**\n**Muted**\n**Support Team**",
      footer: 
      {
          icon_url: client.user.avatarURL,
          text: "Banana"
      }
    }});
 } else
 if (message.content === (prefix + "membercount")) {
    message.channel.send({embed: {
      color: 0xffff00,
      title: "__Server Members Count:__\n \n",
      description: "** **",
      fields: [{
             name: "Members",
             value: (message.guild.memberCount)
           }
         ],
         timestamp: new Date(),
         footer: {
           icon_url: client.user.avatarURL,
           text: "Banana"
       }
     }});
 } else
 if(message.content.startsWith(prefix + "avatar ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = user.tag /*Nickname and Discriminator*/ +
           "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
    }
 } else
 if(message.content.startsWith(prefix + "userinfo ")) { //IF for the command.
     if(message.mentions.users.first()) { //Check if the message has a mention in it.
           let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
           let output = "UserInfo: \n** **\nUsername: " + (user.username) + "#" + (user.discriminator) + "\n** **" + "\nUserID: " + (user.id) + "\n** **" +  "\nLastMessage: " + "**" + (user.lastMessage)+ "**" + "\n** **" +  "\nI am Bot? : " + (user.bot);
           message.channel.sendMessage(output); //We send the output in the current channel.
    } else {
          message.reply("Invalid user."); //Reply with a mention saying "Invalid user."
    }
 } else
 if (message.content === (prefix + "serverinfo")) {
    message.channel.send({embed: {
      color: 0xffff00,
      title: "__Server Information:__\n \n",
      description: "** **",
      fields: [{
             name: "Server Name",
             value: (message.guild.name)
           },
           {
            name: "Created On",
            value: (message.guild.createdAt)
           },
           {
            name: "Joined At",
            value: (message.member.joinedAt)
           },
           {
            name: "Members",
            value: (message.guild.memberCount)
           }
         ],
         timestamp: new Date(),
         footer: {
           icon_url: client.user.avatarURL,
           text: "Banana"
       }
     }});
   }
 });

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
