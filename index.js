const express = require('express');
const Discord = require('discord.js');
//Discord.Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
const client = new Discord.Client();
const app = express();
const token = process.env['token']
var upvotes;
var downvotes;
const guildInvites = new Map();
const moment = require("moment");
const fs = require("fs");
const { MessageEmbed, User } = require("discord.js")
//const button = require('discord-buttons')(client);
require("dotenv").config()
require('discord-reply');
const { Database } = require("quickmongo");
let { MessageButton, MessageActionRow } = require('discord-buttons')
const disbut = require('discord-buttons');
const mongo = process.env['MONGO']
const db = new Database(mongo)
const randomstring = require("randomstring");
require('discord-buttons')(client);
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const Page = require('discord-button-pages'); 

//button pages requirement
client.on('clickButton', (button) => {
  Page.buttonInteractions(button, client.interaction);
});

//buttons
let dc = new disbut.MessageButton()
  .setStyle("green")
  .setLabel("Click If You Dare")
  .setEmoji("899526401886130276")
  .setID("ciud");
let invite = new disbut.MessageButton()
    .setStyle("url")
    .setURL("https://discord.com/oauth2/authorize?client_id=899980824475213895&permissions=268823799&scope=bot%20applications.commands")
    .setEmoji(`882936051981778955`)
    .setLabel("Invite Me!");

    
let support = new disbut.MessageButton()
    .setStyle("url")
    .setURL("https://discord.com/users/633724614224379942")
    .setEmoji("882953247629901834")
    .setLabel("Support");

let syntax = new MessageActionRow()
 .addComponents([support, invite]);

let adminro = new MessageActionRow() 
 .addComponents([dc])

/*
//prefix change
const pdb = require("quick.db")
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(prefix + "prefix")){
  const args = message.content.split(" ").splice(1).join(" ");
 let prefix = await pdb.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;

    //react with approve emoji
    message.react("✅");

    if(!args) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`Current Prefix: \`${prefix}\``)
    .setFooter('Please provide a new prefix')
    );
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`🚫 You don\'t have permission for this Command!`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`'❗The prefix can\'t have two spaces'`));

    pdb.set(`prefix_${message.guild.id}`, args)

    message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`✅ Successfully set new prefix to **\`${args}\`**`))
 }
})*/

const brave = new disbut.MessageButton()
 .setEmoji("899526401886130276")
 .setID("nope")
 .setStyle("gray")
 .setLabel("Click To be 50% brave...");

const e = new disbut.MessageButton()
 .setEmoji("899526401886130276")
 .setID("nlol")
 .setStyle("gray")
 .setLabel("Click To be 100% brave...")
 .setDisabled(true);

client.on("clickButton", async btn => {
  if(btn.id == "ciud"){
  await btn.reply.send("Brave One, The Path To Darkness Opens, Click Once More....", true)
  await btn.message.edit("I See You Are Trying to be brave, click more if you dare...\n you are 40% brave until now", brave)
  } else if (btn.id == "nope"){
    await btn.reply.send("hmm you proved that you are 50% brave, click the button again to prove that you are 100% brave and strong...", true)
    await btn.message.edit('Click Once More If you are brave and strong lol...', e).then(setTimeout(async function() {
   await btn.channel.send("You aren't brave <a:CDR_LolGoodBye:900255125388533770>")
}, 3000))
  }
})
client.setMaxListeners(0)
app.get('/', (req, res) => {
  res.send('Hello Coder Bot!')
});

app.listen(3080, () => {
  console.log(`Bot is Ready`);
});

//source code
const prefix = "=";
//const PREFIX = "=";

/*
let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;
*/

//embed code
client.on('message', message => {
  if (message.content.startsWith(prefix + "embed")) {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (!message.guild) return;
    if (!message.member.hasPermission('EMBED_LINKS')) return message.channel.send("**You Need The `EMBED_LINKS` Permission To Use This Command!**")
    if (!message.member.hasPermission("EMBED_LINKS")) return
    message.channel.startTyping()
    message.delete()
    let args = message.content.split(' ').slice(1).join(' ');
    let embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}), "https://discord.com/users/" + message.author.id)
      .setDescription(`${args}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`😏`)
    message.channel.send(embed)
    message.channel.stopTyping()
  }
});

//apply code
client.on('message', message => {
  if (message.content == (prefix + "c-apply")) {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    message.channel.send(`Applying channels have been created`)
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You don't have **MANAGE_GUILD** Permission`)
    message.guild.channels.create('APPLY', { type: 'category' }).then(cc1 => {
      message.guild.channels.create('For submissions', { type: 'text' }).then(ch1 => {
        ch1.setParent(cc1.id)
        message.guild.channels.create('Acceptance and rack', { type: 'text' }).then(ch2 => {
          ch2.setParent(cc1.id)
        })
      })
    })
   message.channel.stopTyping()
 }
});

//slowmode code
client.on("message", async message => {
  if (message.content.startsWith(prefix + "slowmode")) {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You don't have permission.");
    var time = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if(isNaN(time)){
     return message.channel.send(`Slowmode time must be a number <:CDR_Bruh:898921247126220800>`)
     }
    if(time >= 21601) return message.channel.send("Slowmode can't be more than 6 hours!")
    if (!time)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            `** please enter a time in seconds!**`
          )
      );
    message.channel.setRateLimitPerUser(time);
    message.channel
      .send(`**wait**`)
      .then(m => m.delete({ timeout: 500 }))
      .then(y =>
        y.channel.send(
          new Discord.MessageEmbed()
            .setDescription(`** ✅ set the slowmode **`)
            .setColor("RANDOM")
        )
      );
      message.channel.stopTyping()
  }
});

//server ID code
client.on('message', message => {
  if (message.content == prefix + "serverid") {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    let ServerID = new Discord.MessageEmbed()
      .setTitle(`Server ID is`)
      .setColor("RANDOM")
      .setDescription(`ID => ${message.guild.id}`)
    message.channel.send(ServerID)
  }
    message.channel.stopTyping()
});
//ID code
client.on('message', message => {
  if (message.content == prefix + "id") {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    let IDEmbed = new Discord.MessageEmbed()
      .setTitle(`Your ID is`)
      .setColor("RANDOM")
      .setDescription(`ID => ${message.author.id}`)
    message.channel.send(IDEmbed)
  }
    message.channel.stopTyping()
});
//thanking code
/*
client.on('guildCreate', gc => {
  gc.owner.send(`Thank You For Adding The Bot :smiling_face_with_3_hearts:`);
});

//leave code
client.on('guildDelete', gc => {
  gc.owner.send(`Bye, I will miss you :pensive:`);
});
*/
/*//sugs code
client.on('message', message => {
  if(message.content = `${prefix}sug`) {
  var channel = message.channel.id === "850222190377172992"
  if (!channel) return
  let args = message.content.split(' ').slice("").join(' ');
  if (message.author.bot) return;
  if (message.content.startsWith('')) {
    message.delete()
  
 
    let embed = new Discord.MessageEmbed()
      .setTitle(`new sug by ${message.author.username}`)

      .setDescription(`${args}`)
      .setColor("PURPLE")

      .setThumbnail(`${message.author.avatarURL({ dynamic: true })}`)
      .setTimestamp()
      .setFooter(`Sug By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))



    message.channel.send(embed)

   }


  }
  
});
*/

//rules code
client.on('message', message => {
  if (message.content == prefix + "rules") {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    let embed = new Discord.MessageEmbed()
      .setColor(`GOLD`)
      .setTitle(`Rules a server must have:`)
      .setDescription('`R1`- No insulting <a:CDR_Devil:900001562804506734> \n`R2`- Spam of all kinds is prohibited <a:CDR_Scam:900001725342175267> \n`R3`- No links Or Administration Affairs 🔗 \n`R4`- It is forbidden to beg for anything literally, whether ranks, credits or nitrites <a:CDR_Pls:900001933278969916> \n`R5`- Talking about politics or religions is prohibited <:CDR_PepeSword:900002152871755777> \n`R6`- No bullying any of the members <:CDR_NoBully:900002476177125377> \n`R7`- It is forbidden to disturb in phonological rheum ☎ \n`R8` - it is forbidden to sell literally anything on the server 🛒')
    message.channel.send(embed)
  }
    message.channel.stopTyping()
});

//help code

const helpembed = new Discord.MessageEmbed()
 .setAuthor("My Commands List", "https://cdn.discordapp.com/avatars/899980824475213895/6e8da89f9dd216542ada2a4fd30c2895.webp", "http://coderbot.xyz")
 .addField(`<:CDR_Mod:885148889307557918> mod`, `**${prefix}help mod**`, true)
 .addField(`<a:CDR_Fun:885149327830450198> fun`, `**${prefix}help fun**`, true)
 .addField(`<:CDR_Tickets:885149983706333195> ticket system`, `**${prefix}help tickets**`, true)
 .addField(`<:CDR_Info:885148985759780935> info`,`**${prefix}help info**`, true)
 .addField(`<:CDR_Utility:885149579606110239> utility`, `**${prefix}help utility**`, true)
 .addField(`<:CDR_Others:885149439696703538> misc`, `**${prefix}help misc**`, true)
 .setColor("RANDOM")
 .setFooter(`${prefix}help {command name} for more info`);

const hmod = new Discord.MessageEmbed()
 .setAuthor("Moderation Commands", "https://cdn.discordapp.com/avatars/841583996756688917/1264b64ce4fd030b8808a15559eb553c.png?size=128", "http://coderbot.xyz")
 .addField(`${prefix}slowmode (time in seconds)`, "*Change the slowmode of a channel*")
 .addField(`${prefix}lock (mention channel)`, "*Lock a channel*")
 .addField(`${prefix}kick`, "*Kick someone from the server/guild*")
 .addField(`${prefix}ban`, "*Ban someone from the server*")
 .addField(`${prefix}unban`, "*Unban someone from the server who was previously banned by me*")
 .addField(`${prefix}mute`, "*Mute someone in the server*")
 .addField(`${prefix}purge`, "*Purge messages upto 100*")
 .addField(`${prefix}unlock`, "*Unlock a channel*")
 .addField(`${prefix}nuke`, "*Delete and re-create a channel with the same perms*")
 .setFooter(`${prefix}help {command name} for more info`);

const hfun = new Discord.MessageEmbed()
 .setAuthor("Fun Commands", "https://cdn.discordapp.com/avatars/841583996756688917/1264b64ce4fd030b8808a15559eb553c.png?size=128", "http://coderbot.xyz")
 .addField(`${prefix}pokedex`, "*Get full info of any pokemon!*")
 .addField(`${prefix}deepfry`, "*Deepfry someone!*")
 .addField(`${prefix}say`, "*Make the bot repeat your message*")
 .addField(`${prefix}embed`, "*Make the bot repeat your message in a rich embed!*")

const embedPages = [helpembed, hfun, hfun, hmod]

client.interaction = {};

client.on("message", message => {
 if(message.content.toLowerCase().startsWith(prefix + "helpadmin")){
   if(message.author.id == "633724614224379942" || message.author.id == "825762675681394708"){
     if(message.author.bot || message.channel.type == "dm") return;
      Page.createPages(client.interaction, message, embedPages, 60 * 1000, "green", "902050017949413418", "902049708783050753", "❌");
  } else {
    return message.reply("This is an owner - only cmd!")
  }
 }
})



