// Coding done by ArNz8o8

const Discord = require('discord.js')
const fetch = require('node-fetch')
const bot = new Discord.Client()
const token = 'DISCORD TOKEN'
bot.on('ready', () => {
    bot.user.setActivity("World of fokkin Warcraft", { type: "PLAYING" });
    console.log ('ArNzBot_1 logged in')
    })

const prefix = "!";
bot.on('message', async (msg) => {
  if(msg.content[0] !== prefix) {
    console.log('Geen uitroepteken gebruikt, ignore much')
    return
  }

  const args = msg.content.slice(prefix.length).trim().split(' ')
  console.log(args)
  const command = args.shift().toLowerCase()
  console.log(command)

  if(command === '8o8') {
    msg.react("🤍")
    msg.reply('make it complete with a 3o3')
  }

  if(command === 'wis') {
    let num = 2;
    if (args[0]) {
      num = parseInt(args[0]) + 1;
    }
    console.log(num);
    msg.channel.bulkDelete(num);
    msg.channel.send(`I haz like removed ${args[0]} line(s) for you.. clean af.`);
  }

  if(command === 'weer') {
    let geefWeer = async () => {
      let result = await fetch ('http://api.openweathermap.org/data/2.5/weather?q=den%20haag,nl&units=metric&APPID=WEATHER_API_TOKEN')
      let json = await result.json()
      return json
    }
      let weer = await geefWeer()

      msg.reply(`le current weather: ${weer.weather[0].main} with a temperature at ${weer.main.temp} degrees, but feeling like ${weer.main.feels_like} degrees.`)
    }
   })

bot.login(token)
