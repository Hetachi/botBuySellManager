const token = require('./components/configs/botToken')
const config = require('./components/configs/config')
const translation = require('./components/configs/translation')

var Discord = require('discord.io');
var bot = new Discord.Client({
    token: token,
    autorun: true
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    const messageID = event.d.id;

    if((!message.includes(translation.buy) || !message.includes(translation.sell)) && channelID === config.allowedChannel) {
      bot.deleteMessage({
        channelID: channelID,
        messageID: messageID
      })
      bot.sendMessage({
        to: user,
        message: "The text channel you are trying to write in is only for "+ translation.buy +" or " + translation.sell
      })
    }
})