client.on("message", async (devs) => {
  if (devs.content == (prefix + "help")) {
    
   if(devs.author.bot) return;
   if(devs.channel.type == "dm") {
   return devs.channel.send("DM commands are not supported")}
    if(devs.author.id == "761438136277794817"){
    return devs.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    devs.channel.startTyping()
    const dm = new disbut.MessageButton()
    .setStyle("url")
    .setEmoji("854359536345677835")
    .setLabel("DM")
    .setURL("https://discord.com/channels/@me/900000317423353907")
    devs.channel.send(`Check your DMs <a:CDR_ThumbsUpPop:898921174736711710>`, dm)
    //devs.author.send()
      const first = new Discord.MessageEmbed()
      .setTitle("**Help Commands Menu**")
      .setThumbnail(devs.member.user.avatarURL({ format: "gif", format: "png", dynamic: true, size: 1024 }))
      .setColor("#00FFFF")
      .addField(prefix + `say  <:CDR_Say:900003650515116092>`, "*To make bot repeat your message*", true)
      .addField(prefix + "embed", "*To make bot repeat your message in embed*", true)
      .addField(prefix + "kick", "*To kick someone*", true)
      .addField(prefix + `ban  <a:CDR_Banned:899978845476757534>`, "*To ban someone*", true)
      .addField(prefix + "stats", "*To know Info about Verifying*", true)
      .addField(prefix + "msgstart", "*To start message collector*", true)
      .addField(prefix + "msgstop", "*To stop message collector*", true)
      .addField(prefix + "unban", "*To unban someone*", true)
      .addField(prefix + "mute", "*To mute someone*", true)
      .addField(prefix + "invite", "*To invite the bot to your server*", true)
      .addField(prefix + `support <a:CDR_Staff:867992007199567923>`, "*To get help with the bot*", true)
      .addField(prefix + "tc", "*To Calculate tax on a given amount*", true)
      .addField(prefix + "purge ", "*To delete messages*", true)
      .addField(prefix + "lock", "*To lock channel*", true)
      .addField(prefix + "unlock", "*To unlock channel*", true)
      .addField(prefix + "server", "*To show server info*", true)
      .addField(prefix + "ping", "*To show time taken from bot to reply you*", true)
      .addField(prefix + "id", "*To show your ID*", true)
      .addField(prefix + "server-id", "*To show server ID*", true)
      .addField(prefix + "slowmode", "*To set slow mode to channel (in seconds)*", true)
      .addField(prefix + "rules", "*To show server rules*", true)
      .addField(prefix + "c-role", "*To create new role*", true)
      .addField(prefix + "c-apply", "*To create applying channels*", true)
      .addField(prefix + "invs", "*Tells invites of you or any other member in the server*", true)
     // .addField(prefix + "ghelp", "*To get a list of giveaway commands [`BETA`]*", true)
    let embed = new Discord.MessageEmbed()
    .setColor("#00FFFF")
    .setTitle("**Remaining Help Commands Menu**").setThumbnail(devs.member.user.avatarURL({ format: "gif", format: "png", dynamic: true, size: 1024 }))
    .addField(prefix + `snipe <:CDR_Sniper:900004009371398155>`, "*Snipes a previously deleted message*", true)
    /*.addField(prefix + `lbinvites <:CDR_Invites:867991832615874600>`, "*Gives the leaderboard of invites of the server!*", true)
    .addField(prefix + `vote <:CDR_Voted:867991498698932254>`, "*Help me become popular by upvoting me!*", true)*/
    .addField(prefix + `Uptime <:CDR_Online:900000768785006642>`, "*Get my uptime*", true)
    .addField(prefix + `react <:CDR_Reaction:900004344345288714>`, "*Make me react to a message*", true)
    .addField(prefix + `help linkit :link:`, "*Get the help menu to make me link something*", true)
    .addField(prefix + `help pokedex`, "*Get info of any pokemon!*", true)
    .addField(prefix + `utilities`, "*Get list  of best of my features!*", true)
    .addField(prefix + `userinfo`, "*Get info of a particular user*", true)
    .addField(prefix + `htickets`, "*Get the help command of the coolest ticket system you know!*", true)
    .addField(prefix + `listening`, "*Get full info on what a user is listening to!*", true)
    .addField(prefix + `tictactoe`, "*Play tic-tac-toe with another user with buttons!*", true) 
    .addField(prefix + `nuke`, "*Delete and re-create a channel with the same perms*", true) 
    .addField(prefix + `cemoji {emoji}`, "*Convert an emoji into gif/png format and send link*", true)
    .addField(prefix + `rps`, "*Play rock-paper-scissors with the bot!*", true)
    .addField(prefix + `aki`, "*Play akinator with the bot!*", true)
      devs.author.send(first)
      devs.author.send(embed, syntax)
      devs.channel.stopTyping()
      devs.author.send(`Protip: you can mention yourself for tictactoe to play with your family members!`)
  }
});

//create role code
client.on('message', message => {
  if (message.content.startsWith(prefix + "c-role")) {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You don't have **MANAGE_ROLES** Permission`)
    let args = message.content.split(' ').slice(1).join(' ')
    message.guild.roles.create({
      data: {
        name: `${args}`,
        color: `RANDOM`
      }
    });
    if (args) return message.channel.send(`Role (**${args}**) has been created`)
    if (!message.member.hasPermission('MANAGE_ROLES')) return;
    if (!args) return message.channel.send(`Please write role name...`)
  }
});

//server code

client.on(`message`, message => {
  if (message.content == prefix + "server") {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.guild.members.fetch().then(mss => {
      const text = message.guild.channels.cache.filter(r => r.type === "text").size
      const voice = message.guild.channels.cache.filter(r => r.type === "voice").size
      const chs = message.guild.channels.cache.size
      const avaibles = message.guild.features.map(features => features.toString()).join("\n")

      const roles = message.guild.roles.cache.size

      const online = mss.filter(m =>
        m.presence.status !== 'online'
      ).size

      const idle = mss.filter(m =>
        m.presence.status === 'idle'
      ).size

      const offline = mss.filter(m =>
        m.presence.status === 'offline'
      ).size

      const dnd = mss.filter(m =>
        m.presence.status === 'dnd'
      ).size

      const embed = new Discord.MessageEmbed()
        .setTitle('Server Info')
        .setColor('RANDOM')
        .setTimestamp()
        
        .addFields(
          {
            name: `🆔 Server ID`,
            value: `${message.guild.id}`,
            inline: true

          },
        
          {
            name: `📆 Created On`,
            value: message.guild.createdAt.toLocaleString(),
            inline: true
          },
         
          {
            name: `👑 Owned By`,
            value: `${message.guild.owner}`,
            inline: true

          },
        
        {
          name: `👥 Members (${message.guild.memberCount})`,
          value: `<a:CDR_OnlinePing:902470768150069248> **${online}** Online  \n<a:CDR_Boosts:902471330857902081> **${message.guild.premiumSubscriptionCount}** Boosts `,
          inline: true
        },
        
          {
            name: `💬 Channels (${chs})`,
            value: `**${text}** Text <:CDR_Text:902471665341042738>
 | **${voice}** Voice <:CDR_Voice:902471794823417856>`,
            inline: true
          },
        {
          name: `🌍 Others`,
          value: `**Region:** ${message.guild.region}\n**Verification Level:** ${message.guild.mfaLevel}`,
          inline: true
        },
        
        {
          name: `🔐 Roles:`,
          value: `<:CDR_Roles:902471923844382750> ${roles} `,
          inline: true
        }, 
        {
          name: `<:CDR_Server:902472154912809011> Icon `,
          value: `<:CDR_Redirect:902472290426560513> [Click Here](https://cdn.discordapp.com/icons/`+ message.guild.id + "/" + message.guild.icon + `.png?size=1024)`,
          inline: true

        })
      .setThumbnail(message.guild.iconURL({dynamic: true}))
    
      message.channel.send(embed)
    })

  }
  if (message.content.startsWith(prefix + "say")) {
    const bt = new disbut.MessageButton()
    .setStyle("red")
    .setID("Bt")
    .setDisabled({disabled: true})
    .setLabel(`said by "${message.author.tag}"`);
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (message.author.bot) return;
    if (!message.guild) return;
    message.delete()
    let args = message.content.split(' ').slice(1).join(' ')
    if(args.includes("@everyone")){
      return message.channel.send("`" + args + "`", bt)}
    if (args.includes("@here")){
      return message.channel.send("`" + args + "`", bt)}
    if (!args) return;
    if (!message.member.hasPermission('SEND_MESSAGES')) return message.channel.send("**You Need `SEND_MESSAGES` Permission To Use This Command!**")

    const user = new disbut.MessageButton()
   .setStyle("green")
   .setID("Button")
   //.setDisabled({disabled: true})
   .setLabel(`said by "${message.author.tag}"`);
   client.on("clickButton", async user => {
     if(user.id == "Button"){
       if(user.clicker.id == message.author.id){
         user.reply.send("Alr you forced me to disable the button <:CDR_Bruh:898921247126220800>", true)
         user.message.edit(args, bt)
       } else {
         user.reply.send("This is literally not said by you <:CDR_Bruh:898921247126220800>", true)
       }
     }
   })
    message.channel.send(args, user)
  }

  if (message.content.startsWith(prefix + 'lock')) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`> You Don't have the Permission : **MANAGE_CHANNELS**`);
    let channel = message.mentions.channels.first();
    let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
    if (!channel) return message.channel.send(`**True Use CMD: ${prefix}lock \`<MentionChannel>\`**`)
    if (!channel_find) return message.channel.send(`**:x: | Error, Not Found**`);
    channel_find.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    });
    message.channel.send(`**Channel Has Been Locked ✅**`);
  }
  if (message.content.startsWith(prefix + 'unlock')) {

   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`> You Don't have the Permission : **MANAGE_CHANNELS**`);
    let channel = message.mentions.channels.first();
    let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
    if (!channel) return message.channel.send(`**True Use CMD: ${prefix}unlock \`<MentionChannel>\`**`)
    if (!channel_find) return message.channel.send(`**:x: | Error, Not Found**`);
    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    });
    message.channel.send(`**Channel Has Been Unlocked ✅**`);
  }
  let command = message.content.toLowerCase().split(" ")[0];
  if (command == prefix + "clear", command == prefix + "purge") {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.delete({ timeout: 0 })
    if (!message.channel.guild) return message.reply(`** This Command For Servers Only**`);
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms :x:**`);
    if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms :x:**`);

    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.channel.send(`\`\`\`javascript
i cant delete more than 100 messages 
\`\`\``).then(messages => messages.delete(5000))
    if (!messagecount) messagecount = '100';
    message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(messages => {
      message.channel.send(`\`\`\`js
${messages.size} messages cleared
\`\`\``).then(messages =>
        messages.delete({ timeout: 3000 }));
    })
  }
  if (message.content == prefix + "msgstart") {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**You Need `MANAGE_MESSAGES` Permission To Use This Command!**");
    message.channel.send("Message Collector Starting...").then(() => {
      const filter = user => user.author.id == message.author.id;
      const collector = message.channel.createMessageCollector(filter, { time: 60000 });
      collector.on("collect", collect => {
        if (collect.content == prefix + "msgstop") {
          message.channel.send(`Collecting Messages Stopped`);
          collector.stop();
          return;
        };
        message.channel.send(collect.content);
      });
      collector.on("end", end => {
        message.channel.send(`Collecting Timer Ended`)
      });
    });
  }
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'ban')) {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**You Don't Have `BAN_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have `BAN_MEMBERS` Permission**");
    let reason = message.content.split(" ").splice(1).join(" ");
    const user = message.mentions.users.first();

    if (user) {

      const member = message.guild.member(user);

      if (member) {

        member
          .ban({
            reason: reason || 'IDK',
          })
          .then(() => {

            const embed = new Discord.MessageEmbed()
              .setColor("00e8ff")
              .setTitle(`**✅ ${user.tag} banned from the server! ✈️**`)
            message.channel.send(embed);
          })
          .catch(err => {

            message.reply(`🙄 - I couldn't ban that user. Please check my permissions and role position.`);

            console.error(err);
          });
      } else {

        message.reply(`**🙄 - I can't find <&795385983381143553> in the ban list**`);
      }
    } else {

      const embed = new Discord.MessageEmbed()
        .setColor("00e8ff")
        .setTitle("**Command: ban**")
        .setDescription(`
Bans a member.
 
**Usage:**
${prefix}ban (user) (time m/h/d/mo/y) (reason)
 
**Examples:**
${prefix}ban ${message.author}
${prefix}ban ${message.author} spamming
${prefix}ban ${message.author} 1h spamming
${prefix}ban ${message.author} 1d spamming
${prefix}ban ${message.author} 1w`)
      message.channel.send(embed);
    }
  }
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'kick')) {
    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have `KICK_MEMBERS` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have `KICK_MEMBERS` Permission**");
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {


            const embed = new Discord.MessageEmbed()
              .setColor("00e8ff")
              .setTitle("\🦠 "`Successfully kicked ${user.tag}`)
            message.channel.send(embed);

          })
          .catch(err => {

            message.reply(`🙄 - I couldn't kick that user. Please check my permissions and role position.`);

            console.error(err);
          });
      } else {

        message.reply("**🙄 - I can't find this member**");
      }

    } else {

      const embed = new Discord.MessageEmbed()
        .setColor("00e8ff")
        .setTitle(`**Command: kick**`)
        .setDescription(
          `Kicks a member.
 
**Usage:**
${prefix}kick (user) (reason)
 
**Examples:**
${prefix}kick ${message.author}`)
      message.channel.send(embed);
    }
  }/*
  if (message.content.startsWith(prefix + 'mute')) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MUTE_MEMBERS\`**`);
    let mention = message.mentions.members.first();
    let role = message.guild.roles.cache.find(ro => ro.name == 'Muted');
    if (!role) {
      message.guild.roles.create({
        data: {
          name: 'Muted',
          permissions: [],
          color: 'random'
        }
      })
    }
    if (!mention) return message.channel.send(`**Usage: ${prefix}mute \`<@user>\`**`);
    message.guild.channels.cache.forEach(c => {
      c.updateOverwrite(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
    mention.roles.add(role)
    message.channel.send(`**✅  Successfully Muted ${mention.user.tag}**`)
  }*/
})

