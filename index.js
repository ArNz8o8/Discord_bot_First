// Coding done by ArNz8o8
// Echelon Discord bot - 23 dec 2020 0.1
// Echolon Discord bot - 24 dec 2020 0.2
// Echolon Discord bot - 25 dec 2020 0.3 (Added API query to Weather)

const Discord = require('discord.js')
const fetch = require('node-fetch')
const axios = require('axios')
const bot = new Discord.Client()
const token = 'DISCORD TOKEN'
bot.on('ready', () => {
    // bot.user.setActivity("World of fokkin Warcraft", { type: "PLAYING" });

    bot.user.setStatus('idle')
    
    const arnz_state = [
      "World of Warcraft",
      "!info",
      "mixcloud.com/ArNz8o8",
      "World of fokkin Warcraft",
      "just because I can"
]
    setInterval(() => {
      const index = Math.floor(Math.random() * (arnz_state.length - 1) + 1);
      bot.user.setActivity(arnz_state[index]);
  }, 15000);
      console.log ('Echelon logged in, taking names and kicking ass')
    });
    
// Server Stats - First run

let stats = {
  serverID: '787809339976056863',
  total: "791677442959212554",
  member: "791677507614801930",
  bots: "791677577365291039"
}

bot.on('guildMemberAdd', member => {
  if(member.guild.id !== stats.serverID) return;
  bot.channels.cache.get(stats.total).setName(`Total users: ${member.guild.memberCount}`);
  bot.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  bot.channels.cache.get(stats.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

bot.on('guildMemberRemove', member => {
  if(member.guild.id !== stats.serverID) return;
  bot.channels.cache.get(stats.total).setName(`Total users: ${member.guild.memberCount}`);
  bot.channels.cache.get(stats.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  bot.channels.cache.get(stats.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})
    
// This is just because 8o83o3
    
    bot.on("message", (message) => {
    if (message.content.includes("8o8" && "3o3")) {
      message.react("🤍");
    }
      else if (message.content === '!guild') {
          message.channel.send('Guild name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
        } else if (message.content === '!whoami') {
          message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
        }
  });

// Embed options - Weather 

const ArNzEmbed = (
  temp,
  maxTemp,
  feelzTemp,
  pressure,
  humidity,
  wind,
  cloudness,
  stad,
  icon
) =>
  new Discord.MessageEmbed()
    .setColor('#FF8315')
    .setTitle(`It is ${temp}\u00B0 C in ${stad} like, right now`)
    .addField(`Maximum temp:`, `${maxTemp}\u00B0 C`, true)
    .addField(`Feelz like:`, `${feelzTemp}\u00B0 C`, true)
    // .addField(`Humidity:`, `${humidity} %`, true)
    .addField(`Wind Speed:`, `${wind} m/s`, true)
    // .addField(`Pressure:`, `${pressure} hpa`, true)
    .addField(`Overall weather:`, `${cloudness}`, true)
    .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
    .setFooter('Echelon weather coded by ArNz8o8 🔥');
    
// Actual program stuff

    const prefix = "!";
bot.on('message', async (msg) => {
  if(msg.content[0] !== prefix) {
    // console.log('Geen uitroepteken gebruikt, ignore much')
    return
  }

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  console.log(args)
  const command = args.shift().toLowerCase()
  console.log(command)

// The TR808 is coming 

  if(command === '8o8') {
    msg.react("🤍")
    msg.reply('make it complete with a 3o3')
  }
if(command === 'version') {
   msg.reply ('sending the secret stuff via DM')
   msg.member.send('this bot is made by 8o83o3Designz, version 0.3a-alpha.. nothing much, but its something')

  }
    if(command === 'info') {
      const infoEmbed = new Discord.MessageEmbed()
      .setColor('#FF8315')
      .setTitle("Echelon info")
      .setDescription("Start every command with the prefix ! okay, easy")
      .setThumbnail('https://i.imgur.com/mhQeaaX.png')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Commands I know, and stick with me..', value: '\u200B'},
        { name: 'Version', value: 'current version of le bot', inline: true },
        { name: 'Erase', value: 'delete X lines', inline: true },
        { name: 'Weather', value: 'only The Hague atm', inline: true },
        { name: '8o8', value: 'it just is', inline: true },
        { name: 'Guild', value: 'just useless info', inline: true },
        { name: 'Whoami', value: 'in case you forgot', inline: true },
        { name: 'Kick and ban', value: 'but only if you are allowed', inline: true },
        { name: '\u200B', value: '\u200B' },
      )
      .setFooter('Brought to you by ArNz8o8 🔥', 'https://i.imgur.com/mhQeaaX.png');

      msg.reply ('sliding into your DM like')
      msg.member.send(infoEmbed)
      }

  if(command === 'erase') {
    let num = 2;
    if (args[0]) {
      num = parseInt(args[0]) + 1;
    }
    console.log(num);
    msg.channel.bulkDelete(num);
    msg.channel.send(`I haz like removed ${args[0]} line(s) for you.. clean af 🦄`);
  }
  
  if(command === 'weather') {
  
    axios
    
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${args.join(" ")}&units=metric&APPID=WEATHER_API_TOKEN`
          )
          .then(response => {
            let apiData = response;
            let currentTemp = Math.ceil(apiData.data.main.temp)
            let maxTemp = apiData.data.main.temp_max;
            let feelzTemp = apiData.data.main.feels_like;
            let humidity = apiData.data.main.humidity;
            let wind = apiData.data.wind.speed;
            let icon = apiData.data.weather[0].icon
            let country = apiData.data.sys.country
            let stad = args.join(" ")
            let pressure = apiData.data.main.pressure;
            let cloudness = apiData.data.weather[0].description;
            msg.channel.send(ArNzEmbed(currentTemp, maxTemp, feelzTemp, pressure, humidity, wind, cloudness, stad, icon));
        }).catch(err => {
            msg.channel.send(`Sorry dawg, city not found.. or did you not like enter it? Please use: !weather <cityname>`)
        })
  }
  
  // KICK ende BAN stuff
    
    if (command === 'kick') {
      if (!msg.member.hasPermission('KICK_MEMBERS'))
        return msg.reply('you are not allowed to do that..');
      if (args.length === 0)
        return msg.reply('I do need an ID to do that.. so like, right click on le name and copy id');
      const member = msg.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick('because you just suck')
          .then((member) => msg.channel.send(`${member} was kicked.`))
          .catch((err) => msg.channel.send('wh00pz, I cannot kick that user'));
      } else {
        msg.channel.send('I treally have no idea who you are talking about, you l4m3r.. did not use the ID?');
      }
    } else if (command === 'ban') {
      if (!msg.member.hasPermission('BAN_MEMBERS'))
        return msg.reply("you are not allowed to do that..");
      if (args.length === 0) return msg.reply("I do need an ID to do that.. so like, right click on le name and copy id");
      try {
        const user = await msg.guild.members.ban(args[0]);
        msg.channel.send('Noice, that loser was banned successfully, bye Felicia');
      } catch (err) {
        console.log(err);
        msg.channel.send('Cannot execute. Most likely I haz no have permissions or you know, the user was not found');
      }
    }
})

bot.login(token)
