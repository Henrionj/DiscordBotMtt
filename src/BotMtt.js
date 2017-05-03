var Discord = require("discord.js");
var bot = new Discord.Client();

/*bot.on('voiceStateUpdate', (oldMember, newMember) => {
  newMember.client.sendMessage(244530486263676928, "zbleh");
  console.log(newMember.client);
  console.log('je change de channel');
});*/

bot.on("message", msg => {
  if (msg.content.startsWith("/cute")) {
    msg.delete();
    msg.channel.sendFile("https://cdn.discordapp.com/attachments/240561455819128832/241257595237564416/a78.gif");
    }
  if (msg.content.startsWith("/zelote")) {
    msg.delete();
    msg.channel.sendMessage("(╬ ಠ益ಠ)");
    }
});
bot.on('ready', () => {
  console.log('I am ready!');
});
bot.login("MjQ1OTU2OTQ2NTk3NzczMzEz.C-ujZA.ihTIyoAKtlpM3_lleVbD6aB9zKk");