//Bot info code
client.on('message', message => {
  var devs = '633724614224379942'
  if (message.content == (prefix + "bot"),
    message.content == (prefix + "stats")) {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    if (!message.guild) return;
    let embed = new Discord.MessageEmbed()
      .setTitle(`Bot Info`)
      .setColor("RANDOM")
      .setDescription(`Bot Name: **${client.user.tag}**\nBot ID: **${client.user.id}**\nServers Count: **${client.guilds.cache.size}** Servers\nChannels Count: **${client.channels.cache.size}** Channels\nUsers Count: **${client.users.cache.size}** Users\nBot Dev: **<@${devs}>**`)
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
    message.channel.send(embed)
  }
})


//unban code
var _0xb22a = ["\x6D\x65\x73\x73\x61\x67\x65", "\x20", "\x73\x70\x6C\x69\x74", "\x63\x6F\x6E\x74\x65\x6E\x74", "\x75\x6E\x62\x61\x6E", "\x42\x41\x4E\x5F\x4D\x45\x4D\x42\x45\x52\x53", "\x68\x61\x73\x50\x65\x72\x6D\x69\x73\x73\x69\x6F\x6E", "\x6D\x65\x6D\x62\x65\x72", "\x73\x65\x6E\x64", "\x63\x68\x61\x6E\x6E\x65\x6C", "\x6A\x6F\x69\x6E", "\x73\x6C\x69\x63\x65", "\x61\x6C\x6C", "\x6D\x65\x6D\x62\x65\x72\x73", "\x67\x75\x69\x6C\x64", "\x66\x6F\x72\x45\x61\x63\x68", "\x63\x61\x63\x68\x65", "\x74\x68\x65\x6E", "\x66\x65\x74\x63\x68\x42\x61\x6E\x73", "\x75\x73\x65\x72\x6E\x61\x6D\x65", "\x61\x75\x74\x68\x6F\x72", "\x61\x76\x61\x74\x61\x72\x55\x52\x4C", "\x73\x65\x74\x41\x75\x74\x68\x6F\x72", "\x2A\x2A\u2705\x20\x55\x73\x65\x72\x73\x20\x68\x61\x73\x20\x75\x6E\x62\x61\x6E\x6E\x65\x64\x21\x2A\x2A", "\x73\x65\x74\x44\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E", "\x23\x64\x36\x31\x36\x33\x63", "\x73\x65\x74\x43\x6F\x6C\x6F\x72", "\x0D\x0A\x20\x20\x55\x6E\x62\x61\x6E\x73\x20\x61\x20\x6D\x65\x6D\x62\x65\x72\x2E\x0D\x0A\x0D\x0A\x20\x20\x2A\x2A\x55\x73\x61\x67\x65\x3A\x2A\x2A\x0D\x0A\x20\x20", "\x75\x6E\x62\x61\x6E\x20\x28\x75\x73\x65\x72\x6E\x61\x6D\x65\x20\x2F\x20\x75\x73\x65\x72\x20\x69\x64\x29\x0D\x0A\x0D\x0A\x20\x20\x2A\x2A\x45\x78\x61\x6D\x70\x6C\x65\x73\x3A\x2A\x2A\x0D\x0A\x20\x20", "\x75\x6E\x62\x61\x6E\x20\x3C\x40\x21", "\x69\x64", "\x3E\x0D\x0A\x20\x20", "\x75\x6E\x62\x61\x6E\x20", "\x0D\x0A\x20\x20", "\x43\x6F\x6D\x6D\x61\x6E\x64\x3A\x20\x75\x6E\x62\x61\x6E", "\x73\x65\x74\x54\x69\x74\x6C\x65", "\x2A\x2A\uD83D\uDE44\x20\x2D\x20\x49\x20\x63\x61\x6E\x27\x74\x20\x66\x69\x6E\x64\x20", "\x20\x69\x6E\x20\x74\x68\x65\x20\x62\x61\x6E\x20\x6C\x69\x73\x74\x2A\x2A", "\x63\x61\x74\x63\x68", "\x2A\x2A\u2705\x20", "\x20\x75\x6E\x62\x61\x6E\x6E\x65\x64\x21\x2A\x2A", "\x6F\x6E"]; client[_0xb22a[41]](_0xb22a[0], (_0xff58x1) => { let _0xff58x2 = _0xff58x1[_0xb22a[3]][_0xb22a[2]](_0xb22a[1])[0]; if (_0xff58x2 == prefix + _0xb22a[4]) { let _0xff58x3 = new Discord.MessageEmbed(); if (!_0xff58x1[_0xb22a[7]][_0xb22a[6]](_0xb22a[5])) { return _0xff58x1[_0xb22a[9]][_0xb22a[8]]() }; let _0xff58x4 = _0xff58x1[_0xb22a[3]][_0xb22a[2]](_0xb22a[1])[_0xb22a[11]](1)[_0xb22a[10]](_0xb22a[1]); if (_0xff58x4 == _0xb22a[12]) { _0xff58x1[_0xb22a[14]][_0xb22a[18]]()[_0xb22a[17]]((_0xff58x5) => { _0xff58x5[_0xb22a[16]][_0xb22a[15]]((_0xff58x6) => { _0xff58x1[_0xb22a[14]][_0xb22a[13]][_0xb22a[4]](_0xff58x6) }) }); let _0xff58x7 = new Discord.MessageEmbed()[_0xb22a[26]](_0xb22a[25])[_0xb22a[24]](`${_0xb22a[23]}`)[_0xb22a[22]](_0xff58x1[_0xb22a[20]][_0xb22a[19]], _0xff58x1[_0xb22a[20]][_0xb22a[21]]()); return _0xff58x1[_0xb22a[9]][_0xb22a[8]](_0xff58x7) }; let _0xff58x8 = new Discord.MessageEmbed()[_0xb22a[35]](_0xb22a[34])[_0xb22a[24]](`${_0xb22a[27]}${prefix}${_0xb22a[28]}${prefix}${_0xb22a[29]}${_0xff58x1[_0xb22a[20]][_0xb22a[30]]}${_0xb22a[31]}${prefix}${_0xb22a[32]}${_0xff58x1[_0xb22a[20]][_0xb22a[30]]}${_0xb22a[33]}${prefix}${_0xb22a[12]}`)[_0xb22a[22]](_0xff58x1[_0xb22a[20]][_0xb22a[19]], _0xff58x1[_0xb22a[20]][_0xb22a[21]]()); if (!_0xff58x4) { return _0xff58x1[_0xb22a[9]][_0xb22a[8]](_0xff58x8) }; _0xff58x1[_0xb22a[14]][_0xb22a[13]][_0xb22a[4]](_0xff58x4)[_0xb22a[17]]((_0xff58xb) => { let _0xff58xc = new Discord.MessageEmbed(); _0xff58x1[_0xb22a[9]][_0xb22a[8]](`${_0xb22a[39]}${_0xff58xb[_0xb22a[19]]}${_0xb22a[40]}`); _0xff58x1[_0xb22a[9]][_0xb22a[8]] })[_0xb22a[38]]((_0xff58x9) => { let _0xff58xa = new Discord.MessageEmbed()[_0xb22a[26]](_0xb22a[25])[_0xb22a[24]](`${_0xb22a[36]}${_0xff58x4}${_0xb22a[37]}`); _0xff58x1[_0xb22a[9]][_0xb22a[8]](_0xff58xa) }) } })

//support code
client.on('message', message => {
  if (message.content == (prefix + "support")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.send(`Check Your DM <a:CDR_ThumbsUpPop:898921174736711710>`)
    var embed = new Discord.MessageEmbed()
      .setTitle(`Click Here For Bot Support!`)
      .setURL(`https://discord.com/users/724819860214775899`)
    message.author.send(embed)
  }
});

/*//example
client.on("message", message => {
  if(message.content == "=try") {
    const embed = new Discord.MessageEmbed()
    .setTitle("trying")
    .setDescription(` [click here](https://python.org)`)
    message.channel.send(embed)
  }
})*/

//invite code
client.on('message' , message => {
  if (message.content == (prefix + "invite")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.send(`Check Your DM <a:CDR_ThumbsUpPop:898921174736711710>`)
    var embed = new Discord.MessageEmbed()
      .setTitle("INVITE ME")
      .setDescription(`Invite Me As [**ADMINISTRATOR**](https://discord.com/api/oauth2/authorize?client_id=899980824475213895&permissions=8&scope=bot%20applications.commands)\n
      Invite Me As [**Normal Bot With Not So Good Perms**](https://discord.com/api/oauth2/authorize?client_id=899980824475213895&permissions=268823799&scope=bot%20applications.commands)\n
      [**DM My Owner**](https://discord.com/users/633724614224379942)`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(" Plz Invite Me 🔗")
    message.author.send(embed)
  }  
  
});
//tax code
const probot = require("probot-tax");
client.on("message", message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'tax'),
    message.content.startsWith(prefix + 'tc')) {
      if(message.author.bot) return;
      if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.channel.send('Please enter the amount to be paid')
    let embed = new Discord.MessageEmbed()
      .setColor('RED')
      .addFields(
        {
          name: "`Amount to be paid :`", value: `**${args}**`

        },
        {
          name: "`Amount To Pay Including Tax :`", value: `**${probot.taxs(args)}**`

        },


      )
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()

    message.channel.send(embed)
  }
});

//ping code
client.on("message", async message => {
  if (message.content == (prefix + "ping")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    message.channel.startTyping()
    if (!message.channel.guild) return;
   // var message = ``
    var api = `${Math.round(client.ws.ping)}`;
    if (message.author.bot) return;
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
      .addField("**Time Taken:**", `${Date.now()- message.createdTimestamp}` + " ms 📶 ", true)
      .addField("**WebSocket:**", api + " ms 📶 ", true)
      .setColor("RANDOM")
      .setFooter(`Requested By ${message.author.tag}`)//message.author.displayAvatarURL({ dynamic: true }))
      message.channel.send(embed)
      message.channel.stopTyping()
  }
})

