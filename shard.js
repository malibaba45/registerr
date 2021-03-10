const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client()
const express = require('express');
const app = express();
const http = require('http');
const scarew = new Discord.ShardingManager('./index.js', { // Buraya botunuzun ana dosyasını yazın sizde değişik görünebilir.(main.js index.js bot.js vs)
    totalShards: 'auto',
    token: "procces.env.token"// Buraya botunuzun tokenini yapıştırın
});

scarew.spawn(); 

scarew.on('launch', shard => {
  console.log(`**${shard.id}** ID shard started.`)
});

setTimeout(() => {
    scarew.broadcastEval("process.exit()");
}, 21600000);