const Discord = require("discord.js");
const client = new Discord.Client();
const wait = require('util').promisify(setTimeout);
const config = require('./config.json');
const Enmap = require("enmap");
const perms = new Discord.MessageEmbed()
.setColor('RED')
.addField("**Klaida:**", "Šį nustatymą gali keisti tik nariai su administratoriaus teisėmis arba su leistina role!", false) 
const neturiuperms = new Discord.MessageEmbed()
.setColor('RED')
.addField("**Klaida:**", "Neturiu administratoriaus teisių, pridėkite jas prie mano rolės! Jų man reikia teisių pridėjimui bei kanalų kūrimui!", false) 

client.settings = new Enmap({
  name: "nustatymai",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

const settingai = {
  kalba: "lt",
  prefix: "/",
  roles: "",
  pavadinimas: "Nariai: ",
  kanalas: "",
  pavadinimas2: "Robotai: ",
  kanalas2: "",
  pavadinimas3: "Iš viso narių: ",
  kanalas3: ""
}

client.on('channelDelete', (channel) => {
  if(client.settings.get(channel.guild.id, "kanalas") != "") {
    if(channel.id == client.settings.get(channel.guild.id, "kanalas")) {
      client.settings.set(channel.guild.id, "", "kanalas");
    }
  }
  if(client.settings.get(channel.guild.id, "kanalas2") != "") {
    if(channel.id == client.settings.get(channel.guild.id, "kanalas2")) {
      client.settings.set(channel.guild.id, "", "kanalas2");
    }
  }
  if(client.settings.get(channel.guild.id, "kanalas3") != "") {
    if(channel.id == client.settings.get(channel.guild.id, "kanalas3")) {
      client.settings.set(channel.guild.id, "", "kanalas3");
    }
  }
})
client.on('ready', () => {
  client.user.setActivity(client.guilds.cache.size + ' grupes!', { type: 'WATCHING' });
  client.guilds.cache.forEach((guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.permissionsFor(guild.me).has('VIEW_CHANNEL'))
    //channel.send("⭐ **Atnaujinimas! *BETA 0.3:***\n**-** Savo norimų rolių pridėjimas prie roboto valdytojų. **roles**\n**-** Robotų ir narių skaičiaus rodymas kartu!\n**Kitame atnaujinime bus:**\n**-** Narių su rolėmis skaičiaus rodymas\n**-** Kanalų aprašymai su narių/robotų/bendru narių skaičiumi.")
    //channel.send("**Įspėjimas** Labai atsiprašome už praėjusius trikdžius, kai nepasikeisdavo narių skaičius kam nors prisijungus/atsijungus.\nTai dabar sutvarkyta!")
  })
})

client.on('guildCreate', (guild) => {
  client.settings.ensure(member.guild.id, "", 'kalba');
  client.user.setActivity(client.guilds.cache.size + ' grupes/groups!', { type: 'WATCHING' });
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES') && channel.permissionsFor(guild.me).has('VIEW_CHANNEL'))
})

client.on('guildDelete', (guild) => {
  client.user.setActivity(client.guilds.cache.size + ' grupes!', { type: 'WATCHING' });
})

client.on("guildMemberAdd", (member) => {
  client.settings.ensure(member.guild.id, settingai);
  client.settings.ensure(member.guild.id, "", 'kanalas3');
  client.settings.ensure(member.guild.id, "", 'pavadinimas3');
  const guild = client.guilds.cache.get(member.guild.id);
  
  if(client.settings.get(member.guild.id, "kanalas") != "") {
    client.channels.cache.get(client.settings.get(member.guild.id, "kanalas")).setName(client.settings.get(member.guild.id, "pavadinimas").replace("{nariai}", guild.members.cache.filter(member => !member.user.bot).size)).catch(console.error);
  }
  if(client.settings.get(member.guild.id, "kanalas2") != "") {
    client.channels.cache.get(client.settings.get(member.guild.id, "kanalas2")).setName(client.settings.get(member.guild.id, "pavadinimas2").replace("{nariai}", guild.members.cache.filter(member => member.user.bot).size)).catch(console.error);
  }
  if(client.settings.get(member.guild.id, "kanalas3") != "") {
    client.channels.cache.get(client.settings.get(member.guild.id, "kanalas3")).setName(client.settings.get(member.guild.id, "pavadinimas3").replace("{nariai}", guild.memberCount)).catch(console.error);
  }
});
  
  client.on("guildMemberRemove", (member) => {
    client.settings.ensure(member.guild.id, settingai);
    client.settings.ensure(member.guild.id, "", 'kanalas3');
    client.settings.ensure(member.guild.id, "", 'pavadinimas3');
    const guild = client.guilds.cache.get(member.guild.id);
    
    if(client.settings.get(member.guild.id, "kanalas") != "") {
      client.channels.cache.get(client.settings.get(member.guild.id, "kanalas")).setName(client.settings.get(member.guild.id, "pavadinimas").replace("{nariai}", guild.members.cache.filter(member => !member.user.bot).size)).catch(console.error);
    }
    if(client.settings.get(member.guild.id, "kanalas2") != "") {
      client.channels.cache.get(client.settings.get(member.guild.id, "kanalas2")).setName(client.settings.get(member.guild.id, "pavadinimas2").replace("{nariai}", guild.members.cache.filter(member => member.user.bot).size)).catch(console.error);
    }
    if(client.settings.get(member.guild.id, "kanalas3") != "") {
      client.channels.cache.get(client.settings.get(member.guild.id, "kanalas3")).setName(client.settings.get(member.guild.id, "pavadinimas3").replace("{nariai}", guild.memberCount)).catch(console.error);
    }
  });
  
  client.on("message", async message => {
    if(message.author.bot) return;
    
    if(message.content.indexOf(config.prefix) !== 0) return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "pavadinimas")  {
      client.settings.ensure(message.guild.id, settingai);
      client.settings.ensure(message.guild.id, "", 'roles');
      client.settings.ensure(message.guild.id, "", 'kanalas3');
      client.settings.ensure(message.guild.id, "", 'pavadinimas3');
      
      if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(neturiuperms)
      
      const guild = client.guilds.cache.get(client.guilds.cache.get(message.guild.id).id);

      message.member.roles.cache.every(role => {
        if(message.member.hasPermission("ADMINISTRATOR") || client.settings.get(message.guild.id, "roles").includes(role.id)) {
          nopermission = false
          return;
        } else {
          nopermission = true
        }
      })
      if(nopermission === false) {
        if(!args[0]) return message.channel.send("**Klaida!** Pamiršote nurodyti kanalo tipą kuriam norite pakeisti pavadinimą! */pavadinimas <kanalo-tipas [nariai/robotai]> <pavadinimas>*")
        if(args.slice(1).join(" ")) {
          if(args[0].toLowerCase() === 'nariai') {
            if(client.settings.get(message.guild.id, "kanalas") != "") {
              client.settings.set(message.guild.id, args.slice(1).join(" "), "pavadinimas");
              client.channels.cache.get(client.settings.get(message.guild.id, "kanalas")).setName(client.settings.get(message.guild.id, "pavadinimas").replace('{nariai}'.toLowerCase(), guild.members.cache.filter(member => !member.user.bot).size)).catch(console.error);
              message.channel.send(`**!** Kanalo pavadinimas buvo pakeistas į **${args.slice(1).join(" ")}**!\n__*Jei kanalo pavadinimas nepasikeitė, perkraukite **Discord** programėlę, arba sulaukite kol kažkas atsijungs/prisijungs į grupę!*__`)  
            } else {
              message.channel.send("**Klaida!** Jūs neturite šio kanalo, rašykite **/kanalas** norint sukurti jį.")
            }
          } else if(args[0].toLowerCase() === 'robotai') {
            if(client.settings.get(message.guild.id, "kanalas2") != "") {
              client.settings.set(message.guild.id, args.slice(1).join(" "), "pavadinimas2");
              client.channels.cache.get(client.settings.get(message.guild.id, "kanalas2")).setName(client.settings.get(message.guild.id, "pavadinimas2").replace('{nariai}'.toLowerCase(), guild.members.cache.filter(member => member.user.bot).size)).catch(console.error);
              message.channel.send(`**!** Kanalo pavadinimas buvo pakeistas į **${args.slice(1).join(" ")}**!\n__*Jei kanalo pavadinimas nepasikeitė, perkraukite **Discord** programėlę, arba sulaukite kol kažkas atsijungs/prisijungs į grupę!*__`)  
            } else {
              message.channel.send("**Klaida!** Jūs neturite šio kanalo, rašykite **/kanalas** norint sukurti jį.")
            }
          } else if(args[0].toLowerCase() === 'bendras') {
            client.settings.ensure(message.guild.id, "", 'kanalas3');
            client.settings.ensure(message.guild.id, "", 'pavadinimas3');
            if(client.settings.get(message.guild.id, "kanalas3") != "") {
              client.settings.set(message.guild.id, args.slice(1).join(" "), "pavadinimas3");
              client.channels.cache.get(client.settings.get(message.guild.id, "kanalas3")).setName(client.settings.get(message.guild.id, "pavadinimas3").replace('{nariai}'.toLowerCase(), guild.memberCount)).catch(console.error);
              message.channel.send(`**!** Kanalo pavadinimas buvo pakeistas į **${args.slice(1).join(" ")}**!\n__*Jei kanalo pavadinimas nepasikeitė, perkraukite **Discord** programėlę, arba sulaukite kol kažkas atsijungs/prisijungs į grupę!*__`)
            } else {
              message.channel.send("**Klaida!** Jūs neturite šio kanalo, rašykite **/kanalas** norint sukurti jį.")
            }
          } else {
            return message.channel.send("**Klaida!** Galimi kanalų tipai: *nariai*, *robotai*, *bendras*")
          }
        } else {
          message.channel.send("**Klaida!** Pamiršote įrašyti pavadinimą. */pavadinimas <kanalo-tipas [nariai/robotai]> <pavadinimas>*")
        }
      } else {
        return message.channel.send(perms)
      }
    }
    
    if(command === "kanalas") {
      client.settings.ensure(message.guild.id, settingai);
      client.settings.ensure(message.guild.id, "", 'roles');
      client.settings.ensure(message.guild.id, "", 'kanalas3');
      client.settings.ensure(message.guild.id, "", 'pavadinimas3');
      
      if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(neturiuperms)
      
      const guild = client.guilds.cache.get(client.guilds.cache.get(message.guild.id).id);
      var nopermission = true
      message.member.roles.cache.every(role => {
        if(message.member.hasPermission("ADMINISTRATOR") || client.settings.get(message.guild.id, "roles").includes(role.id)) {
          nopermission = false
          return;
        } else {
          nopermission = true
        }
      })
      if(nopermission === false) {
        if(!args[0]) return message.channel.send("**Klaida!** Pamiršote nurodyti kanalo tipą!")
          if(args[0].toLowerCase() === 'nariai') {
            if(client.settings.get(message.guild.id, "kanalas") === "") {
              let kanalas = message.guild.channels.create("Nariai: {nariai}".replace("{nariai}", guild.members.cache.filter(member => !member.user.bot).size), {type: 'voice'}).then(sukurtas => {
                sukurtas.createOverwrite(message.guild.roles.everyone, { 
                  CONNECT: false,
                });
                client.settings.set(message.guild.id, "Nariai: {nariai}", "pavadinimas");
                client.settings.set(message.guild.id, sukurtas.id, "kanalas");
                return message.channel.send("**Įvykdyta!** Sėkmingai sukūrėte naują kanalą, norint pakeisti jo pavadinimą rašykite **/pavadinimas**")
              })
            } else {
              return message.channel.send("**Klaida!** Jūs jau sukūrėte šį kanalą, jei norite pakeisti jo pavadinimą rašykite **/pavadinimas**")
            }
          } else if(args[0].toLowerCase() === 'robotai') {
            if(client.settings.get(message.guild.id, "kanalas2") === "") {
              let kanalas = message.guild.channels.create("Robotai: {nariai}".replace("{nariai}", guild.members.cache.filter(member => member.user.bot).size), {type: 'voice'}).then(sukurtas => {
                sukurtas.createOverwrite(message.guild.roles.everyone, { 
                  CONNECT: false,
                });
                client.settings.set(message.guild.id, "Robotai: {nariai}", "pavadinimas2");
                client.settings.set(message.guild.id, sukurtas.id, "kanalas2");
                return message.channel.send("**Įvykdyta!** Sėkmingai sukūrėte naują kanalą, norint pakeisti jo pavadinimą rašykite **/pavadinimas**")
              })
            } else {
              return message.channel.send("**Klaida!** Jūs jau sukūrėte šį kanalą, jei norite pakeisti jo pavadinimą rašykite **/pavadinimas**")
            }
          } else if(args[0].toLowerCase() === 'bendras') {
            client.settings.ensure(message.guild.id, "", 'kanalas3');
            client.settings.ensure(message.guild.id, "", 'pavadinimas3');
            if(client.settings.get(message.guild.id, "kanalas3") === "") {
              let kanalas = message.guild.channels.create("Iš viso narių: {nariai}".replace("{nariai}", guild.memberCount), {type: 'voice'}).then(sukurtas => {
                sukurtas.createOverwrite(message.guild.roles.everyone, { 
                  CONNECT: false,
                });
                client.settings.set(message.guild.id, "Iš viso narių: {nariai}", "pavadinimas3");
                client.settings.set(message.guild.id, sukurtas.id, "kanalas3");
                return message.channel.send("**Įvykdyta!** Sėkmingai sukūrėte naują kanalą, norint pakeisti jo pavadinimą rašykite **/pavadinimas**")
              })
            } else {
              message.channel.send("**Klaida!** Jūs jau sukūrėte šį kanalą, jei norite pakeisti jo pavadinimą rašykite **/pavadinimas**")
            }
          } else {
            return message.channel.send("**Klaida!** Galimi kanalų tipai: *nariai*, *robotai*")
          }
      } else {
        return message.channel.send(perms)
      }
    }
    
    /*if(command === "naikinti")  {
      client.settings.ensure(message.guild.id, settingai);
      
      if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(neturiuperms)
      
      const guild = client.guilds.cache.get(client.guilds.cache.get(message.guild.id).id);
      if(message.member.id === guild.owner.id) {
        if(client.settings.get(message.guild.id, "kanalas") != "") {
          let kanalas = message.guild.channels.cache.find(channel => channel.id === client.settings.get(message.guild.id, "kanalas"))
          kanalas.delete();
          client.settings.set(message.guild.id, "", "pavadinimas");
          client.settings.set(message.guild.id, "", "kanalas");
          message.channel.send("**Įvykdyta!** Kanalas buvo ištrintas! Jei norėsite jį sukurti vėl, rašykite **pavadinimas**")
        } else {
          message.channel.send("**Klaida!** Jūs dar nesukūrėte kanalo, rašykite **kanalas** norint sukurti jį!")
        }
      } else {
        return message.channel.send(perms)
      }
    }*/
    
    if(command === "komandos")  {
      const embed = new Discord.MessageEmbed()
      .setTitle("Roboto komandų sąrašas")
      .setColor('RANDOM')
      .addField("**/kanalas <nariai/robotai/bendras>**", "Sukursite naują narių arba robotų skaičiaus rodymo kanalą, jei jo dar nesate sukūrę.", false)
      .addField("**/roles <prideti/nuimti> <rolės pataginimas>**", "Pridėsite rolę kuri galės valdyti šį robotą!", false)
      .addField("**/pavadinimas <kanalo-tipas [nariai/robotai/bendras]> <pavadinimas>**", 'Pervadinsite kanalą, naudokite **,,**{nariai}**"** narių/robotų skaičiui.\n*Pavyzdžiui:* **/pavadinimas nariai {nariai} žaidėjų** arba **/pavadinimas robotai {nariai} robotų**\n__Kanalo pavadinimas **gali** turėti emoji!__', false)
      
      message.channel.send(embed)
    }

    if(command === "roles")  {
      /*message.channel.send(`
**Labas!** Šis robotas šiuo metu palaiko dvi kalbas, anglų ir lietuvių.
Apačioje rasite dvi reakcijas, 🇺🇸 bei 🇱🇹
*Norint naudoti robotą lietuvių kalba, sureaguokite į* 🇱🇹

**Hello!** This bot currently supports two languages, english and lithuanian.
In the bottom, you'll find two reactions, 🇺🇸 and 🇱🇹
*To have the bot in english, react to* 🇺🇸
      `)*/

      if(message.member.hasPermission("ADMINISTRATOR")) {
        client.settings.ensure(message.guild.id, "", 'roles');

        const veiksmas = args[0]
        if(!veiksmas) return message.channel.send("**Klaida!** Turite nurodyti veiksmą, `prideti` arba `nuimti`")
        const role = message.mentions.roles.first();
        if(!role) return message.channel.send("**Klaida!** Turite nurodyti rolę kuriai norite suteikti teises!")

        if(veiksmas.toLowerCase() == "prideti") {
          if(!client.settings.get(message.guild.id, "roles").includes(role.id)) {
            let array = client.settings.get(message.guild.id, "roles") + role.id
              
            client.settings.set(message.guild.id, array, "roles")
            message.channel.send(`**Įvykdyta!** Rolė ${role} pridėta prie roboto valdytojų!`)
          } else {
            message.channel.send("**Klaida!** Ši rolė jau pridėta prie roboto valdytojų!")
          }
        } else if(veiksmas.toLowerCase() == "nuimti") {
          if(client.settings.get(message.guild.id, "roles").includes(role.id)) {
            let array = client.settings.get(message.guild.id, "roles").replace(role.id, "")
            message.channel.send(`**Įvykdyta!** Rolė ${role} buvo panaikinta iš roboto valdytojų!`)
            client.settings.set(message.guild.id, array, "roles")

            /*client.settings.set(message.guild.id, array, "roles")
            message.channel.send(`**Įvykdyta!** Rolė ${role} pridėta prie roboto valdytojų!`)
            message.channel.send(client.settings.get(message.guild.id, "roles"))*/
          } else {
            message.channel.send("**Klaida!** Ši rolė nepridėta prie roboto valdytojų!")
          }
        }
      }
    }
  });
  
  client.login("");