//Set presence
/*
client.on("ready", () => {
  console.log("I Am Ready As " + client.user.username)

  client.user.setActivity({
    name: "Myself At DISCORD 😏",
    type: "STREAMING",
    url: "https://twitch.tv/master_gamer_origin"
  })

});
*/

//status changing activity
client.on('ready', () => {
   console.log("BOT WENT ONLINE")
   
   const activities = [
     `Good To Be Back!`,
     `Let's Break Discord!`,
     `Ping For Prefix`,
   //  `${client.users.cache.size} Users`,
     `help me grow: =invite`
   //  `Emoji Converter is here [BETA]`
   ];
   let index = 0;
   setInterval(() => {
     if (index === activities.length) index = 0;
     const status = activities[index];
     client.user.setActivity(status, { type: "STREAMING" , url: "https://twitch.tv/master_gamer_origin"}).catch(console.error)
     index++;
   }, 120000) // in ms
})

//info when bot is pinged
client.on(`message`, message => {
  let args = message.content
  if (message.mentions.has(client.user)) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
  if(message.content.includes("@here") || message.content.includes("@everyone")) return false;
  
    message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`Hey ${message.author.username} `, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${message.author}<a:CDR_Hemlo:899991835534057472> My Prefix is **${prefix}**, to get help, type **${prefix}help**`)
      .setTimestamp()
      .setFooter("😏")
    )
  }
});


//GIVEAWAY
//giveaway help
/*client.on(`message`, message => {
  if (message.content.startsWith(prefix + "ghelp")) {
    const embed = new Discord.MessageEmbed()
      .setTitle("🎉 Giveaway Commands 🎉 [`BETA`]")
      .addField(`<a:giveaway:849854534389596160> ${prefix}ghelp`, `<a:popper:849854639977005076> **Shows this message,** _usage: "=ghelp"_`, false)
      .addField(`<a:giveaway:849854534389596160> ${prefix}gstart`, `<a:popper:849854639977005076> **Starts a new giveaway,** _usage: "=gstart {channel} {time} {winners} {prize} "_`, false)
      .addField(`<a:giveaway:849854534389596160> ${prefix}greroll`, `**<a:popper:849854639977005076> Rerolls a giveaway,** _usage: "=greroll {message id}"_`, false)
      .addField(`<a:giveaway:849854534389596160> ${prefix}gend`, `**<a:popper:849854639977005076> Ends a giveaway early,** _usage: "=gend {message id}"_`, false)
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter(`Giveaways🎁`)
    message.channel.send(embed)
  }
});*/

//snipe

client.once('ready', () => {
    console.log('Sniper ready 😒')
});

client.on('messageDelete', async (message) => {
    msg = message.content;
    peep = message.author;
})

client.on('message', message => {
    if(message.content === prefix + 'snipe'){
      if(message.author.bot) return;
      if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
      if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
        const embed = new Discord.MessageEmbed()
        .setAuthor(peep.tag, peep.avatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setDescription(msg)
        .setFooter("🤭 get sniped lol")
        .setTimestamp();
        message.channel.send(embed);
        
    }
})

client.on("message", message => {
  if(message.content == prefix + `example`){
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
 const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

  message.channel.send(exampleEmbed);
  } else if(message.content == prefix + "examplebtn"){
   const btn = new disbut.MessageButton()
   .setStyle("blurple")
   .setLabel("Beyond...")
   return message.channel.send(btn)
  }
})

//slash commands
/*
client.on('ready', async () => {
  console.log("slash cmd ready")

  const commands = await getApp(guildId).commands.get()
  console.log(commands)
  
  await getApp(guildId).commands.post({
    data: {
      name: 'ping',
      description: 'a simple ping pong command'
    }
  })
})

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const command = interaction.data.name.toLowerCase()
 if (command = 'ping') {
   client.api.interactions(interactiion.id, interaction.token).callback.post({
     data:{
       type: 4,
        data: {
         content: 'pong'
       }
     }
   }).catch(console.error)
 }
})
*/

/*client.on("message", message => {
  if (message.content.startsWith("hi") || 
      message.content == "hello" ||
      message.content == "sup" ||
      message.content == "Sup" ||
      message.content == "SUP" ||
      message.content == "Hello" ||
      message.content.startsWith("Hi")){
   message.channel.send("Hey There! I Hope You Are Having A Good Day And Will Continue To Have It " + `<a:pikahi:847691734913122325>` )
  }
})
*/
//invites
client.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
 
client.on("message", message => {
  const args = message.content.slice(prefix.length).split(/ +/);
  let newlog = message.content.split(" ").slice(1).join(" ")
   if  (message.content == (prefix + 'invitesleaderboard') ||
       message.content == (prefix + 'lbinvites')) {
      if(message.author.bot) return;
      if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
     if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }

      message.guild.fetchInvites().then((invites) => {

  const inviteCounter = {}

  invites.forEach((invite => {

      const { uses, inviter } = invite

      const { username, discriminator } = inviter

      const name = `${inviter}`

      inviteCounter[name] = (inviteCounter[name] || 0) + uses

  }))

  let replyText = new MessageEmbed()

      .setTitle(`📩 Invitation Cards ${message.guild.name}`)

      .setDescription(` \n`)

      .setColor("RANDOM")

  const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

  if (sortedInvites.length > 10) sortedInvites.length = 10

  else if (sortedInvites.length > 10) sortedInvites.length = sortedInvites.length

  for (const invite of sortedInvites) {

      const count = inviteCounter[invite]

      replyText.description += `\n${invite} has invited ${count} member(s).`
  }
    message.reply(replyText)
    })
    console.log(error => {
      message.channel.send('ERROR COMMAND')
    })
    } 
})

client.on("message", message => {
  const args = message.content.slice(prefix.length).split(/ +/);
  let newlog = message.content.split(" ").slice(1).join(" ")
   if (message.content.startsWith(prefix + 'checkinvites')||  message.content.startsWith(prefix + 'invs')) {
     if(message.author.bot) return;
     if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
     if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }

        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

         message.guild.fetchInvites()

        .then

        (invites =>

            {

                const userInvites = invites.array().filter(o => o.inviter.id === user.id);

                var userInviteCount = 0;

                for(var i=0; i < userInvites.length; i++)

                {

                    var invite = userInvites[i];

                    userInviteCount += invite['uses'];

                }

                     message.channel.send(

                       embed = new MessageEmbed()

                       .setColor('RANDOM')
                       .setAuthor(`${user.user.username}`, user.user.displayAvatarURL({dynamic: true}))
                       .setTitle(`has \`${userInviteCount}\` invites.`)
)})}
})
     

      

/*client.on('guildMemberAdd', async member => {

  if (!member || !member.id || !member.guild) return;

  const guild = member.guild;

  var welcome = JSON.parse(fs.readFileSync("server.json", "utf8"));

  if (!welcome) return;

  let channel = member.guild.channels.cache.get(

    `${welcome[member.guild.id].nick}`

  );

  if (!channel) return;

  const cachedInvites = guildInvites.get(member.guild.id);

  const newInvites = await member.guild.fetchInvites();

  guildInvites.set(member.guild.id, newInvites);

  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)

  let createdAt = moment(member.createdAt).format('LLLL');

  let embed = new MessageEmbed()

    // .setTitle(`Welcome to ${member.guild.name}`)

    .setColor("RANDOM")

    .setDescription(`<a:arrow:847502013532471296> 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 ${member} 𝐓𝐨 <a:Sup:846618619524939787> **${member.guild.name}** <a:Sup:846618619524939787> \n <a:arrow:847502013532471296> 𝐈𝐧𝐯𝐢𝐭𝐞 𝐁𝐲: <@${usedInvite.inviter.id}>\n <a:arrow:847502013532471296> 𝐈𝐧𝐯𝐢𝐭𝐞: ${usedInvite.uses} \n <a:arrow:847502013532471296> 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐂𝐫𝐞𝐚𝐭𝐞 : ${createdAt} \n 
<a:arrow:847502013532471296> 𝐓𝐨𝐭𝐚𝐥 ${member.guild.memberCount} 𝐌𝐞𝐦𝐛𝐞𝐫 𝐈𝐧 𝐒𝐞𝐫𝐯𝐞𝐫`)

    .setTimestamp()

  if (channel) {

    channel.send(embed).catch(err => console.log(err))

  }

});
*/

const config = require("./config.json")
//vote

/*client.on("message", message => {
  if(message.content == prefix + "vote") {
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const embed = new Discord.MessageEmbed()
    .setAuthor("Vote For Me!")
    .addField("*Top.gg <:CDR_Top_gg:899992127730253905>*", "https://top.gg/bot/841583996756688917", {inline: true})
    .addField("*Cyclone Bot List <:CDR_cbl:864720289338490930>*", "https://cyclonebotlist.xyz/bots/841583996756688917", {inline: true})
    .addField("*Discord Bot List <:CDR_DiscordBotList:864720967007076408>*", "https://discordbotlist.com/bots/coder", {inline: true})
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Every Vote Counts")
    message.channel.send(embed)
  }
})
*/
//uptime

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ + /);
    const command = args.shift().toLowerCase();

    if (command === 'uptime') {
     if(message.author.bot) return;
     if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
      if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
      message.channel.startTyping()
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new Discord.MessageEmbed()
           .setTitle(`Uptime`)
           .addField("Days", `*${days}*`, {inline: true})
           .addField("Hours", `*${hours}*`, {inline: true})
           .addField("Minutes", `*${minutes}*`, {inline: true})
           .addField("Seconds", `*${seconds}*`, {inline: true})
           .setColor("RANDOM")
           .setFooter("Uptime Is Generally Less Because I Update Frequently 😏")
           .setTimestamp()
       message.channel.send(embed);
       message.channel.stopTyping()
    }
});

//react 

client.on("message", message => {
  if(message.content.toLowerCase().startsWith(prefix + "react")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const toreact = message.channel.messages.cache.last(2)
    let args = message.content.split(' ').slice(1,2).join(' ');
    if(!args){
      return message.channel.send("Send an emoji for me to react bruh")
    }
    if(args.startsWith(`:`)){
    //  message.channel.send("Send an **EMOJI**, Not message")
    }
     message.delete().then(toreact[0].react(args))//.catch(console.error)
  } 
})

/*
//chk status and gives role
client.on('presenceUpdate', async (oldPresence, newPresence) => {
  const role = newPresence.guild.roles.cache.get("870903705631850526");
  const member = newPresence.member
  const activities = member.user.presence.activities[0];

  if (!member) return;
  if (!role) return console.log("No role");
  if (!activities) return;

  if (activities.state && (activities.state.includes( ".gg/" ) || activities.state.includes(".gg/" ))) {
    return newPresence.member.roles.add(role)
  } else {
    if(newPresence.member.roles.cache.has(role.id)) {
      newPresence.member.roles.remove(role)
    }
  }
});
*/
/*
For that you'd have to get the message before the latest message by using the <Collection>.last() method on <TextChannel>.messages.cache and passing 2 to it, that'll make it return the message before the last one, and after that access the first index of the returned array and call <Message>.react() on it to react to it
*/
//nqn
/*
client.on('message', async (message) => {
    if(message.author.bot) return;
    let substringArray = get_substrings_between(message.content, ":", ":");
    let msg = message.content;
    if(!substringArray.length) return;

    substringArray.forEach(m => {
        let emoji = client.emojis.cache.find(x => x.name === m);
        var replace = `:${m}:`;
        var rexreplace = new RegExp(replace, 'g');

        if(emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<a${replace}${emoji.id}>`)) msg = msg.replace(rexreplace, emoji.toString());
    })
    

    if(msg === message.content) return;

    var webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find(x => x.name === "Coder Emojis");

    if(!webhook) {
        webhook = await message.channel.createWebhook(`Coder Emojis`, {
            avatar: client.user.displayAvatarURL({dynamic: true})
        });
    }

    await webhook.edit({
        name: message.member.nickname ? message.member.nickname : message.author.username,
        avatar: message.author.displayAvatarURL({dynamic: true})
    })

    message.delete().catch(m => {})

    webhook.send(msg).catch( m => {});

    await webhook.edit({
        name: `Coder Emojis`,
        avatar: client.user.displayAvatarURL({dynamic:true})
    })

 
})

function get_substrings_between(str, startDelimiter, endDelimiter) {
    var contents = [];
    var startDelimiterLength = startDelimiter.length;
    var endDelimiterLength = endDelimiter.length;
    var startFrom = contentStart = contentEnd = 0;
  
    while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
      contentStart += startDelimiterLength;
      contentEnd = strpos(str, endDelimiter, contentStart);
      if (false === contentEnd) {
        break;
      }
      contents.push(str.substr(contentStart, contentEnd - contentStart));
      startFrom = contentEnd + endDelimiterLength;
    }
  
    return contents;
  }
  
  
  function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
  }

  console.log('Done')
*/

