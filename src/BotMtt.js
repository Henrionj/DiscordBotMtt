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
var current_demand;

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
//bot.on("message", msg => {
//    if (msg.content.startsWith("test")) {
//        msg.member.roles.forEach(function(role){
//            msg.channel.send("nom du rôle : "+role.name);
//        });
//    
//    }});

bot.on("message", msg => {
    if (msg.content.startsWith("::")) {

        var command = msg.content.substring(2, msg.content.length);
        embed = new Discord.RichEmbed();

        //On test d'abord si cela correspond à une image.
        if (typeof data_file.image[command] !== 'undefined') {
            embed.setTitle(msg.author.username);
            switch (data_file.image[command].type) {
                case 'image':
                    embed.setImage(data_file.image[command].data);
                    break;
                case 'text':
                    embed.setDescription(data_file.image[command].data);
                    break;
            }


            msg.channel.send({
                embed
            });

        }

        //Sinon on teste si cela ressemble à une commande.
        var reg_command = /\w+/; //permet de recupérer le premier mot
        if (reg_command.test(command)) {
            action = command.match(reg_command);
            switch (action[0]) {
                case "add":
                    command = command.match(/add\s(.+)\s(.+)/);
                    if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(command[1])) {
                        data_file.image[command[2]] = {
                            "data": command[1],
                            "type": "image"
                        };
                    } else {
                        data_file.image[command[2]] = {
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
                    delete data_file.image[command[1]];
                    var json = JSON.stringify(data_file);
                    fs.writeFile('data.json', json, 'utf8');
                    msg.reply('delete complete!');
                    break;
                case "show_all":
                    embed.setTitle("Commandes possibles pour smiley/images :");
                    var keys = "";
                    for (key in data_file.image) {
                        keys = keys + "\n-" + key;
                    }
                    embed.setDescription(keys);
                    msg.channel.send({
                        embed
                    });
                    break;
                case "help":
                    embed.setTitle("    Commandes du bot : ");
                    embed.addBlankField();
                    for (type_command in commands) {
                        embed.addField(type_command.toUpperCase(), "-----------------------------");
                        current_type_command = commands[type_command];
                        for (command in current_type_command) {
                            if (current_type_command[command] != "") {
                                embed.addField(command, current_type_command[command]);

                            } else {
                                embed.addField(command, "Aucune description.");
                            }
                        }
                    }
                    msg.channel.send({
                        embed
                    });
                    break;
                case "spoil":
                    msg.delete();
                    spoiler = command.match(/spoil\s(.+)-t/);
                    titre = command.match(/-t(.+)/);
                    if (titre != null) {
                        embed.setTitle(titre[1]);
                        embed.setDescription('add a reaction 👌 to see the spoiler.');
                        msg.channel.send({
                            embed
                        }).then(function (msg) {
                            msg.react("👌");
                            data_file.spoil = {
                                "id": msg.id,
                                "data": spoiler[1]
                            }
                            var json = JSON.stringify(data_file);
                            fs.writeFile('data.json', json, 'utf8');
                        }).catch(function () {});
                    } else {
                        embed.setTitle("Bad command :frowning:, please try this : ")
                        embed.addField("spoiler", helpCommand("other", "spoil"));
                        msg.channel.send({
                            embed
                        });
                    }

                    break;


            }
            //TODO gérer le cas des espaces blancs dans les data, faire en sorte de vérifier l'url pour classer entre text et image.

        } else {
            console.log("pas de commande.");
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

    } else {
        var reg_command = /::(\w+)/;
        if (reg_command.test(msg.content)) {
            var command = msg.content.match(reg_command)[1];
            var smiley = data_file.image[command];
            msg.channel.send(msg.content.replace(reg_command, smiley['data']));
        }
    }
});

bot.on("messageReactionAdd", (msgReaction, usr) => {
    if (!usr.bot) {

        if (data_file.spoil["id"] == msgReaction.message.id && msgReaction.emoji.toString() == "👌") {

            if (usr.dmChannel == null) {

                usr.createDM().then(function (channel) {

                    channel.send(data_file.spoil['data']);

                }).catch(function (error) {
                    console.log(error);
                });
            } else {

                usr.send(data_file.spoil['data']);
            }


        }
    }
});

function helpCommand(command_theme, command) {
    command_description = commands[command_theme];
    return command_description[command];
}

bot.on('ready', () => {
    console.log('I am ready!');
});
bot.login(token);

//chaine.replace(/ /g,"");//pour remplacer les caractères blancs
