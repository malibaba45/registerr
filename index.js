const Discord = require("discord.js");
const keep_alive = require('./keep_alive.js')
require("events").EventEmitter.defaultMaxListeners = 30000;
  require("events").defaultMaxListeners = 30000;
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");
var Jimp = require('jimp');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};






client.on("ready", () => {//splashen
  client.user.setPresence({
    game: { name: `Laune`, type: "LISTENING" },
    status: "ready"
  });
});



// İSİM YAŞ İSİM DEĞİŞTİRME 

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {//splashen
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.roles.add(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.roles.add(kayıtsızROL)
})

/// kayıtsız rolü son
//splashen



//splashen

// BOT OTOROL

client.on('guildMemberAdd', async member => {//splashen
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})

client.on('guildMemberAdd', async member => {//splashen
if(member.user.bot) {
  const botROL = ayarlar.botROL
member.roles.add(botROL)
}
})

//splashen
// GİRİŞ SON
//splashen

client.login(process.env.token);

client.on("ready", () => {
  client.channels.cache.get("816679786281435138").join();
})


client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:no:745978292452196372> Bu Kullanıcı **Şüpheli**'
if (tarih > 1296000000) kontrol = '<a:tikkkk:751882988098420736> Bu Kullanıcı **Güvenli**'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`
 » • <a:tac:816679060427898920> Hoşgeldin ${member}
 
 » • <a:tac:816679060427898920> Seninle birlikte **${member.guild.memberCount}** kişiyiz.
 
 » • <a:tac:816679060427898920> Tagımızı alarak ekibimize katılabilirsin.
 
 » • <a:tac:816679060427898920> <@&${ayarlar.yetkiliROL}> rolündekiler seninle ilgilenecektir.
 
 » • <a:tac:816679060427898920>  ${kontrol} 
 
 » • <a:tac:816679060427898920> Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`
 
 » • <a:tac:816679060427898920> Ses teyit odasında kaydınızı yaptırabilirsiniz. 

`)//splashen
    .setImage('')
    .setTimestamp()
    
      client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.yetkiliROL}>`)
client.channels.cache.find(x => x.id === kanal).send(giris)
    
  });