//link it
client.on("message", message => {
  if(message.content.toLowerCase().startsWith(prefix + "linkit")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    let word = message.content.split(' ').slice(1,2).join(' ');
    let link = message.content.split(' ').slice(2).join(' ');
    message.delete()
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`[**`+ word + `**]`+`(` + link + `)`)
    
     if(!link) {
      return message.channel.send("Incorrect/Missing Arguments!, chk usage by `=help linkit`" + `<a:CDR_No:899992501941841920>`)
     } else if (!link.startsWith("http")) {
      return message.channel.send("Incorrect/Missing Arguments!, chk usage by `=help linkit`" + ` <a:CDR_No:899992501941841920>`)
     } else if (link) {
       message.channel.send(embed)
     }
  }
})

client.on("message", message => {
  if(message.content == prefix + "help linkit") {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const embed = new Discord.MessageEmbed()
    .setTitle("Make me link something")
    .setDescription("**Usage:** *=linkit {word} {link}*" + `\n\nRemember: <a:CDR_Dots:899993202113806416> Message **MUST INCLUDE http**\nRemember: <a:CDR_Dots:899993202113806416> Message Must Have **Only 1 Word Before Link**`)
    .setColor("RANDOM")
    
    message.channel.send(embed)
    
  }
})

//set description
/*client.on("message", message => {
  if(message.content.toLowerCase().startsWith(prefix + "description")) {
    
    let description = message.content.split(' ').slice(1).join(' ');
    message.channel.setChannelTopic(description)
    let embed = new Discord.MessageEmbed()
    .setTitle("Channel Description!")
    .setDescription("Set Channel's Description To " + description)
    message.channel.send(embed)
  }
})
*/

