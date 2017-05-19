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
var data_file;
var commands;
var embed;

fs.readFile('data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        data_file = JSON.parse(data);
    }
});
fs.readFile('commands.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        commands = JSON.parse(data);
    }
});


bot.on("message", msg => {
    if (msg.content.startsWith("::")) {

        var command = msg.content.substring(2, msg.content.length);
        embed = new Discord.RichEmbed();

        if (typeof data_file[command] !== 'undefined') {
            embed.setTitle(msg.author.username);
            console.log(data_file[command].type);
            switch (data_file[command].type) {
                case 'image':
                    embed.setImage(data_file[command].data);
                    break;
                case 'text':
                    embed.setDescription(data_file[command].data);
                    break;
            }


            msg.channel.send({
                embed
            });

        }
        //        else {
        //            embed.addField('Not found', "¯\\_(ツ)_/¯");
        //            msg.channel.send({
        //                embed
        //            });
        //        }

        var reg_command = /\w+/; //permet de recupérer le premier mot

        if (reg_command.test(command)) {
            action = command.match(reg_command);
            switch (action[0]) {
                case "add":
                    command = command.match(/add\s(.+)\s(.+)/);
                    if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(command[1])) {
                        data_file[command[2]] = {
                            "data": command[1],
                            "type": "image"
                        };
                    } else {
                        data_file[command[2]] = {
                            "data": command[1],
                            "type": "text"
                        };
                    }
                    var json = JSON.stringify(data_file);
                    fs.writeFile('data.json', json, 'utf8');
                    msg.reply('add complete!');
                    break;
                case "delete":
                    command = command.match(/delete\s(\w+)/);
                    delete data_file[command[1]];
                    var json = JSON.stringify(data_file);
                    fs.writeFile('data.json', json, 'utf8');
                    msg.reply('delete complete!');
                    break;
                case "show_all":
                    embed.setTitle("Commandes possibles pour smiley/images :");
                    var keys = "";
                    for(key in data_file)
                        {
                            keys = keys+"\n-"+key;
                        }
                    embed.setDescription(keys);
                    msg.channel.send({
                embed
            });
                    

            }
            //TODO gérer le cas des espaces blancs dans les data, faire en sorte de vérifier l'url pour classer entre text et image.

        }

        //TODO faire les profils éditables
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

//chaine.replace(/ /g,"");//pour remplacer les caractères blancs
