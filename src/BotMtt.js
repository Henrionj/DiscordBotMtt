/*
 *
 *            Mettaton Bot ヽ༼ ಠ益ಠ ༽ﾉ
 *
 *            v1.0
 *
 */


const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "MjQ1OTU2OTQ2NTk3NzczMzEz.C-ujZA.ihTIyoAKtlpM3_lleVbD6aB9zKk";
var fs = require('fs');
var image_commands;
var commands;

//var obj = {
//   table: []
//};
//obj.table.push({id: 1, square:2});
//var json = JSON.stringify(obj);
//fs.writeFile('myjsonfile.json', json, 'utf8');

//fs.readFile('image.json', 'utf8', function readFileCallback(err, data){
//    if (err){
//        console.log(err);
//    } else {
//    commands = JSON.parse(data); //now it an object
//    commands.commands = {test : 'meh'};
//    console.log(commands);
//   // obj.table.push({"profile_command":"show"}); //add some data
////    json = JSON.stringify(commands); //convert it back to json
////    fs.writeFile('commands.json', json, 'utf8'); // write it back 
//}});

//On charge les commandes json dans la variable image_commands
fs.readFile('image.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    image_commands = JSON.parse(data);
}});
fs.readFile('commands.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    commands = JSON.parse(data);
}});


bot.on("message", msg => {
  if (msg.content.startsWith("::")) {
    var command = msg.content.substring(2,msg.content.length);
      if(typeof image_commands[command]!=='undefined')
        {
            msg.delete();
            msg.channel.sendFile(image_commands[command]);
        }
      
      //TODO utiliser des regex pour les commandes add/delete etc?
      
//    switch(command)
//    {
//      case "cute":
//        msg.delete();
//        msg.channel.sendFile("../res/cute_undyne.gif");
//        break;
//      case "zelote":
//        msg.delete();
//        msg.channel.send("(╬ ಠ益ಠ)");
//        break;
//      case "profile":
//        msg.delete();
//        var profile = new Discord.RichEmbed();
//        profile.setTitle(msg.author.username+" Profile");
//        profile.setThumbnail(msg.author.avatarURL);
//        profile.addBlankField();
//        profile.addField("test","ヽ༼ ಠ益ಠ ༽ﾉ");
//        profile.setFooter(msg.author.tag);
//        msg.channel.sendEmbed(profile);
//        break;
//      case "edit_profile":
//        msg.delete();
//        break;
//    }

      }
    });
    bot.on('ready', () => {
      console.log('I am ready!');
    });
    bot.login(token);