//utils
client.on("message", message => {
  if(message.content.toLowerCase() == prefix + "utilities"){
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const embed = new Discord.MessageEmbed()
    .setTitle("My Utilities/Functions")
    .setDescription(`<a:CDR_Dots:899993202113806416> All Moderation Commands Like: kick, ban, unban, slowmode, etc.
    <a:CDR_Dots:899993202113806416> Use All Emojis Without Nitro! ex- Type: **":loloverflow:"**
    <a:CDR_Dots:899993202113806416> React To A Message With Animated Emoji Without Nitro! Type- **"=react :loloverflow:"**
    <a:CDR_Dots:899993202113806416> Tired With A Link So Big? Make It 1 Word! Type - **"=help linkit"**
    <a:CDR_Dots:899993202113806416> Want To See Deleted Message? Try- **"=snipe"**
    <a:CDR_Dots:899993202113806416> See the leaderboard Of Invites By **"=lbinvites"**
    <a:CDR_Dots:899993202113806416> Track Anyone's Invites By **"=invs @ChocoSpread#1234"**
    <a:CDR_Dots:899993202113806416> Calculate Tax On A Certain Amount By **"=tc 200"**
    <a:CDR_Dots:899993202113806416> Want Me To Copy You? Try **"=msgstart"**
    <a:CDR_Dots:899993202113806416> Want To Create A Role Very Fast? Try **"=c-role VIP"**
    <a:CDR_Dots:899993202113806416> Want To Send Your Message In A Rich Embed? Try - **"=embed I Think @coder#3561 is Pretty Cool!"**`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Invite Me Now! 😏✨")

  message.channel.send({ embed: embed })
  }
})


//ticket

async function channelLog(embed) {
  if (!config.log_786633884015919134) return;
  let ch = await client.channels.cache.get(config.log_786633884015919134) || message.guild.channels.cache.find(channel => channel.name.match("log"));
  if (!ch) return console.log(`Pls fill config.json`)
  ch.send(embed)
}

client.on('ready', async () => {
  await console.clear()
});

client.on("message", async(message) =>{
  if (message.author.bot || !message.guild) return;
  let args = message.content.toLowerCase().split(" ");
  let command = args.shift()
  if (command == prefix + `htickets`) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`Ticket commands list`)
      .setDescription(`> \`${prefix}send\` - Send a message to open tickets
> \`${prefix}add\` - Adds a member to a specific ticket
> \`${prefix}remove\` - Removes a member to a specific ticket.
> \`${prefix}delete\` - Delete a specific ticket
> \`${prefix}close\` - Close a specific ticket
> \`${prefix}open\` - Open a specific ticket
> \`${prefix}rename\` - Rename a specific ticket
> \`${prefix}setchannels\` - set channels relating to ticket log and category
> \`${prefix}setstaff\` - set staff roles`)
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(`Invite Me By =invite`)
    message.channel.send({ embed: embed })
  }
  if (command == prefix + `add`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.channel.send({ embed: { description: `this server needs to set up their staff roles first! \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.channel.send(`Mention a member of its ID`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
        }).then(() => {
          message.channel.send({ embed: { description: `${member} has been successfully added to ${channel}`, color: 0x5865F2 } });
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`A person has been added to a ticket`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Added Person`, member.user)
            .addField(`Action by`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        });
      }
      catch (e) {
        return message.channel.send(`An error occurred, please try again!`);
      }
    }
  }
  if (command == prefix + `remove`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.channel.send({ embed: { description: `this server needs to set up their staff roles first! \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.channel.send(`Mention a member of its ID`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
        }).then(() => {
           let log_embed = new Discord.MessageEmbed()
            .setTitle(`People removed to ticket`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`person added`, member.user)
            .addField(`Action by`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          message.channel.send({ embed: { description: `Successfully delete ${member} from ${channel}`, color: 0x5865F2 } });
        });
      }
      catch (e) {
        return message.channel.send(`An error occurred, please try again!`);
      }
    }
  }
  if (command == prefix + 'delete') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.channel.send({ embed: { description: `this server needs to set up their staff roles first! \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      message.channel.send({ embed: { description: `Your order is executed after 5 seconds, and it will be closed`, color: 0x5865F2 } })
      setTimeout(async () => {
        let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket Deleted`)
            .addField(`Ticket number`, `${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
            .addField(`Ticket by`,`<@!${await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by}>`)
            .addField(`Action by`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          channel.delete()
      }, 5000)
    }
  }
  if (command == prefix + 'close') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.channel.send({ embed: { description: `this server needs to set up their staff roles first! \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.channel.send({ embed: { description: `Your order is executed after 5 seconds, and it will be closed`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket has been closed by <@!${message.author.id}>`, color: `YELLOW` } })
          let type = 'member'
          await Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
          channel.setName(`closed-${(await db.get(`ticket_${channel.id}_${message.guild.id}`))}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket closed`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Action by`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`YELLOW`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`An error occurred, please try again!`);
        }
      }, 1000)
    }
  }

  if (command == prefix + 'open') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.channel.send({ embed: { description: `this server needs to set up their staff roles first! \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.channel.send({ embed: { description: `Your order is executed after 5 seconds`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Ticket opened by <@!${message.author.id}>`, color: `GREEN` } })
          let meember = client.users.cache.get(await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by);
          channel.updateOverwrite(meember, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Staff_${message.guild.id}.Admin`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Staff_${message.guild.id}.Moder`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.setName(`ticket-${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Ticket has reopened`)
            .addField(`Ticket`, `<#${channel.id}>`)
            .addField(`Action by`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`An error occurred, please try again!`);
        }
      }, 1000)
    }
  }
  if (command == prefix + 'rename' || command == prefix + 'setname') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`:x: This command requires \`MANAGE_MESSAGES\` permission.`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.channel.send({ embed: { description: `this server needs to set up their staff roles first! \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let args = message.content.split(' ').slice(1).join(' ');
      if (!args) return message.channel.send({ embed: { description: `Please select the name you want for the ticket`, color: 0x5865F2 } })
      channel.setName(args)
      message.delete()
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`Ticket name change`)
        .addField(`New name`, args)
        .addField(`Ticket`, `<#${channel.id}>`)
        .addField(`by`, `<@!${message.author.id}>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      channelLog(log_embed)
    }
  }
  if (command == prefix + 'setstaff'){
    console.log(args)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:x: This command requires \`ADMINISTRATOR\` permission.`);
    if (args.length != 2) return message.channel.send({ embed: { description: `Please provide an Admin role id, *then* a Mod role id with this command! `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.channel.send({ embed: { description: `Please mention an Admin role (or iD) first, *then* a Mod role (or iD) with this command! `, color: 0x5865F2 } })
    const Admin = message.guild.roles.cache.get(args[0]);
    const Moder = message.guild.roles.cache.get(args[1]);
    await db.set(`Staff_${message.guild.id}.Admin`, Admin.id)
    await db.set(`Staff_${message.guild.id}.Moder`, Moder.id)
    message.react("✅")
  }
  if (command == prefix + 'setchannels'){
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:x: This command requires \`ADMINISTRATOR\` permission.`);
    if (args.length != 2) return message.channel.send({ embed: { description: `Please mention a channelid, *then* a categoryid with this command! `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.channel.send({ embed: { description: `Please mention an Log Channel (or iD), *then* a Category (or iD) with this command! `, color: 0x5865F2 } })
    const txt = message.guild.channels.cache.get(args[0]);
    const cat = message.guild.channels.cache.get(args[1]);
    if (txt.type !== "text") return message.channel.send("The first input should be a text channel");
    if (cat.type !== "category") return message.channel.send("The second input should be a text category");
    await db.set(`Channels_${message.guild.id}.Log`, txt.id)
    await db.set(`Channels_${message.guild.id}.Cat`, cat.id)
    message.react("✅")
  }
  if (command == prefix + 'send' || command == prefix + 'ticket') {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`:x: This command requires \`ADMINISTRATOR\` permission.`);
    const sfats = await db.get(`Staff_${message.guild.id}`)
    const sfas = await db.get(`Channels_${message.guild.id}`)
    if (!sfats || sfats === null) return message.channel.send({ embed: { description: `This server needs to set up their staff roles first! \`${prefix}setstaff\``, color: 0x5865F2 } })
    if (!sfas || sfas === null) return message.channel.send({ embed: { description: `This server needs to set up their ticket channels first! \`${prefix}setchannels\``, color: 0x5865F2 } })
    let idd = randomstring.generate({ length: 20 })
    let args = message.content.split(' ').slice(1).join(' ');
    if (!args) args = `Tickets`
    let button1 = new MessageMenuOption()
    .setLabel('Special Support')
    .setEmoji('🔴')
    .setValue("men")
    .setDescription('Use this to contact Admins+ only!')
    let button3 = new MessageMenuOption()
    .setLabel('General Support')
    .setEmoji('🟠')
    .setValue("hlp")
    .setDescription('Use this to contact Helpers and higher ranks!')  
    let select = new MessageMenu()
    .setID(idd)
    .setPlaceholder('Create A ticket!')
    .setMaxValues(1)
    .setMinValues(1)
    .addOptions(button1, button3)
    let embed = new Discord.MessageEmbed()
      .setTitle(args)
      .setDescription("To create a ticket, select one of the options below from the menu.")
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(message.guild.name, message.guild.iconURL())
    let msg = await message.channel.send({ embed: embed, component: select }).then(async msg => {
      msg.pin()
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`A message has been sent to open new tickets`)
        .addField(`Channel`, `<#${message.channel.id}>`)
        .addField(`by`, `<@!` + message.author.id + `>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      channelLog(log_embed)
      await db.set(`tickets_${idd}_${message.guild.id}`, {
        reason: args,
        msgID: msg.id,
        id: idd,
        options: [button1,  button3],
        guildName: message.guild.name,
        guildAvatar: message.guild.iconURL(),
        channelID: message.channel.id
      })
    })
  }
})


client.on('clickMenu', async (button) => {
  console.log(button.values)
  if (await db.get(`tickets_${button.id}_${button.message.guild.id}`)) {
    await button.reply.send(`Your ticket is being processed. Please wait `, true)
    await db.math(`counts_${button.message.id}_${button.message.guild.id}`, `+`, 1)
    let count = await db.get(`counts_${button.message.id}_${button.message.guild.id}`)
    let channel;
    await button.clicker.fetch();
    if (button.values[0] === "men") { // Admins +
      button.guild.channels.create(`ticket-${count}`, {
        permissionOverwrites: [
          {
            id: button.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: (await db.get(`Staff_${button.message.guild.id}.Admin`)),
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
          },
          {
            id: button.clicker.user.id,
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          },
        ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `A Ticket : <@!${button.clicker.user.id}>`, reason: "All rights reserved to JEON JUNGKOOK- OWNER OF ME"
      }).then(async channel => {
        channel = channel
        await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })
      
        await button.reply.edit(`
  **Your ticket has been successfully opened** <#${channel.id}>`, true)
            let log_embed = new Discord.MessageEmbed()
              .setTitle(`New ticket opened`)
              .addField(`Ticket`, `<#${channel.id}>`)
              .addField(`Ticket by`, `<@!${button.clicker.user.id}>`)
              .addField(`Ticket number`, count)
              .setTimestamp()
              .setColor(`GREEN`)
            channelLog(log_embed)
        const embedticket = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Specialised Support")
          .setFooter(`Ticket opened at`)
          .setColor(0x5865F2)
          .setDescription(`Support will be with you soon.\n
  To close this ticket, interact with 🔒`)
        let idd = randomstring.generate({ length: 25 })
        let bu1tton = new disbut.MessageButton()
          .setStyle(`gray`)
          .setEmoji(`🔒`)
          .setLabel(`Close`)
          .setID(idd)
        channel.send(`Welcome <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {
          msg.pin()
        })
        })
      }
        if (button.values[0] === "hlp"){ // help +
          button.guild.channels.create(`ticket-${count}`, {
            permissionOverwrites: [
              {
                id: button.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
              },
              {
                id: (await db.get(`Staff_${button.message.guild.id}.Admin`)),
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
              },
              {
                id: (await db.get(`Staff_${button.message.guild.id}.Moder`)),
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
              },
              {
                id: button.clicker.user.id,
                allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
              },
            ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `A Ticket : <@!${button.clicker.user.id}>`, reason: "All rights reserved to JEON JUNGKOOK- OWNER OF ME"
          }).then(async channel => {
            channel = channel
            await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })
          
            await button.reply.edit(`
      **Your ticket has been successfully opened** <#${channel.id}>`, true)
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`New ticket opened`)
                  .addField(`Ticket`, `<#${channel.id}>`)
                  .addField(`Ticket by`, `<@!${button.clicker.user.id}>`)
                  .addField(`Ticket number`, count)
                  .setTimestamp()
                  .setColor(`GREEN`)
                channelLog(log_embed)
            const embedticket = new Discord.MessageEmbed()
              .setTimestamp()
              .setTitle("General Support")
              .setFooter(`Ticket opened at`)
              .setColor(0x5865F2)
              .setDescription(`Support will be with you soon.\n
      To close this ticket, interact with 🔒`)
            let idd = randomstring.generate({ length: 25 })
            await db.set(`close_${button.clicker.user.id}`, idd)
            let bu1tton = new disbut.MessageButton()
              .setStyle(`gray`)
              .setEmoji(`🔒`)
              .setLabel(`Close`)
              .setID(idd)
            channel.send(`Welcome <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {
              msg.pin()
            })
            })
        }
      }
    });
      client.on('clickButton', async (button1) => {
        await button1.clicker.fetch()
        let idd = randomstring.generate({ length: 25 })
        await db.set(`close_${button1.clicker.user.id}_sure`, idd)
        if (button1.id == (await db.get(`close_${button1.clicker.user.id}`))) {
          let bu0tton = new disbut.MessageButton()
            .setStyle(`red`)
            .setLabel(`close`)
            .setID(idd)
          await button1.reply.send(`Are you sure you want to close this ticket?`, { component: bu0tton, ephemeral: true });
        }
      })
        client.on('clickButton', async (button) => {
          await button.clicker.fetch()
          if (button.id == (await db.get(`close_${button.clicker.user.id}_sure`))) {
          await button.reply.send(`Your order is executed after 5 seconds, and it will be closed`, true)   
            let ch = button.channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                await ch.send({ embed: { description: `The ticket has already been closed <@!${button.clicker.user.id}>`, color: `YELLOW` } });
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
                ch.setName(`closed-ticket`)
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Ticket closed`)
                  .addField(`Ticket`, `<#${ch.id}>`)
                  .addField(`Action by`, `<@!${button.clicker.user.id}>`)
                  .setTimestamp()
                  .setColor(`YELLOW`)
                channelLog(log_embed)
              } catch (e) {
                return button.channel.send(`An error occurred, please try again!`);
              }
            }, 4000)
          }
})

//nuke CMD
client.on("message", message => {
 if(message.content.toLowerCase() == prefix + "nuke"){

  if (!message.member.hasPermission('ADMINISTRATOR'))
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("You don't have premssions to do that!");
  if(message.author.bot) return;
  if(!message.channel.deletable) return message.channel.send("This channel is not deletable!")
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
   if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }

        message.channel.clone().then(channel => {
            
            channel.setPosition(message.channel.position)
            message.channel.delete()
            
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage("https://c.tenor.com/f0zEg6sf1bsAAAAC/destory-eexplode.gif")
            .setTimestamp()
            
            channel.send("This channel has been :radioactive: `Nuked` by `" + message.author.tag + "`" , embed)
          
        })
  
        
 } else {
   //message.channel.send("I Dont have perms :_")
 }
})

//pokedex
const fetch = require("node-fetch")

client.on("message", message => {
 if(message.content.toLowerCase().startsWith(prefix + "pokedex")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
   if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
  const pokemon =  message.content.split(' ').slice(1).join(' ');

 if(!pokemon) return message.channel.send("You haven't specified Pokemon!")

 fetch(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${pokemon}`).then(res => res.json()).then(json => message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setTitle(json.name).addField("Hp", json.hp).addField("Type", json.info.type).addField("Weakness", json.info.weakness).addField("Moves", json.moves.map(a => a.name + " => Type:  " + a.type + " => dp: " + a.dp ).join(", ")).setDescription(json.info.description).setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${json.images.photo}`).setFooter("Pokedex")))
 }
})

client.on("message", message => {
  if(message.content.toLowerCase() == prefix + "help pokedex") {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const embed = new Discord.MessageEmbed()
    .setTitle("Get info on any pokemon!")
    .setDescription("**usage:** *=pokedex {pokemon name}*")
    .setColor("RANDOM")
    message.channel.send(embed)
  }
})

//userinfo
client.on("message", (message) => {
  if(message.content.toLowerCase().startsWith(prefix + "userinfo") || 
  message.content.toLowerCase().startsWith(prefix + "ui"))  {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
  
  let args = message.content.split(' ').slice(1).join(' ');
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if(!user){
    message.channel.send("Mention A User Bruh!")
  }

        let status;
        switch (user.presence.status){
            case "online":
                status = `<:CDR_Online:900000768785006642> online`;
                break;
            case "dnd":
                status = `<:CDR_Dnd:900000829916983346>  dnd`;
                break;
            case "idle":
                status = `<:CDR_Idle:900000877870481419> idle`;
                break;
            case "offline":
                status = `<:CDR_Offline:900000927770091541> offline`;
                break;
        }
        const e = new MessageEmbed()
            .setTitle(`${user.user.username} stats`)
            .setColor(`RANDOM`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields({
                    name: "Name: ",
                    value: user.user.username,
                    inline: true
                },{
                    name: "#️⃣ Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },{
                    name: "🆔 ID: ",
                    value: user.user.id,
                },{
               name: "Current Status: ",
                    value: status,
                    inline: true
                },{
 name: "Activity: ",
 value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
 inline: true
 },{
 name: 'Avatar link: ',
 value: `[Click Here](${user.user.displayAvatarURL()})`
 },{
 name: 'Creation Date: ',
 value: user.user.createdAt.toLocaleDateString("en-us"),
 inline: true},{
 name: 'Joined Date: ',
 value: user.joinedAt.toLocaleDateString("en-us"),
 inline: true},{
 name: 'User Roles: ',
 value: user.roles.cache.map(role => role.toString()).join(" ,"),
 inline: true})
 message.channel.send(e)
  }
})
 
//shell  command
/*
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(prefix + "shell") && !message.author.bot) {
    const args = message.content.split(' ')
    const msg = await message.channel.send({embed: {
            title: 'Running Shell Command.',
            description: "Please wait, 2 Second⏲.",
            color: 'RANDOM'
        }})

        msg.delete({timeout: 2000});

        process.exec(args.join(" "), (error, stdout) => { let result = (stdout || error)
        message.channel.send(result, {code: "asciidoc", split: '\n'}).catch(err => message.channel.send({embed: {
            title: "Error was Found.",
            color: "RED",
            description: `${err}`
        }}))
        })
    }
}) */

//weather cmd
/*const work = require('child_process');

client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(prefix + "shell")){
    let args = message.content.split(' ').slice(1).join(" ");
    const msg = await message.channel.send({embed: {
            title: 'Running Shell Command.',
            description: "Please wait, 2 Second⏲.",
            color: 'RANDOM'
        }})

        msg.delete({timeout: 2000});

        work.exec(args, (error, stdout) => { let result = (stdout || error)
        const final = new Discord.MessageEmbed()
        .setDescription("> COMMAND: \n " + args + "\n\n > OUTPUT:\n" + result)
        .setColor("RANDOM")
        message.channel.send(final, {code: "asciidoc", split: '\n'}).catch(err => message.channel.send({embed: {
            title: "Error was Found.",
            color: "RED",
            description: `${err}`
        }}))
        })
    }
})*/

//welcome img
/*
const { loadImage, createCanvas, registerFont } = require('canvas');
const wlcmimg = "https://www.pixelstalk.net/wp-content/uploads/2016/10/Blank-Background-HD.jpg" // Add your own image. This is just for an example

client.on("message", message => {
 if(message.content.toLowerCase().startsWith(prefix + "setwlcmchannel")){
 const channel = message.content.split(" ").slice(1, 2).join(" ");
 db.add("wlcmcnl", channel);
 message.channel.send("Welcome Message Channel Set Succesfully")
 }
})

client.on("guildMemberAdd", async member => {
const canvas = createCanvas(1024, 500);
  const ctx = canvas.getContext('2d');

  registerFont('./fonts/Uni-Sans.ttf', { family: 'Uni-Sans', weight: 500 });
  
  const pfp = await loadImage(
    member.user.displayAvatarURL({
      format: 'png',
    })
  )
  const background = loadImage(wlcmimg);
  let x = 0
  let y = 0
  ctx.drawImage(background, x, y, 1024, 500)

  x = canvas.width / 2 - 125;
  y = canvas.height / 2 - 200;
  ctx.beginPath();
  ctx.save();
  ctx.arc(canvas.width / 2, canvas.height / 2 - 75, 125, 0, Math.PI * 2);
  ctx.strokeStyle = '#400080';
  ctx.lineWidth = 15;
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(pfp, x, y, 250, 250);
  ctx.restore();


  ctx.font = "85px Uni-Sans";
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  ctx.shadowColor = "black"
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0; // integer
  ctx.shadowBlur = 10; // integer
  ctx.fillText("WELCOME", 308, 380);

  ctx.font = "40px Uni-Sans";
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.fillText(member.user.tag, 360, 430);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');
  
  db.get("wlcmcnl", channel => {
    channel.send({files: attachment})
  })
})

*/

//giphy
const giphy = require('giphy-api')('giphy-api-key');

client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(prefix + "giphy")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    let args = message.content.split(" ").splice(1).join(" ");
    giphy.search(args[0]).then(function (res) {
            const a = res.data
            const b = res.data[Math.floor(Math.random() * a.length)]
            message.channel.send(b.url)
        })
  }
})

//listening to spotify
client.on("message", message => {
  if(message.content.toLowerCase().startsWith(prefix + "listening")) {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const args = message.content.split(" ").splice(1).join(" ");
    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
 let status;
 if (user.presence.activities.length === 1) status = user.presence.activities[0];
 else if (user.presence.activities.length > 1) status = user.presence.activities[1];

 if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
        return message.channel.send(
            new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Person isnt listening to spotify`)
            );
    }

    if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
            url = `https://open.spotify.com/track/${status.syncID}`,
            name = status.details,
            artist = status.state,
            album = status.assets.largeText;
    

        const embed = new Discord.MessageEmbed()
        .setAuthor("Information Regarding Spotify", "https://p7.hiclipart.com/preview/158/639/798/spotify-streaming-media-logo-playlist-spotify-app-icon.jpg")
        .setColor(`GREEN`)
        .setThumbnail(image)
        .addField("Name:", name, true)
        .addField("Album:", album, true)
        .addField("Artists:", artist, true)
        .addField("Full Info.!", `[${artist} - ${name}](${url})`, false)
        //.addField("Listen to that:", `[Click Here]`, true)
        return message.channel.send(embed)
        }
  }
})

//tic tac toe
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(prefix + "tictactoe") || message.content.toLowerCase().startsWith(prefix + "ttt")){
   if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    const args = message.content.split(" ").splice(1).join(" ");
    let opponent = message.mentions.members.first() //|| message.guild.members.cache.get(args[0])
        if(opponent == message.author) return message.channel.send("Challenge someone else, not yourself lol");
        if(!opponent || opponent.user.bot) return message.channel.send("Please provide the user to challenge and don't provide any bots lol")
        let fighters = [message.member.id, opponent.id].sort(() => (Math.random() > .5) ? 1 : -1)
        let Args = {
            user: 0,
            a1: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            a2: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            a3: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            b1: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            b2: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            b3: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            c1: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            c2: {
                style: "gray",
                label: "➖",
                disabled: false
            },
            c3: {
                style: "gray",
                label: "➖",
                disabled: false
            }
        }
        let { MessageButton, MessageActionRow } = require('discord-buttons')
        let msg = await message.channel.send(`**TicTacToe** | <@!${Args.userid}>'s turn (⭕)`)
        tictactoe(msg)
        async function tictactoe(m) {
            Args.userid=fighters[Args.user]
            let won = {
                "⭕": false,
                "❌": false
            }
            if (Args.a1.label == "⭕" && Args.b1.label == "⭕" && Args.c1.label == "⭕") won["⭕"] = true
            if (Args.a2.label == "⭕" && Args.b2.label == "⭕" && Args.c2.label == "⭕") won["⭕"] = true
            if (Args.a3.label == "⭕" && Args.b3.label == "⭕" && Args.c3.label == "⭕") won["⭕"] = true
            if (Args.a1.label == "⭕" && Args.b2.label == "⭕" && Args.c3.label == "⭕") won["⭕"] = true
            if (Args.a3.label == "⭕" && Args.b2.label == "⭕" && Args.c1.label == "⭕") won["⭕"] = true
            if (Args.a1.label == "⭕" && Args.a2.label == "⭕" && Args.a3.label == "⭕") won["⭕"] = true
            if (Args.b1.label == "⭕" && Args.b2.label == "⭕" && Args.b3.label == "⭕") won["⭕"] = true
            if (Args.c1.label == "⭕" && Args.c2.label == "⭕" && Args.c3.label == "⭕") won["⭕"] = true
            if (won["⭕"] != false) return m.edit('⭕ won!')
            if (Args.a1.label == "❌" && Args.b1.label == "❌" && Args.c1.label == "❌") won["❌"] = true
            if (Args.a2.label == "❌" && Args.b2.label == "❌" && Args.c2.label == "❌") won["❌"] = true
            if (Args.a3.label == "❌" && Args.b3.label == "❌" && Args.c3.label == "❌") won["❌"] = true
            if (Args.a1.label == "❌" && Args.b2.label == "❌" && Args.c3.label == "❌") won["❌"] = true
            if (Args.a3.label == "❌" && Args.b2.label == "❌" && Args.c1.label == "❌") won["❌"] = true
            if (Args.a1.label == "❌" && Args.a2.label == "❌" && Args.a3.label == "❌") won["❌"] = true
            if (Args.b1.label == "❌" && Args.b2.label == "❌" && Args.b3.label == "❌") won["❌"] = true
            if (Args.c1.label == "❌" && Args.c2.label == "❌" && Args.c3.label == "❌") won["❌"] = true
            if (won["❌"] != false) return m.edit('❌ won!')
            let a1 = new MessageButton()
                .setStyle(Args.a1.style)
                .setLabel(Args.a1.label)
                .setID('a1')
                .setDisabled(Args.a1.disabled);
            let a2 = new MessageButton()
                .setStyle(Args.a2.style)
                .setLabel(Args.a2.label)
                .setID('a2')
                .setDisabled(Args.a2.disabled);
            let a3 = new MessageButton()
                .setStyle(Args.a3.style)
                .setLabel(Args.a3.label)
                .setID('a3')
                .setDisabled(Args.a3.disabled);
            let b1 = new MessageButton()
                .setStyle(Args.b1.style)
                .setLabel(Args.b1.label)
                .setID('b1')
                .setDisabled(Args.b1.disabled);
            let b2 = new MessageButton()
                .setStyle(Args.b2.style)
                .setLabel(Args.b2.label)
                .setID('b2')
                .setDisabled(Args.b2.disabled);
            let b3 = new MessageButton()
                .setStyle(Args.b3.style)
                .setLabel(Args.b3.label)
                .setID('b3')
                .setDisabled(Args.b3.disabled);
            let c1 = new MessageButton()
                .setStyle(Args.c1.style)
                .setLabel(Args.c1.label)
                .setID('c1')
                .setDisabled(Args.c1.disabled);
            let c2 = new MessageButton()
                .setStyle(Args.c2.style)
                .setLabel(Args.c2.label)
                .setID('c2')
                .setDisabled(Args.c2.disabled);
            let c3 = new MessageButton()
                .setStyle(Args.c3.style)
                .setLabel(Args.c3.label)
                .setID('c3')
                .setDisabled(Args.c3.disabled);
            let a = new MessageActionRow()
                .addComponents([a1, a2, a3])
            let b = new MessageActionRow()
                .addComponents([b1, b2, b3])
            let c = new MessageActionRow()
                .addComponents([c1, c2, c3])
            let buttons = { components: [a, b, c] }
            m.edit(`**TicTacToe** | <@!${Args.userid}>'s turn (${Args.user == 0 ? "⭕" : "❌"})`, buttons)
            const filter = (button) => button.clicker.user.id === Args.userid;
            const collector = m.createButtonCollector(filter, { max: 1, time: 30000 });

            collector.on('collect', b => {
                if (Args.user == 0) {
                    Args.user = 1
                    Args[b.id] = {
                        style: "green",
                        label: "⭕",
                        disabled: true
                    }
                } else {
                    Args.user = 0
                    Args[b.id] = {
                        style: "red",
                        label: "❌",
                        disabled: true
                    }
                }
                b.reply.defer()
                const map = (obj, fun) =>
                    Object.entries(obj).reduce(
                        (prev, [key, value]) => ({
                            ...prev,
                            [key]: fun(key, value)
                        }),
                        {}
                    );
                const objectFilter = (obj, predicate) =>
                    Object.keys(obj)
                        .filter(key => predicate(obj[key]))
                        .reduce((res, key) => (res[key] = obj[key], res), {});
                let Brgs = objectFilter(map(Args, (_, fruit) => fruit.label == "➖"), num => num == true);
                if (Object.keys(Brgs).length == 0) return m.edit('It\'s a tie!')
                tictactoe(m)
            });
            collector.on('end', collected => {
                if (collected.size == 0) m.edit(`<@!${Args.userid}> didn\'t react in time! (30s)`)
            });
        }
  }
})


