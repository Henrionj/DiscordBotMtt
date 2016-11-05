var Discord = require("discord.js");
var bot = new Discord.Client();


bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("TokenBot");