//emojis converter
const { parse } = require("twemoji-parser");
//const Color = `#ffffff`;

client.on("message", message => {
  if(message.content.toLowerCase().startsWith(prefix + "cemoji")){
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
   const args = message.content.split(" ").splice(1).join(" ")
   const emoji = args;
    if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      
      const Added = new MessageEmbed()
        .setTitle(`Emoji Converter`)
        .setColor(`RANDOM`)
        .setImage(Link);
        
        const btn = new disbut.MessageButton()
        .setStyle("url")
        .setURL(Link)
        .setLabel("Emoji Link")
        .setEmoji("🔗")

        const array = new disbut.MessageActionRow()
        .addComponents([btn, invite])
      return message.channel.send(Added, array);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Please Give Me A Valid Emoji!`);
      message.channel.send(
        `You Can Use Normal Emoji Without Adding In Server!`)
    }
  }
})

//rps
const {rps} = require('discord-rps')
client.on('message', async message => {
    if(message.content.toLowerCase() === prefix + "rps"){
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
      if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
rps(message)
message.channel.send("this is still a `BETA` feature")
    }
})

//description
client.on("message", message => {
  if(message.content.startsWith(prefix + "description" || prefix + "dc" )){
  if(message.author.bot) return;
  if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    let args = message.content
   message.channel.setTopic(args[0])
   message.channel.send({embed: null, text: "Channel Dc Set!"})
  }
})

//akinator
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const isPlaying = new Set();
const { Aki } = require("aki-api");

client
  .on("message", async message => {
    if (message.author.bot || !message.guild) return;

    if (!message.content.startsWith(prefix + "aki")) return;

    if (isPlaying.has(message.author.id)) {
      return message.channel.send(":x: The game already started..");
    }

    isPlaying.add(message.author.id);
  
    const aki = new Aki({ region: "en" }); // Full languages list at: https://github.com/jgoralcz/aki-api
    

    await aki.start();

    const msg = await message.channel.send(new MessageEmbed()
      .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
      .setColor("RANDOM")
      .setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `${an} | ${emojis[i]}`).join("\n")}`));

    for (const emoji of emojis) await msg.react(emoji);

    const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
      time: 60000 * 6
    });

    collector
      .on("end", () => isPlaying.delete(message.author.id))
      .on("collect", async ({
        emoji,
        users
      }) => {
        users.remove(message.author).catch(() => null);

        if (emoji.name == "❌") return collector.stop();

        await aki.step(emojis.indexOf(emoji.name));

        if (aki.progress >= 70 || aki.currentStep >= 78) {

          await aki.win();

          collector.stop();

          message.channel.send(new MessageEmbed()
            .setTitle("Is this your character?")
            .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`)
            .setImage(aki.answers[0].absolute_picture_path)
            .setColor("RANDOM"));

          const filter = m => /(yes|no|y|n)/i.test(m.content) && m.author.id == message.author.id;

          message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ["time"]
            })
            .then(collected => {
              const isWinner = /yes|y/i.test(collected.first().content);
              message.channel.send(new MessageEmbed()
                .setTitle(isWinner ? "Great! Guessed right one more time." : "Uh. you win")
                .setColor("RANDOM")
                .setDescription("I love playing with you!"));
            }).catch(() => null);
        
        } else {
          msg.edit(new MessageEmbed()
            .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
            .setColor("RANDOM")
            .setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `${an} | ${emojis[i]}`).join("\n")}`));
        }
      });
  })

//hax command
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(`${prefix}hack`)){
    const hacked = message.mentions.users.first();
    const user = message.mentions.users.first();
    if(user == client.users.cache.get(message.author.id))
    {
      return message.channel.send(" ok, You are hacked Pick someone else")
    }
            function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

if(!user)
{
  return message.channel.send("Who to hack? Please Mention him");
}
const prompt = await message.channel.send(`Hacking ${user ? hacked.username : hacked} now...`);
    
   await wait(2700);
     await  prompt.edit('Finding discord login...');
     await wait(2700);
     await  prompt.edit(`Found:\n**Email**: \`${hacked.username}***@gmail.com\`\n**Password**: \`*******\``);
     await  wait(3700);
     await  prompt.edit('Fetching dms');
     await  wait(3700);
     await prompt.edit('Listing most common words...');
     await  wait(2700);
     await  prompt.edit(`Injecting virus into discriminator #${hacked.discriminator}`);
    await  wait(3700);
     await  prompt.edit('Virus injected');
     await  wait(3700);
    
   await prompt.edit('Finding IP address');
    await wait(5000);
   await  prompt.edit('Spamming email...');
   await wait(6700);
   await  prompt.edit('Selling data to facebook...');
  await   wait(3700);
  let embed = new Discord.MessageEmbed()
  .setDescription(`A Dangerous and very ORIGINAL HACKING of ${user ? hacked.username : hacked} is just completed`)
  .setColor("RANDOM")
  .setImage("https://media.giphy.com/media/lp3GUtG2waC88/giphy.gif?cid=790b76116b9363f25781ae33ef44da25238662dcb72fde7b&rid=giphy.gif");
  await prompt.delete()
   await  message.channel.send(embed);
    
  }
});

//8ball
client.on("message", async message => {
 if(message.content.toLowerCase().startsWith(`${prefix}8ball`)){
   const args  = message.content.split(" ").splice(1).join(" ");
   if (!args.length) return message.channel.send({embed: {
         color: 16734039,
         description: "Thee needeth to asketh f'r a f'rtune"
         }})


  var fortunes = ["Yes.", "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.",
  "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", 
  "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", 
  "My sources say no.", "Outlook not so good...", "Very doubtful.",];  
  
  await message.channel.send({embed: {
         color: 3447003,
         description: fortunes[Math.floor(Math.random()*fortunes.length)]
         }})

}
})

//deepfry

client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(`${prefix}deepfry`)){
  let args = message.content.split(" ").splice(1).join(" ");
  const user = message.mentions.members.first() || message.member || message.guild.users.cache.get(u => u.id === args[0])
        const avatar = user.user.displayAvatarURL({ dynamic: false, size: 4096})
        fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`)
        .then((res) =>  res.json())
        .then((data) => {
            let embed = new MessageEmbed()
            .setTitle("Deepfried!")
            .setImage(data.message)
            .setColor("RANDOM")
            .setTimestamp()
            message.channel.send(embed)
        
  })
  }
})

//translator
const { paginate } = require("./page.js");
const translate = require("@iamtraction/google-translate")

client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(`${prefix}translate`)){
    const args = message.content.split(" ").splice(1)
    const translateQuery = args.join(" ");
    if (!translateQuery) return message.lineReply("Please specify a text to translate.");

    const translated = await translate(translateQuery, { to: 'en' });
    const embedEN = new MessageEmbed()
        .setDescription(`**ENGLISH**\n\n**Translation**: ${translated.text}`)
        .setColor(`2f3136`);

    const translatedRU = await translate(translateQuery, { to: 'ru' });
    const embedRU = new MessageEmbed()
        .setDescription(`**RUSSIAN**\n\n**Translation**: ${translatedRU.text}`)
        .setColor(`2f3136`);

    const translatedID = await translate(translateQuery, { to: 'id' });
    const embedID = new MessageEmbed()
        .setDescription(`**INDONESIAN**\n\n**Translation**:  ${translatedID.text}`)
        .setColor(`2f3136`);

    const translatedTH = await translate(translateQuery, { to: 'th' });
    const embedTH = new MessageEmbed()
        .setDescription(`**THAI**\n\n**Translation**: ${translatedTH.text}`)
        .setColor(`2f3136`);

    const translatedFR = await translate(translateQuery, { to: 'fr' });
    const embedFR = new MessageEmbed()
        .setDescription(`**FRENCH**\n\n**Translation**: ${translatedFR.text}`)
        .setColor(`2f3136`);

    const translatedJA = await translate(translateQuery, { to: 'ja' });
    const embedJA = new MessageEmbed()
        .setDescription(`**JAPANESE**\n\n**Translation**: ${translatedJA.text}`)
        .setColor(`2f3136`);

    const translatedKO = await translate(translateQuery, { to: 'ko' });
    const embedKO = new MessageEmbed()
        .setDescription(`**KOREAN**\n\n**Translation**: ${translatedKO.text}`)
        .setColor(`2f3136`);
    
    const translatedTR = await translate(translateQuery, { to: 'tr' });
    const embedTR = new MessageEmbed()
        .setDescription(`**TURKISH**\n\n**Translation**: ${translatedTR.text}`)
        .setColor(`2f3136`);

    const translatedAR = await translate(translateQuery, { to: 'ar' });
    const embedAR = new MessageEmbed()
        .setDescription(`**ARABIC**\n\n**Translation**: ${translatedAR.text}`)
        .setColor(`2f3136`);

    const translatedHI = await translate(translateQuery, { to: 'hi' });
    const embedHI = new MessageEmbed()
        .setDescription(`**HINDI**\n\n**Translation**: ${translatedHI.text}`)
        .setColor(`2f3136`);

    const translatedDE = await translate(translateQuery, { to: 'de' });
    const embedDE = new MessageEmbed()
        .setDescription(`**GERMAN**\n\n**Translation**: ${translatedDE.text}`)
        .setColor(`2f3136`);

    const translatedMS = await translate(translateQuery, { to: 'ms' });
    const embedMS = new MessageEmbed()
        .setDescription(`**MALAY**\n\n**Translation**: ${translatedMS.text}`)
        .setColor(`2f3136`);

    const translatedIT = await translate(translateQuery, { to: 'it' });
    const embedIT = new MessageEmbed()
        .setDescription(`**ITALIAN**\n\n**Translation**: ${translatedIT.text}`)
        .setColor(`2f3136`);

    const translatedTL = await translate(translateQuery, { to: 'tl' });
    const embedTL = new MessageEmbed()
        .setDescription(`**FILIPINO**\n\n**Translation**: ${translatedTL.text}`)
        .setColor(`2f3136`);
    
    const pages = [
        embedEN,
        embedJA,
        embedKO,
        embedFR,
        embedIT,
        embedDE,
        embedRU,
        embedTR,
        embedTH,
        embedID,
        embedMS,
        embedTL,
        embedHI,
        embedAR
    ]

   
    //paginate(client, message, pages)
    Page.createPages(client.interaction, message, pages, 60 * 1000, "green", "902050017949413418", "902049708783050753", "❌")

  }
})

//client.on('clickButton', (button) => {
//  Page.buttonInteractions(button, client.interaction);
//});

//var voted = false;

//suggestion using buttons...
/*
client.on("message", message => {
  if(!message.guild|| message.author.bot) return;
  if(message.channel.id == "900011582111760385"){
    let args = message.content.split(" ").join(" ");
    const embed = new Discord.MessageEmbed()
    .setAuthor("Suggestion")
    .setColor("random")
    .setDescription(`${args}\n\n Upvotes: ${upvotes}\n Downvotes: ${downvotes}`)
    .setFooter("Vote by clicking buttons...");
    const up = new disbut.MessageButton()
    .setStyle("green")
    .setID("upvote")
    .setEmoji("900340655887376455");
    //.setLabel("Upvote");
    const down = new disbut.MessageButton()
    .setStyle("red")
    .setID("downvote")
    .setEmoji("900340775383089183");
    const suggest = new disbut.MessageActionRow()
    .addComponents([up, down])
    message.delete()
    if(upvotes == ""){
      upvotes = 0 
    }
    message.channel.send(embed, suggest);
    client.on("clickButton", btn => {
  if(btn.id == "upvote"){
    if(voted == false){
      upvotes = upvotes + 1;
      btn.reply.send("Alr mate, your vote counts...", true)
      voted = true
      db.set("voted", voted)
      
      db.set("upvotes", upvotes)
    } else btn.reply.send("You can only vote once bruh", true);
  } else if (btn.id == "downvote"){
    if(voted = false){
      downvotes = downvotes + 1;
      btn.reply.send("Alr mate, your vote counts...", true)
      voted = true
      db.set("downvotes", downvotes)
    } else btn.reply.send("You can only vote once bruh", true);
  }
})
  }
}) */




//mute
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(`${prefix}mute`)){
    if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
   let args = message.content.split(" ")
   if (!message.member.hasPermission(["MANAGE_SERVER"]))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
    
    let Member =
      message.mentions.members.first() ||message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Please Mention A User!`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted");
     
    if (!Role) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#514f48",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
    }
    

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`Member Is Already Muted!`);
    } else if (Member.user.id == message.author.id) {
    return message.channel.send(`*${message.author.username} muted ${Member.user.username}... but why? <:CDR_ThinkPoint:903645339020566529> ...*`)

     
    }

    let Reason = args.slice(1).join(" ") || "no reason";

    let Embed = new MessageEmbed()
      .setColor("#00FFFF")
      .setTitle(`Member Muted!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
      .addField(`Muted Member`, `${Member.user.tag} (${Member.user.id})`)
      .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Role "Muted" was not found, so I created for you, please run the cmd again`);
    }
  }
});

//DM a user using the bot
client.on("message", message => {
  if(message.content.toLowerCase().startsWith(prefix + "dm")){
    if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
   let args = message.content.split(" ");
    
if(!message.member.hasPermission("MANAGE_MESSAGES")) return;


   let user = message.mentions.members.first();
  if (!user) return message.channel.send(`You did not mention a user, or you gave an invalid id`
        )
  if (!args.slice(1).join(" ")) return message.channel.send("You did not specify your message");
      user.user.send(args.slice(2).join(" "))
        .catch(() => message.channel.send("That user could not be DMed!"))
        .then(() => message.channel.send(`Sent a message to **__${user.user.tag}__**`));
  }
  
})

//unmute
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith(`${prefix}unmute`)){
    if(message.author.bot) return;
   if(message.channel.type == "dm") return message.channel.send("DM commands are not supported");
    if(message.author.id == "761438136277794817"){
    return message.channel.send("You are **__BANNED__** from using the bot, if you think this is a mistake, Please **__CONTACT US.__**");
  }
    let args = message.content.split("");
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command!`
      );
    
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Please Mention A User!`);
    
    if(Member.id == message.author.id){
    return message.channel.send(`*${message.author.username} unmuted ${Member.user.username}... but why? <:CDR_ThinkPoint:903645339020566529> ...*`)
    }

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `There Is No Mute Role, So Member Is Not Muted Anymore!`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`Member Is Already Unmuted!`);
    }

    let Embed = new MessageEmbed()
      .setColor("#00FFFF")
      .setTitle(`Member Unmuted!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
      .addField(`Unmuted Member`, `${Member.user.tag} (${Member.user.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Something Went Wrong, Try Again Later!`);
    }

    //End
  }
})


//Login
client.login(token);
