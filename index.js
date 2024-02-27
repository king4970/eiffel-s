const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(() => console.log(`Example app listening at http://localhost:`));
const keep_alive = require("./keep_alive.js");
const moment = require("moment");
const ms = require("ms");
const {
  Client,
  Intents,
  MessageEmbed,
  Interaction,
  MessageButton,
  MessageActionRow,
  Modal,
  WebhookClient,
  MessageSelectMenu,
  Collection,
  Permissions,
  MessageFlags,
  GatewayIntentBits,
  TextInputComponent,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const Discord = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    32767,
  ],
});
client.setMaxListeners(0);
client.login(process.env.token)
client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}`);

  const statuses = [
    "discord.gg/Eiffel",
    "On Top",
  ];

  let currentIndex = 0;

  // تحديث حالة الـPlaying بانتظام كل 5 ثوانٍ
  setInterval(() => {
    if (currentIndex >= statuses.length) {
      currentIndex = 0;
    }

    const status = statuses[currentIndex];
    client.user.setActivity(status, { type: "PLAYING" });
    client.user.setStatus("dnd");
    client.user.setPresence({
      status: "dnd",
      activities: [{ name: status, type: "PLAYING", url: "https://discord.com/invite/Eiffel" }],
    });
    currentIndex++;
  }, 5000); // تعديل الرقم إلى 5000 لتحديث الحالة كل 5 ثوانٍ (5000 مللي ثانية)
});
const db = require("pro.db");
db.backup("backup");
const EmjTrue = "<:emoji_46:1201160871670460456>";
const EmjFalse = "<:emoji_45:1201160762538864721>";
const OrderRoom = "1170361052123365397";
const Montagat = "1169013000296988803";
const Designer = "1169013057524072531";
const Developer = "1169013087400108174";
const StaffManager = "1169190379237670993";
const Disowners = "1211697588240252928";
const OfficialRole = "1185187413518192771";
const RolesRole = "1211691455651782666";
const DisStaff = "1211790836476420156";
const DivID = "1031289246897668258";
const ManshoratRom = "∈・المنشورات・المميزة";
const ManshoratRoom = "1169010905808392253";
const ManshoratChannel = "∈・المنشورات・المميزة";
const talabtRoom = "1211722391458418769";
const prefix = "!";
const lineLink =
"https://media.discordapp.net/attachments/1163871057460084826/1211732164723347637/1031289246897668258.webp?ex=65ef4484&is=65dccf84&hm=3e2460fd9e7a347335fa90adcda5a6794fc961f50db0f3c7405aded67c0cc357&=&format=webp&width=1265&height=147";
const colorE = "0079b5";

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception occurred:", error);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled promise rejection:", reason);
});

/// help code
client.on('message', msg => {
  if (msg.author.bot) return;

  if (msg.content === prefix + 'help') {
    const embed = new Discord.MessageEmbed()
      .setTitle('Command List')
      .setDescription('Select a category to view its corresponding commands')
      .setColor(`${colorE}`)
      .addField('Categories', 'General, Admin, Shop')
      .setTimestamp();

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId('category_select')
          .setPlaceholder('Select a category')
          .addOptions([
            {
              label: 'General',
              description: 'General commands that everyone can use',
              value: 'general'
            },
            {
              label: 'Admin',
              description: 'Admin commands that require a special admin role',
              value: 'admin'
            },
            {
              label: 'Shop',
              description: 'Shop commands for purchasing items',
              value: 'shop'
            }
          ])
      );

    msg.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === 'category_select') {
    const category = interaction.values[0];

    if (category === 'general') {
      const embed = new Discord.MessageEmbed()
        .setTitle('General Commands')
        .setDescription(`Use the following commands with ${prefix}`)
        .addField(`${prefix}avatar`, 'Get a personal picture of a specific person')
        .addField(`${prefix}banner`, 'Get a specific person\'s banner')
        .addField(`${prefix}roles`, 'Get a list of the roles on the server')
        .addField(`${prefix}server`, 'Get some information about the server')
        .addField(`${prefix}user`, 'Fetches some information about a specific person')
        .setColor(`${colorE}`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (category === 'admin') {
      const hasAdminRole = interaction.member.roles.cache.has('1168972405063028838');
      if (!hasAdminRole) {
        await interaction.reply({ content: 'You cannot view the admin commands because you do not have the required admin role.', ephemeral: true });
        return;
      }

      const embed = new Discord.MessageEmbed()
        .setTitle('Admin Commands')
        .setDescription(`Use the following commands with ${prefix}`)
        .addField(`${prefix}ban`, 'Ban a specific person from the server')
        .addField(`${prefix}unban`, 'Unban a specific person')
        .addField(`${prefix}unban-all`, 'Unban everyone')
        .addField(`${prefix}kick`, 'Kick a specific member from the server')
        .addField(`${prefix}clear`, 'Delete messages inside the room')
        .addField(`${prefix}hide`, 'Hide the room from everyone')
        .addField(`${prefix}show`, 'Show the room to everyone')
        .addField(`${prefix}lock`, 'Close the room')
        .addField(`${prefix}unlock`, 'Open the room')
        .addField(`${prefix}embed`, 'Send a message in the form of an embed')
        .addField(`${prefix}say`, 'Send a regular message')
        .addField(`${prefix}send`, 'Send a message to a specific member')
        .addField(`${prefix}come`, 'Call a specific member')
        .addField(`${prefix}mute`, 'Mute a specific member from writing')
        .addField(`${prefix}unmute`, 'Unmute a specific member')
        .addField(`${prefix}timeout`, 'Give a specific member a timeout')
        .addField(`${prefix}untimeout`, 'Unmute a specific member')
        .addField(`${prefix}role`, 'Add/delete a rank from a specific member')
        .addField(`${prefix}setnick`, 'Change/delete a specific member\'s title')
        .setColor(`${colorE}`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (category === 'shop') {
      const hasRequiredRole = interaction.member.roles.cache.has('1168972405063028838');
      if (!hasRequiredRole) {
        await interaction.reply({ content: 'You cannot view the shop commands because you do not have the required role.', ephemeral: true });
        return;
      }

      const embed = new Discord.MessageEmbed()
       .setTitle('Shop Commands')
        .setDescription(`Use the following commands with ${prefix}`)
        .addField(`${prefix}info`, 'To send information about the shop')
        .addField(`${prefix}setup`, 'To send administration submission')
        .addField(`${prefix}shop`, 'To open and close rooms')
        .addField(`${prefix}تشفير`, 'To send an encryption message')
        .setColor(`${colorE}`)
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
});
// == [ Give Role ]

client.on("messageCreate", async (message) => {
  if (
    (message.content.startsWith(prefix + "رول") &&
      message.member.roles.cache.has(RolesRole)) ||
      (message.content.startsWith(prefix + "r") &&
      message.member.roles.cache.has(RolesRole)) ||
    (message.content.startsWith(prefix + "role") &&
      message.member.roles.cache.has(RolesRole))
  ) {
    if (message.content.startsWith(prefix + "رولات")) return false;
    const args = message.content.split(" ");
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**");
    if (!args) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**");
    let row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder("Select Kind Of Role ..")
        .setCustomId("menu-select")
        .setMaxValues(1)
        .addOptions([
          {
            label: "Seller Roles",
            value: "sellR",
          },
          {
            label: "Other Roles",
            value: "otherR",
          },
          {
            label: "Warns Roles",
            value: "Warns",
          },
        ]),
    );
    let m = await message.reply({
      content: `** يرجى تحديد نوع الرتبة :**`,
      components: [row],
    });
    db.set(`giverole_${m.id}`, user.id);
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.customId == "menu-select") {
    if (interaction.values[0] === "sellR") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setPlaceholder("Select Role ..")
            .setCustomId("menu-select1")
            .setMaxValues(5)
            .addOptions([
              {
                label: "🜲 | EIFFEL S",
                value: "1163871107481358426",
              },
              {
                label: "🜲 | VIP S",
                value: "1211696828702007356",
              },
              {
                label: "🜲 | Perfect S",
                value: "1163871109641416725",
              },
              {
                label: "🜲 | Gold S",
                value: "1163871112518717450",
              },
              {
                label: "🜲 | Epic S",
                value: "1163871113999286424",
              },
              {
                label: "🜲 | Normal S",
                value: "1201855075212079145",
              },
              {
                label: "🜲 | Good S",
                value: "1163871119879716904",
              },
              {
                label: "🜲 | Designer S",
                value: "1163871118592065586",
              },
              {
                label: "🜲 | Developer S",
                value: "1163871117472190546",
              },
            ]),
        );
        interaction.message.edit({
          content: `** يرجى تحديد الرتبه
      :**`,
          components: [row1],
        });
        interaction.deferUpdate();
      }
    }
    if (interaction.values[0] === "otherR") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let row1 = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setPlaceholder("Select Role ..")
            .setCustomId("menu-select2")
            .setMaxValues(2)
            .addOptions([
              {
                label: "🜲 | Trust S",
                value: "1201859880080908391",
              },
              {
                label: "🜲 | Private S",
                value: "1201861542178721855",
              },
              {
                label: "🜲 | Partner",
                value: "1202666309725196368",
              },
            ]),
        );
        interaction.message.edit({
          content: `** يرجى تحديد الرتبة :**`,
          components: [row1],
        });
        interaction.deferUpdate();
      }
    }
  }
});


client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "menu-select1") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let rolesAdded = [];
        let rolesRemoved = [];
        let u = db.get(`giverole_${interaction.message.id}`);
        let member = interaction.guild.members.cache.find((r) => r.id == u);
        let roles = interaction.values;
        for (const r of roles) {
          var s;
          const role = interaction.guild.roles.cache.find((ro) => ro.id == r);
          if (role) {
            if (member.roles.cache.some((ro) => ro.id == r)) {
              await member.roles.remove([role]);
              rolesRemoved.push(role.name.replace(/\|\|/g, ""));
            } else {
              await member.roles.add([role]);
              rolesAdded.push(role.name.replace(/\|\|/g, ""));
            }
          }
        }
        let message = `** تم تحديث رتب ${member}**\n`;
        if (rolesAdded.length > 0) {
          message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(
            " , ",
          )}**\n`;
        }
        if (rolesRemoved.length > 0) {
          message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(
            " , ",
          )}**\n`;
        }
        interaction.message.edit({ content: `${message}`, components: [] });
        interaction.deferUpdate();
        db.delete(`giverole_${interaction.message.id}`);
      }
    }
    if (interaction.customId == "menu-select2") {
      if (interaction.member.roles.cache.has(RolesRole)) {
        let rolesAdded = [];
        let rolesRemoved = [];
        let u = db.get(`giverole_${interaction.message.id}`);
        let member = interaction.guild.members.cache.find((r) => r.id == u);
        let roles = interaction.values;
        for (const r of roles) {
          var s;
          const role = interaction.guild.roles.cache.find((ro) => ro.id == r);
          if (role) {
            if (member.roles.cache.some((ro) => ro.id == r)) {
              await member.roles.remove([role]);
              rolesRemoved.push(role.name.replace(/\|\|/g, ""));
            } else {
              await member.roles.add([role]);
              rolesAdded.push(role.name.replace(/\|\|/g, ""));
            }
          }
        }
        let message = `** تم تحديث رتب ${member}**\n`;
        if (rolesAdded.length > 0) {
          message += `> ** الرتب التي تم اضافتها : ${rolesAdded.join(
            " , ",
          )}**\n`;
        }
        if (rolesRemoved.length > 0) {
          message += `> ** الرتب التي تم ازالتها : ${rolesRemoved.join(
            " , ",
          )}**\n`;
        }
        interaction.message.edit({ content: `${message}`, components: [] });
        interaction.deferUpdate();
        db.delete(`giverole_${interaction.message.id}`);
      }
    }
  }
});


// == [ بــنـق ]

client.on("messageCreate", async (message) => {
  if (message.content === prefix + "ping") {
    let rowPing = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel(`!! إعـــادة أخـتـبــار`)
        .setCustomId(`reexam`)
        .setStyle("SECONDARY"),
    );
    message.channel.send("pong").then((message) => {
      message.edit({
        content: `**\`\`\`js
My ping is : ${client.ws.ping} ms\`\`\`**`,
        components: [rowPing],
      });
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "reexam") {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      message.edit(`**\`\`\`js
My ping is : ${client.ws.ping} ms\`\`\`**`);
    }
  }
});

// == [ Come ]

client.on("messageCreate", async (message) => {
  if (
    (message.content.startsWith(prefix + "نداء") &&
      message.member.roles.cache.has(DisStaff)) ||
    (message.content.startsWith(prefix + "come") &&
      message.member.roles.cache.has(DisStaff))
  ) {
    try {
      const channel = message.channel;
      const args = message.content.split(" ");
      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[1]);
      const commandLink = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
      if (!user) return message.reply("**منشن الشخص أولاً أو ضع الإيدي !**");
      await user.send(
        `** يرجى التوجه إلى ${channel} في أقرب وقت !\n  الإستدعاء من قبل : ${message.member} .\n  رسالة الإستدعاء : ${commandLink} -تعال**`,
      );
      await message.reply(
        `**${EmjTrue} لقد تم نداء ${user} إلى هذا الروم بنجاح !**`,
      );
    } catch {
      await message.reply(`**${EmjFalse} لا يمكنني ارسال رسالة لهذا الشخص !**`);
    }
  }
});

// == [ PosT ]

let manshor;
let member;

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "منشور")) {
    if (
      message.member.roles.cache.has(DisStaff) ||
      message.member.roles.cache.some((r) => r.id == 1168972405063028838)
    ) {
      if (message.content.startsWith(prefix + "منشورات")) return false;

      member = message.mentions.members.first();
      if (!member)
        return message.reply(`**${EmjFalse} يرجى منشن صاحب المنشور أولاً !**`);
      manshor = message.content.split(" ").slice(2).join(" ");
      if (!manshor)
        return message.reply(`**${EmjFalse} يرجى وضع المنشور أولاً !**`);

      let embed = new Discord.MessageEmbed()
        .setTitle(`** إختر نوع المنشن :**`)
        .setDescription(
          `** يرجى إختيار نوع المشنن المناسب : \`here\` أو \`everyone\`\n المنشور :\n\`${manshor}\`**`,
        )
        .setColor(`${colorE}`);
      let row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Here")
            .setCustomId("menthere")
            .setStyle("SECONDARY"),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Everyone")
            .setCustomId("menteve")
            .setStyle("SECONDARY"),
        );

      message.reply({ embeds: [embed], components: [row] });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "menthere") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );

      const heremanshor = `${manshor}\n@here`;

      let embed1 = new Discord.MessageEmbed()
        .setTitle(`**هـل أنـت مـتـاكـد مـن أرسـال هـذا الـمـنـشـور ؟**`)
        .setDescription(
          `** يرجى الإستجابة مع الأزرار بـ \`Send\` أو \`Cancel\` ..\n المنشور :\n\`${heremanshor}\n\nتواصل مع : ${member}\`**`,
        )
        .setColor(`${colorE}`);
      let row1 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Send")
            .setCustomId("completeid")
            .setStyle("SUCCESS"),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Cancel")
            .setCustomId("cancelid")
            .setStyle("DANGER"),
        );
      interaction.deferUpdate();

      message.edit({ embeds: [embed1], components: [row1] });
    } else {
      interaction.reply({
        content: `**${EmjFalse} لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  } else if (interaction.customId === "menteve") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      const evemanshor = `${manshor}\n@everyone`;
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(
          `** يرجى الإستجابة مع الأزرار بـ \`Send\` أو \`Cancel\` ..\n المنشور :\n\`${evemanshor}\n\nتواصل مع : ${member}\`**`,
        )
        .setColor(`${colorE}`);
      let row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Send")
            .setCustomId("completeid2")
            .setStyle("SUCCESS"),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Cancel")
            .setCustomId("cancelid")
            .setStyle("DANGER"),
        );
      interaction.deferUpdate();
      message.edit({ embeds: [embed2], components: [row2] });
    } else {
      interaction.reply({
        content: `**${EmjFalse}
 لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  } else if (interaction.customId === "nomen") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      const nomenmanshor = `${manshor}`;
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`** هل انت متأكد من إرسال المنشور ؟**`)
        .setDescription(
          `** يرجى الإستجابة مع الأزرار بـ \`إرسال\` أو \`إلغاء\` ..\n المنشور :\n\`${nomenmanshor}\n\nتواصل مع : ${member}\`**`,
        )
        .setColor(`${colorE}`);
      let row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إرسال")
            .setCustomId("completeid3")
            .setStyle("SUCCESS"),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("إلغاء")
            .setCustomId("cancelid")
            .setStyle("DANGER"),
        );
      interaction.deferUpdate();
      message.edit({ embeds: [embed2], components: [row2] });
    } else {
      interaction.reply({
        content: `**${EmjFalse} لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "cancelid") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      let embed3 = new Discord.MessageEmbed().setColor(`EA3648`)
        .setDescription(`** تم إلغاء إرسال هذا المنشور .
 بواسطة :
${interaction.member}
**`);
      interaction.deferUpdate();
      message.edit({ embeds: [embed3], components: [] });
    } else {
      interaction.reply({
        content: `**${EmjFalse} لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "completeid") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      const now = new Date();
      const manshoratRoom = "∈・المنشورات・المميزة";
      const ManshoratChannel = interaction.guild.channels.cache.find(
        (channel) => channel.name === manshoratRoom,
      );
      const ManshoratLog = client.channels.cache.get("1196430303447765023");
      const mehere = `${member}`;
      const manshorhere = `${manshor}\n\nتواصل مع : ${mehere}\n
\`-\`||@here||`;
      let embed4 = new Discord.MessageEmbed().setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratRom}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel is defined before sending messages
      if (ManshoratChannel) {
        await ManshoratChannel.send(`${manshorhere}`);
        await ManshoratChannel.send(
          `** منشور مدفوع , تبي زيه حياك : ** ⁠<#1168967624953172099>`,
        );
        await ManshoratChannel.send({ files: [lineLink] });
      } else {
        console.log("1196430303447765023");
      }

      await ManshoratLog.send(
        `** المنشور :\n\`${manshor}\`\n المنشن :\nevery\n المشرف المسؤول :\n${
          interaction.member
        }\n صاحب المنشور :\n${mehere}\n تاريخ المنشور : <t:${Math.floor(
          now.getTime() / 1000,
        )}:d>**`,
      );
      await ManshoratLog.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${EmjFalse}
 لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "completeid2") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      const now = new Date();
      const manshoratRoom2 = "∈・المنشورات・المميزة";
      const ManshoratChannel2 = interaction.guild.channels.cache.find(
        (channel) => channel.name === manshoratRoom2,
      );
      const ManshoratLog2 = client.channels.cache.get("1196430303447765023");
      const memeve = `${member}`;
      const manshoreve = `${manshor}\n\nتواصل مع : ${memeve}\n
\`-\`||@everyone||`;
      let embed4 = new Discord.MessageEmbed().setColor(`${colorE}`)
        .setDescription(`** تم إرسال هذا المنشور إلى ${ManshoratRom}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel2 is defined before sending messages
      if (ManshoratChannel2) {
        await ManshoratChannel2.send(`${manshoreve}`);
        await ManshoratChannel2.send(
          `** منشور مدفوع , تبي زيه حياك : ** ⁠<#1168967624953172099>`,
        );
        await ManshoratChannel2.send({ files: [lineLink] });
      } else {
        console.log("1196430303447765023");
      }

      await ManshoratLog2.send(
        `** المنشور :\n\`${manshor}\`\n المنشن :\nevery\n المشرف المسؤول :\n${
          interaction.member
        }\n صاحب المنشور :\n${memeve}\n تاريخ المنشور : <t:${Math.floor(
          now.getTime() / 1000,
        )}:d>**`,
      );
      await ManshoratLog2.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${EmjFalse}
 لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "completeid3") {
    if (interaction.member.roles.cache.some((r) => r.id == DisStaff)) {
      const message = await interaction.channel.messages.fetch(
        interaction.message.id,
      );
      const now = new Date();

      await interaction.guild.channels.fetch();

      const manshoratRoom3 = "∈・المنشورات・المميزة";
      const ManshoratChannel3 = interaction.guild.channels.cache.find(
        (channel) => channel.name === manshoratRoom3,
      );
      const ManshoratLog3 = client.channels.cache.get("1196430303447765023");
      const nomen = `${member}`;
      const manshorno = `${manshor}\n\nتواصل مع: ${nomen}`;
      let embed4 = new Discord.MessageEmbed().setColor(`${colorE}`)
        .setDescription(`**تـم أرسـال الـمـنـشـور هـنـا  ${ManshoratRom}
 بواسطة:
${interaction.member}
**`);
      message.edit({ embeds: [embed4], components: [] });
      interaction.deferUpdate();

      // Check if ManshoratChannel3 is defined before sending messages
      if (ManshoratRom) {
        await ManshoratRom.send(`${manshorno}`);
        await ManshoratRom.send(
          `** منشور مدفوع , تبي زيه حياك : ** ⁠<#1168967624953172099>`,
        );
        await ManshoratChannel3.send({ files: [lineLink] });
      } else {
        console.log("1196430303447765023");
      }

      await ManshoratLog3.send(
        `** المنشور :\n\`${manshor}\`\n المنشن :\nno mention\n المشرف المسؤول :\n${
          interaction.member
        }\n صاحب المنشور :\n${nomen}\n تاريخ المنشور : <t:${Math.floor(
          now.getTime() / 1000,
        )}:d>**`,
      );
      await ManshoratLog3.send(`${lineLink}`);
    } else {
      interaction.reply({
        content: `**${EmjFalse}
 لا يمكنك إستخدام هذا الزر .**`,
        ephemeral: true,
      });
    }
  }
});


// == [ TickeT Claim ]

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "staff-role")) {
    if (!message.member.roles.cache.some((r) => r.id == 1211691455651782666)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    let r = message.content.split(" ").slice(1).join(" ");
    let role = message.guild.roles.cache.find((r) => r.id == r);
    if (!r) {
      if (!role) {
        if (isNaN(r)) {
          message.reply("> **Error : Please put the rank ID**");
        }
      }
    }
    db.set(`role_${message.guild.id}`, r);
    message.reply(`> **تم تعيين رتبة <@&${r}> مستخدم لـ زر الكلايم .**`);
  }
});

client.on("channelCreate", (channel) => {
  if (channel.name.startsWith("ticket-")) {
    let embed = new Discord.MessageEmbed()
      .setDescription("**Click For Claim.**")
      .setColor(`${colorE}`);
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Claim")
        .setCustomId("claim")
        .setStyle("SECONDARY"),
    );
    setTimeout(() => {
      channel
        .send({ embeds: [embed], components: [row] })
        .then((m) => db.set(`message_${channel.id}`, m.id));
    }, 1000);
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
    let message = db.get(`message_${interaction.channel.id}`);
    let msg = interaction.channel.messages.cache.find((r) => r.id == message);
    let role = interaction.guild.roles.cache.find(
      (r) => r.id == db.get(`role_${interaction.guild.id}`),
    );
    if (interaction.customId == "claim") {
      if (
        !interaction.member.roles.cache.some(
          (r) => r.id == db.get(`role_${interaction.guild.id}`),
        )
      )
        return interaction.reply({
          content: "**يمكن للإدارة فقط إستخدام هذا الزر .**",
          ephemeral: true,
        });
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Ticket Owner : ${interaction.member} .**`)
        .setColor(`${colorE}`);
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Unclaim")
          .setCustomId("unclaim")
          .setStyle("DANGER"),
      );
      interaction.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: false,
      });
      interaction.channel.permissionOverwrites.edit(StaffManager, {
        SEND_MESSAGES: true,
      });
      interaction.channel.permissionOverwrites.edit(interaction.member, {
        SEND_MESSAGES: true,
      });
      interaction.channel.setName(`ticket-${interaction.member.user.username}`);
      db.set(
        `claimed_${interaction.channel.id}_${interaction.member.id}`,
        interaction.member.id,
      );
      db.set(`user_${interaction.channel.id}`, interaction.member.id);
      db.add(`weekuser_${interaction.member.id}`, 1);
      db.add(`alluser_${interaction.member.id}`, 1);
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(`**Ticket Claimed By : ${interaction.member} .**`)
            .setColor(`${colorE}`),
        ],
      });
      msg.edit({ embeds: [embed], components: [row] });
    }
    if (interaction.customId == "unclaim") {
      if (
        !interaction.member.roles.cache.some(
          (r) => r.id == db.get(`role_${interaction.guild.id}`),
        )
      )
        return interaction.reply({
          content: "**يمكن للإدارة فقط إستخدام هذا الزر .**",
          ephemeral: true,
        });
      if (!db.has(`claimed_${interaction.channel.id}_${interaction.member.id}`))
        return interaction.reply({
          content: "**يمكن لصاحب التذكرة فقط إستخدام هذا الزر .**",
          ephemeral: true,
        });
      interaction.reply({
        content: `${role}`,
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `**The Ticket Was Left Before : ${interaction.member} .**`,
            )
            .setColor(`${colorE}`),
        ],
      });
      let embed = new Discord.MessageEmbed()
        .setDescription("**Click For Claim**")
        .setColor(`${colorE}`);
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Claim")
          .setCustomId("claim")
          .setStyle("SECONDARY"),
      );
      interaction.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: true,
      });
      interaction.channel.permissionOverwrites.edit(interaction.member, {
        SEND_MESSAGES: false,
      });

      db.subtract(`weekuser_${interaction.member.id}`, 1);
      db.subtract(`alluser_${interaction.member.id}`, 1);
      db.delete(`claimed_${interaction.channel.id}_${interaction.member.id}`);
      db.delete(`user_${interaction.channel.id}`);
      msg.edit({ embeds: [embed], components: [row] });
    }
  }
});

client.on("channelDelete", (channel) => {
  if (db.has(`user_${channel.id}`)) {
    const s = db.get(`user_${channel.id}`);
    if (db.has(`claimed_${channel.id}_${s}`)) {
      db.delete(`claimed_${channel.id}_${s}`);
    }
    if (db.has(`message_${channel.id}`)) {
      db.delete(`message_${channel.id}`);
      db.delete(`user_${channel.id}`);
    }
  }
});

client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith(prefix + "points") ||
    message.content.startsWith(prefix + "نقاط") ||
    message.content.startsWith(prefix + "نقط")
  ) {
    let user = message.mentions.members.first();
    if (user) {
      let member = message.guild.members.cache.find((u) => u == user.id);
      var points = db.get(`weekuser_${user.id}`);
      var weekwarns = db.get(`weekwarns_${user.id}`);
      var allpoints = db.get(`alluser_${user.id}`);
      var allwarns = db.get(`allwarns_${user.id}`);
      var allmute = db.get(`muteall_${user.id}`);
      var weekmute = db.get(`muteweek_${user.id}`);
      if (!points) {
        points = 0;
      }
      if (!weekwarns) {
        weekwarns = 0;
      }
      if (!allpoints) {
        allpoints = 0;
      }
      if (!allwarns) {
        allwarns = 0;
      }
      if (!allmute) {
        allmute = 0;
      }
      if (!weekmute) {
        weekmute = 0;
      }
      let embed2 = new Discord.MessageEmbed()
        .setDescription(
          ` **${member.user} , Points :**\n     \n>  **Week Points : \`${
            points + weekwarns + weekmute
          }\`**\n>  **All Points : \`${
            allpoints + allwarns + allmute
          }\`**\n     \n>  **Week Tickets : \`${points}\`**\n>  **Week Warns : \`${weekwarns}\`**\n>  **Week Mutes : \`${weekmute}\`**\n     \n>  **All Tickets : \`${allpoints}\`**\n>  **All Warns : \`${allwarns}\`**\n>  **All Mutes : \`${allmute}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed2] });
    }
    if (!user) {
      var points = db.get(`weekuser_${message.member.id}`);
      var weekwarns = db.get(`weekwarns_${message.member.id}`);
      var allpoints = db.get(`alluser_${message.member.id}`);
      var allwarns = db.get(`allwarns_${message.member.id}`);
      var allmute = db.get(`muteall_${message.member.id}`);
      var weekmute = db.get(`muteweek_${message.member.id}`);
      if (!points) {
        points = 0;
      }
      if (!weekwarns) {
        weekwarns = 0;
      }
      if (!allpoints) {
        allpoints = 0;
      }
      if (!allwarns) {
        allwarns = 0;
      }
      if (!allmute) {
        allmute = 0;
      }
      if (!weekmute) {
        weekmute = 0;
      }
      let embed4 = new Discord.MessageEmbed()
        .setDescription(
          ` **${
            message.member.user
          } , Points :**\n     \n>  **Week Points : \`${
            points + weekwarns + weekmute
          }\`**\n>  **All Points : \`${
            allpoints + allwarns + allmute
          }\`**\n     \n>  **Week Tickets : \`${points}\`**\n>  **Week Warns : \`${weekwarns}\`**\n>  **Week Mutes : \`${weekmute}\`**\n     \n>  **All Tickets : \`${allpoints}\`**\n>  **All Warns : \`${allwarns}\`**\n>  **All Mutes : \`${allmute}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed4] });
    }
  }
});

client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith(prefix + "tickets") ||
    message.content.startsWith(prefix + "تكتات") ||
    message.content.startsWith(prefix + "تكت")
  ) {
    let user = message.mentions.members.first();
    if (user) {
      let member = message.guild.members.cache.find((u) => u == user.id);
      let points = db.get(`weekuser_${user.id}`);
      let allpoints = db.get(`alluser_${user.id}`);
      let embed1 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(
          `> **Week Tickets : \`0\`**\n> **All Tickets : \`${allpoints}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested by : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      let embedd = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(
          `> **Week Tickets : \`${points}\`**\n> **All Tickets : \`0\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested by : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      let embed44 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(`> **Week Tickets : \`0\`**\n> **All Tickets : \`0\`**`)
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested by : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      if (!db.has(`weekuser_${user.id}`))
        return message.reply({ embeds: [embed1] });
      if (!db.has(`alluser_${user.id}`))
        return message.reply({ embeds: [embedd] });
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Points :`)
        .setDescription(
          `> **Week Tickets : \`${points}\`**\n> **All Tickets : \`${allpoints}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed2] });
    }
    if (!user) {
      let points = db.get(`weekuser_${message.member.id}`);
      let allpoints = db.get(`alluser_${message.member.id}`);
      let embed3 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(
          `> **Week Tickets : \`0\`**\n> **All Tickets : \`${allpoints}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      let embedd = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(
          `> **Week Tickets : \`${points}\`**\n> **All Tickets : \`0\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      if (!db.has(`weekuser_${message.member.id}`))
        return message.reply({ embeds: [embed3] });
      if (!db.has(`alluser_${message.member.id}`))
        return message.reply({ embeds: [embedd] });
      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Points :`)
        .setDescription(
          `> **Week Tickets : \`${points}\`**\n> **All Tickets : \`${allpoints}\`**`,
        )

        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed4] });
    }
  }
});

client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith(prefix + "mutes") ||
    message.content.startsWith(prefix + "ميوتات")
  ) {
    let user = message.mentions.members.first();
    if (user) {
      let member = message.guild.members.cache.find((u) => u == user.id);
      var mutes = db.get(`muteweek_${user.id}`);
      var allmutes = db.get(`muteall_${user.id}`);
      if (!mutes) {
        mutes = 0;
      }
      if (!allmutes) {
        allmutes = 0;
      }
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Mutes :`)
        .setDescription(
          `> **All Mutes : \`${allmutes}\`**\n> **Week Mutes : \`${mutes}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed2] });
    }
    if (!user) {
      var mutes = db.get(`muteweek_${message.member.id}`);
      var allmutes = db.get(`muteall_${message.member.id}`);
      if (!mutes) {
        mutes = 0;
      }
      if (!allmutes) {
        allmutes = 0;
      }
      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Mutes :`)
        .setDescription(
          `> **Week Mutes : \`${mutes}\`**\n> **All Mutes : \`${allmutes}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed4] });
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "ticket(+)")) {
    if (message.member.roles.cache.some((r) => r.id == Disowners)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be added**",
        );
      await db.add(`weekuser_${user.id}`, args2);
      await db.add(`alluser_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} ticket points to ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == Disowners,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المضافة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "allticket(+)")) {
    if (message.member.roles.cache.some((r) => r.id == 1211691455651782666)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be added**",
        );
      await db.add(`alluser_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} ticket points to ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المضافة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "mute(+)")) {
    if (message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be added**",
        );
      await db.add(`muteweek_${user.id}`, args2);
      await db.add(`muteall_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} mute points to ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المضافة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "allmute(+)")) {
    if (message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be added**",
        );
      await db.add(`muteall_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} mute points to ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المضافة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "allwarn(+)")) {
    if (message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be added**",
        );
      await db.add(`allwarns_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} warn points to ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المضافة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "ticket(-)")) {
    if (message.member.roles.cache.some((r) => r.id == Disowners)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      if (!db.has(`weekuser_${user.id}`))
        return message.reply("**This user does not have any points**");
      if (!db.has(`alluser_${user.id}`))
        return message.reply("**This user does not have any points**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be removed**",
        );
      await db.subtract(`weekuser_${user.id}`, args2);
      await db.subtract(`alluser_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done removed ${args2} ticket points from ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == Disowners,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم ازالة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المزالة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "warn(+)")) {
    if (message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be added**",
        );
      await db.add(`weekwarns_${user.id}`, args2);
      await db.add(`allwarns_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done added ${args2} warn points to ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم اضافة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المضافة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "warn(-)")) {
    if (message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      if (!db.has(`weekwarns_${user.id}`))
        return message.reply("**This user does not have any points**");
      if (!db.has(`allwarns_${user.id}`))
        return message.reply("**This user does not have any points**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be removed**",
        );
      await db.subtract(`weekwarns_${user.id}`, args2);
      await db.subtract(`allwarns_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done removed ${args2} warn points from ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم ازالة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المزالة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "mute(-)")) {
    if (message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      let user = message.mentions.members.first();
      if (!user) return message.reply("**Error : Please mention a user**");
      if (!db.has(`muteweek_${user.id}`))
        return message.reply("**This user does not have any points**");
      if (!db.has(`muteall_${user.id}`))
        return message.reply("**This user does not have any points**");
      let args = message.content.split(" ").slice(2).join(" ");
      if (!args) return message.reply("**Error : Please put a number**");
      let args2 = parseInt(args);
      if (!args2)
        return message.reply(
          "**Error : This is not a number that can be removed**",
        );
      await db.subtract(`muteweek_${user.id}`, args2);
      await db.subtract(`muteall_${user.id}`, args2);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**Done removed ${args2} mute points from ${user}**`)
        .setColor(`${colorE}`);
      message.reply({ embeds: [embed] });
      let log = message.guild.channels.cache.find(
        (r) => r.id == 1156636136530268160,
      );
      let member = message.guild.members.cache.find((r) => r.id == user.id);
      let embedLog = new Discord.MessageEmbed()
        .setAuthor({
          name: message.member.user.username,
          iconURL: message.member.user.displayAvatarURL(),
        })
        .setTitle(`** تم ازالة نقطة جديدة**`)
        .setDescription(
          `> ** المسؤول : ${
            message.member
          }**\n> ** الشخص : ${message.guild.members.cache.find(
            (r) => r.id == user.id,
          )}**\n> ** عدد النقاط المزالة : ${args2}**`,
        )
        .setFooter({
          text: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setColor(`${colorE}`);
      log.send({ embeds: [embedLog] });
      log.send(
        `https://cdn.discordapp.com/attachments/1158491033387143188/1158553572707942523/line1.png?ex=651caa98&is=651b5918&hm=f495392f0a661058295b72c1f1e849e817e2bb714789346a00230eb3592e2001&`,
      );
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.content == prefix + "claim") {
    if (!message.member.roles.cache.some((r) => r.id == perms)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    let embed = new Discord.MessageEmbed()
      .setDescription("**إضغط على الزر لتصبح مسؤول التذكرة**")
      .setColor(`${colorE}`);
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Claim")
        .setCustomId("claim")
        .setStyle("SECONDARY"),
    );
    message.delete();
    message.channel
      .send({ embeds: [embed], components: [row] })
      .then((m) => db.set(`message_${message.channel.id}`, m.id));
  }
});

// == [ Setr ]

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "find")) {
    let args = message.content.split(" ");
    const roles =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((x) => x.id == args[1]) ||
      message.guild.roles.cache.find(
        (x) => x.name == message.content.split(" ").slice(1).join(" "),
      );
    if (!message.member.roles.cache.some((r) => r.id == Disowners)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    if (!args) return message.reply("**حدد رتبة !**");
    if (!roles) return message.reply("**حدد رتبة !**");

    const members = roles.members.map(
      (e) => `<:Eiffel:1211713847308849274> |  <@${e.user.id}>`,
    );
    const membersCount = roles.members.size;
    const MAX_LENGTH = 2000;
    const chunks = [];
    let currentChunk = "";
    for (const member of members) {
      if (currentChunk.length + member.length + 1 <= MAX_LENGTH) {
        currentChunk += `${member}\n`;
      } else {
        chunks.push(currentChunk);
        currentChunk = `${member}\n`;
      }
    }
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    for (let i = 0; i < chunks.length; i++) {
      const content =
        i === chunks.length - 1
          ? `**${chunks[i]}\nعددهم : \`${membersCount}\`**`
          : `**${chunks[i]}**`;
      await message.reply({ content });
    }
  }
});

// == [ Join Voice ]

const { joinVoiceChannel, createAudioPlayer } = require("@discordjs/voice");

const voiceChannelId = "1163871053077028965";
const guildId = "1001033892876255342";

client.on("ready", () => {
  const voiceChannel = client.channels.cache.get(voiceChannelId);
  if (!voiceChannel) {
    return console.log(`Voice channel ${voiceChannelId} not found.`);
  }

  const connection = joinVoiceChannel({
    channelId: voiceChannelId,
    guildId: guildId,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  connection.on("error", (error) => {
    console.error(`Error joining voice channel: ${error.message}`);
  });

  connection.on("stateChange", (state) => {
    console.log(`Connection state changed: ${state.status}`);
  });

  const audioPlayer = createAudioPlayer();
  connection.subscribe(audioPlayer);

  console.log(`Joined voice channel ${voiceChannel.name}!`);
});

// طلبات

//

client.on("messageCreate", (message) => {
  if (
    message.content.startsWith(prefix + "info") || message.content.startsWith(prefix + "معلومات")
    
  ) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply("ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.");
    }

    let embed1 = new MessageEmbed()
      .setTitle(`** Eiffel  \`S\` Information・المعلومات**`)
      .setDescription(`**
- الرتب العامة : لرؤية معلومات الرتب العامة
- الرتب النادرة : لرؤية معلومات الرتب النادرة
- الرومات الخاصة : لرؤية معلومات الرومات الخاصة
- الاعلانات : لرؤية معلومات الاعلانات
- المنشوات : لرؤية معلومات المنشوات المميزة**
`)

      .setColor(`${colorE}`)
      .setThumbnail(message.guild.iconURL())
      .setImage(`https://media.discordapp.net/attachments/1163871057460084826/1211953349872717855/58626cb920a96b06.png?ex=65f01283&is=65dd9d83&hm=72c42bc428cbd787e194511abecba918df90226b375ea18db1f84cde31571dab&=&format=webp&quality=lossless&width=756&height=200`);

    let selectMenu = new Discord.MessageSelectMenu()
      .setCustomId("menu")
      .setPlaceholder("اختر العنصر المناسب")
      .addOptions([
        {
          label: "الـرتــب",
          value: "roles",
        },
        {
          label: "إعـلانـات",
          value: "ads",
        },
        {
          label: "مـنـشـورات",
          value: "manshorat",
        },
        {
          label: "رومـات خـاصـة",
          value: "rooms",
        },
        {
          label: "الرتب النادرة",
          value: "rareRoles",
        },
      ]);

    let row = new Discord.MessageActionRow().addComponents(selectMenu);

    message.channel.send({ embeds: [embed1], components: [row] });
    message.delete();
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "menu") {
      const selectedValue = interaction.values[0];

      if (selectedValue === "roles") {
        let embed = new MessageEmbed()
          .setTitle(`          **__Roles Informations・معلومات الرتب __**          `)
          .setDescription(`
          🜲 | Perfect S = 60,000

          النشر بكل الرومات
          نشر الصور بكل الرومات
          إمكانية المنشن في الرومات
          
          🜲 | Gold S  = 50,00
          
          النشر بكل الرومات ماعدا [التصاميم - البرمجيات]
          نشر الصور بكل الرومات
          إمكانية المنشن بكل الرومات
          
          🜲 | Epic S = 45,000
          
          النشر بكل الرومات ماعدا [التصاميم - البرمجيات]
          نشر الصور بروم حسابات فقط
          إمكانية المنشن بكل الرومات
          
          🜲 | Normal S  = 35,000
          
          النشر بكل الرومات ماعدا [التصاميم - البرمجيات]
          لايمكنه نشر الصور
          المنشن بكل الرومات
          
          🜲 | Good S = 20,000
          
          النشر بكل الرومات ماعدا [التصاميم - البرمجيات]
          لا يمكنه نشر الصور
          لا يمكنه المنشن
          🜲 | Designer S = 15,000
          
          النشر بروم التصاميم فقط
          نشر الصور بروم التصاميم فقط
          إمكانية المنشن بروم التصاميم فقط
          
          🜲 | Developer S = 10,000
          
          النشر بروم البرمجيات فقط
          نشر الصور بروم البرمجيات فقط
          إمكانية المنشن بروم البرمجيات فقط
ملاحظات :

- لطلب رتبة يرجى التواصل مع : ⁠<#1163871131225296986>
- التحويل لـ : <@796861763902636052> 
- اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية
          
          
          `)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326944082165760/066bb506d809e336.jpg?ex=65db9a83&is=65c92583&hm=b6ae453967888f978f72005142006a905b29738ec7461fe4b33840621e83597f&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "ads") {
        let embed = new MessageEmbed()
          .setTitle(`**__Ads Informations・معلومات الاعلانات__**`)
          .setDescription(`بدون منشن | No Mention
          30,000 Credits 
          
          Here | منشن هير
          50,000 Credits 
          
          Everyone | منشن للكل
          100,000 Credits 
          
          هدايا الاعلانات | Ads Gifts
          200,000 Credits 
          
          Private Channel Without Giveaway | روم خاص بدون قيف اواي
          400,000 Credits 
          
          Private Channel With Giveaway | روم خاص مع قيف اواي
          600,000 Credits
          - في حال نشر اشياء 18+ سيتم مسح اعلانك
- اعلانات الرومات الخاصة لمدة ثلاث ايام و مع منشن افري ون
- مسموح نسوي reroll في حال لم يطبق الشروط كل الفائزين ، تنويه : reroll مره واحدة
- لا يوجد ضمان دخول اعضاء
- في حال وصلنا بلاغين نصب عن سيرفرك مع الدلائل سيتم مسح اعلانك بدون تعويض
- يرجى انتظار اداري عشان اذا كان اعلانك مخالف لن يتم تعويضك 
- مسموح تعديل الاعلان بعد شرائه بخمس دقايق .. اذا عدت الخمس دقايق ممنوع تعدله |
ملاحظات :

- لطلب اعلان يرجى التواصل مع : ⁠<#1163871131225296986>
- التحويل لـ : <@796861763902636052> 
- اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326917750329375/21e60f78ff2c151d.jpg?ex=65db9a7d&is=65c9257d&hm=073fc691e73ffc2d4e58d1b86bc4107e91cad7728a537cb380a7ffc760cbc860&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "manshorat") {
        let embed = new MessageEmbed()
          .setTitle(`**__Special Publications Informations・معلومات المنشورات المميزة__**`)
          .setDescription(`Mention Here | منشن هير
          40,000 Credits
          
          Mention Everyone | منشن ايفريون
          80,000 Credits
          
          ملاحظات :
          
          - ممنوع بيع كردت او طلب كردت
          - ممنوع بيع او طلب عملة حقيقه مثل دولار مقابل كردت او العكس
          - ممنوع بيع سلعه مقابل شيء غير كردت
          - ممنوع طلب او بيع رصيد ( فودافون كاش , اسيا , سوا , الخ  )
          - ممنوع طلب شيء يخص تهكير
          - ممنوع بيع طريقة تكون موجودة على اليوتيوب
          - ممنوع طلب او بيع طرق كردت بيجمع اشكالها
          - ممنوع بيع او طلب اي شي يخص التوكنات
          - مسموح تعديل المنشور بعد شرائه بخمس دقايق .. اذا عدت الخمس دقايق ممنوع تعدله
          
          ملاحظات :
          
          - لطلب رتبة يرجى التواصل مع : ⁠<#1163871131225296986>
          - التحويل لـ : <@796861763902636052> 
          - اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326944442880080/e6964c24a00fd441.jpg?ex=65db9a84&is=65c92584&hm=7441b9fa6eaac53536692b18fc95bb5309334b86fa00749df3fbcebd1447a487&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "rooms") {
        let embed = new MessageEmbed()
          .setTitle(`**__Private Rooms Informations・معلومات الرومات الخاصة__**`)
          .setDescription(`Private S = 150,000

          روم باسمك
          نشر كل نصف ساعة مع صلاحية رفع الصور و منشن هير
          
          ملاحظات :

- لطلب روم خاص يرجى التواصل مع : ⁠<#1163871131225296986>
- التحويل لـ : <@796861763902636052> 
- اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326915837857822/46414ace49ae0421.jpg?ex=65db9a7d&is=65c9257d&hm=896f6e72400cb9a1b7aeabc5ea703e91fd1b24c62ce8729d08c3c793f5798fb0&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "rareRoles") {
        let embed = new MessageEmbed()
          .setTitle(`**___Rare Roles Informations・معلومات الرتب النادرة __**`)
          .setDescription(`
          Vip S = 120,000

النشر بكل الرومات مع امكانيه نشر صور
نشر كل ساعه بروم Vip
المنشن افري ون مره اليوم بروم Vip
منشور مميز هير كل اسبوع مجانا

Eiffel S = 300,000

النشر بكل الرومات مع امكانية نشر صور
نشر كل ساعة بروم Vip
مسموحلك تمنشن ايفري ون مرتين باليوم بروم Vip
منشور مميز هير كل 4 ايام مجانا
خصم 30% على الاعلانات " ما عدا اعلانات الي فيها قيف اوايات "


ملاحظات :

- لطلب رتبة يرجى التواصل مع : ⁠<#1163871131225296986>
- التحويل لـ : <@796861763902636052> 
- اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326943700623370/472ae6864ad30f61.jpg?ex=65db9a83&is=65c92583&hm=ca25105005f2bc5f9bf551254c259dc1b95575d45ab6c4d28f122d509b9197bf&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
  }
});

// قوانين
client.on("messageCreate", (message) => {
  if (
    message.content.startsWith(prefix + "rules")
    
  ) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply("ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.");
    }

    let embed1 = new MessageEmbed()
      .setTitle(`** Eiffel  \`S\` rules・القوانين**`)
      .setDescription(`**القوانين
 - لرؤية قوانين السيرفر اختار قوانين السيرفر
- لرؤية قوانين البائعين اختار قوانين البائعين
- لرؤية قوانين الادارة اختار قونين الادارة
- لرؤية قوانين القضاة اختار قوانين القضاة
- لرؤية قوانين الوسطاء اختار قوانين الوسطاء**
`)

      .setColor(`${colorE}`)
      .setThumbnail(message.guild.iconURL())
      .setImage(`https://media.discordapp.net/attachments/1196091329084674149/1208128506676903966/image_1.png?ex=65e22859&is=65cfb359&hm=9eb8ea1d309b701d295208ee67634d64a99abc3c140efbd46916dae31f148caf&=&format=webp&quality=lossless&width=1439&height=382`);

    let selectMenu = new Discord.MessageSelectMenu()
      .setCustomId("menu")
      .setPlaceholder("اختر العنصر المناسب")
      .addOptions([
        {
          label: "قوانين السيرفر",
          value: "server",
        },
        {
          label: "قوانين البيـع",
          value: "buy",
        },
      ]);

    let row = new Discord.MessageActionRow().addComponents(selectMenu);

    message.channel.send({ embeds: [embed1], components: [row] });
    message.delete();
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "menu") {
      const selectedValue = interaction.values[0];

      if (selectedValue === "server") {
        let embed = new MessageEmbed()
          .setTitle(`**__Server Rules・قوانين السيرفر__**`)
          .setDescription(`
- 1 - احترام الجميع .
- 2 - ممنوع طلب الرتب ، الرتب تمنح ولا تطلب .
- 3 - يمنع الحديث بمواضيع السياسة والدينية .
- 4 - ممنوع التكرار او السبام .
- 5 - التقيد بقوانين ديسكـورد .
          
          “ https://discord.com/new/terms " `)
          .setColor(`${colorE}`);        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "buy") {
        let embed = new MessageEmbed()
          .setTitle(`**__Sellers Rules・قوانين البائعين__**`)
          .setDescription(`
          **ممنوع منشن افريون ما عدا روم vip | سحب رتبة
          ممنوع ما تقبل وسيط | سحب رتبة
          ممنوع اي شي +18 | سحب رتبة
          مخالفة قوانين رتبتك | تحذير
          ممنوع نسخ منشور احد ثاني او تقول نفس الي فوقي | سحب رتبة
          ممنوع شراء سلعة واعادة بيعها بدون موافقة البائع | سحب رتبة
          ممنوع نشر مرتين قبل مرور ساعة حتى ولو بروم ثانيه | تحذير / في حالة النشر في اكثر من رومين ( ثلاث رومات او اكثر في نفس الوقت ) | سحب رتبة
          ممنوع نشر منتجات برومات مختلفة , مثال : تصاميم بروم حسابات | تحذير
          ممنوع نشر اكتر من صورتين في رومات البيع و اكتر من 4 في روم التصاميم | تحذير
          ممنوع نشر منشور و حذفه ثم نشره مرة أخرى "منشن مرتين" لو تبي تعدله عدله بدون حذف | تحذير
          ممنوع نشر اي طرق نيترو او طرق كردت | سحب رتبة
          ممنوع اي ادوات اختراق او تهكير | سحب رتبة
          
          
          الاشياء الجانبيه :
          اي شي ماله روم خاص فيه يتنشر في روم اخرى
          ممنوع اي بطاقة قوقل بلاي عليها سياسيات | سحب رتبة
          منتجات الديسكورد بجميع اشكالها فقط في روم ديس ، مخالفة ده الشي = تحذير
          عدم التشفير ل الكلمات الممنوعة يؤدي الى حذف منشورك بشكل تلقائي او يدوي
          لتشفير منشورك توجه لروم التشفير
          
          **
          Eiffel S Server
`
)
          .setColor(`${colorE}`);        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "manshorat") {
        let embed = new MessageEmbed()
          .setTitle(`**__Special Publications Informations・معلومات المنشورات المميزة__**`)
          .setDescription(`Mention Here | منشن هير
          40,000 Credits
          
          Mention Everyone | منشن ايفريون
          80,000 Credits
          
          ملاحظات :
          
          - ممنوع بيع كردت او طلب كردت
          - ممنوع بيع او طلب عملة حقيقه مثل دولار مقابل كردت او العكس
          - ممنوع بيع سلعه مقابل شيء غير كردت
          - ممنوع طلب او بيع رصيد ( فودافون كاش , اسيا , سوا , الخ  )
          - ممنوع طلب شيء يخص تهكير
          - ممنوع بيع طريقة تكون موجودة على اليوتيوب
          - ممنوع طلب او بيع طرق كردت بيجمع اشكالها
          - ممنوع بيع او طلب اي شي يخص التوكنات
          - مسموح تعديل المنشور بعد شرائه بخمس دقايق .. اذا عدت الخمس دقايق ممنوع تعدله
          
          ملاحظات :
          
          - لطلب رتبة يرجى التواصل مع : ⁠<#1163871131225296986>
          - التحويل لـ : <@796861763902636052> 
          - اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326944442880080/e6964c24a00fd441.jpg?ex=65db9a84&is=65c92584&hm=7441b9fa6eaac53536692b18fc95bb5309334b86fa00749df3fbcebd1447a487&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "rooms") {
        let embed = new MessageEmbed()
          .setTitle(`**__Private Rooms Informations・معلومات الرومات الخاصة__**`)
          .setDescription(`Private S = 150,000

          روم باسمك
          نشر كل نصف ساعة مع صلاحية رفع الصور و منشن هير
          
          ملاحظات :

- لطلب روم خاص يرجى التواصل مع : ⁠<#1163871131225296986>
- التحويل لـ : <@796861763902636052> 
- اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326915837857822/46414ace49ae0421.jpg?ex=65db9a7d&is=65c9257d&hm=896f6e72400cb9a1b7aeabc5ea703e91fd1b24c62ce8729d08c3c793f5798fb0&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (selectedValue === "rareRoles") {
        let embed = new MessageEmbed()
          .setTitle(`**___Rare Roles Informations・معلومات الرتب النادرة __**`)
          .setDescription(`
          Vip S = 120,000

النشر بكل الرومات مع امكانيه نشر صور
نشر كل ساعه بروم Vip
المنشن افري ون مره اليوم بروم Vip
منشور مميز هير كل اسبوع مجانا

Eiffel S = 300,000

النشر بكل الرومات مع امكانية نشر صور
نشر كل ساعة بروم Vip
مسموحلك تمنشن ايفري ون مرتين باليوم بروم Vip
منشور مميز هير كل 4 ايام مجانا
خصم 30% على الاعلانات " ما عدا اعلانات الي فيها قيف اوايات "


ملاحظات :

- لطلب رتبة يرجى التواصل مع : ⁠<#1163871131225296986>
- التحويل لـ : <@796861763902636052> 
- اذا قمت بالتحويل لأحد غير الحساب المذكور أعلاه فلن يتم تسليمك الرتبة و لن نتحمل المسؤولية`)
          .setColor(`${colorE}`)
          .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326943700623370/472ae6864ad30f61.jpg?ex=65db9a83&is=65c92583&hm=ca25105005f2bc5f9bf551254c259dc1b95575d45ab6c4d28f122d509b9197bf&=&format=webp&width=1439&height=383");
        
        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
  }
});
// == [ Rooms ]
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "show") {
    if (
      !interaction.member.roles.cache.some((r) => r.id === "1200139964499906674")
    ) {
      return interaction.reply("**للأسف لا تمتلك الصلاحية المطلوبة**");
    }

    // قم بتفعيل رومات العرض هنا
    let channelIds = ["1201884652944760904", "1201884627040735252", "1201884567695261706", "1201884537811111986", "1201884513840668713", "1201884457838317568", "1201884420479664129", "1201884375470583818"]; // قم بوضع أيدي الرومات هنا


    for (let channelId of channelIds) {
      let channel = interaction.guild.channels.cache.get(channelId);
      if (channel) {
        await channel.permissionOverwrites.create("1001033892876255342", {
          VIEW_CHANNEL: true,
        });
        interaction.reply("**تم  عرض الرومات وحذف جميع الرسائل**");
      }

    }

    let targetChannel = interaction.guild.channels.cache.get("1211352878975811614"); // قم بوضع أيدي الروم هنا
    if (targetChannel) {
      await targetChannel.bulkDelete(100).then(() => {
        targetChannel.send("تم إظهار الرومات @here").then(() => {
          console.log("تم حذف الرسائل وإرسال رسالة في الروم:", targetChannel.name);
        }).catch((error) => {
          console.error("حدث خطأ أثناء إرسال رسالة في الروم:", targetChannel.name, error);
        });
      }).catch((error) => {
        console.error("حدث خطأ أثناء حذف الرسائل في الروم:", targetChannel.name, error);
      });
    }
  }
  if (interaction.customId === "hide") {
    if (
      !interaction.member.roles.cache.some((r) => r.id === "1200139964499906674")
    ) {
      return interaction.reply("**للأسف لا تمتلك صلاحية**");
    }
  
    // قم بتعطيل رومات العرض هنا
    let channelIds = ["1201884652944760904", "1201884627040735252", "1201884567695261706", "1201884537811111986", "1201884513840668713", "1201884457838317568", "1201884420479664129", "1201884375470583818"]; // قم بوضع أيدي الرومات هنا
  
    channelIds.forEach(async (channelId) => {
      let channel = interaction.guild.channels.cache.get(channelId);
      if (channel) {
        await channel.permissionOverwrites.create("1001033892876255342", {
          VIEW_CHANNEL: false,
        }).then(() => {
          // حذف جميع الرسائل في الروم
          channel.bulkDelete(100).then(() => {
            console.log("تم حذف الرسائل في الروم:", channel.name);
          }).catch((error) => {
            console.error("حدث خطأ أثناء حذف الرسائل في الروم:", channel.name, error);
          });
        });
      }
    });
  
    interaction.reply("**تم تعطيل عرض الرومات وحذف جميع الرسائل**");
  
    // إرسال رسالة في الروم المحدد
    let targetChannel = interaction.guild.channels.cache.get("1211352878975811614"); // قم بوضع أيدي الروم هنا
    if (targetChannel) {
      await targetChannel.bulkDelete(100).then(() => {
        targetChannel.send("تم إغلاق الرومات @here").then(() => {
          console.log("تم حذف الرسائل وإرسال رسالة في الروم:", targetChannel.name);
        }).catch((error) => {
          console.error("حدث خطأ أثناء إرسال رسالة في الروم:", targetChannel.name, error);
        });
      }).catch((error) => {
        console.error("حدث خطأ أثناء حذف الرسائل في الروم:", targetChannel.name, error);
      });
    }
  }
});
// الكود الباقي هنا
client.on("messageCreate", (message) => {
  if (message.content === prefix + "rooms") {
    if (
      !message.member.roles.cache.some((r) => r.id === "1200139964499906674")
    ) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.member.user.username,
        message.member.user.displayAvatarURL(),
      )
      .setDescription(
        `> **show = ارجاع الرومات**\n\n> **hide = اخفاء الرومات**`,
      )
      .setTimestamp()
      .setColor(colorE)
      .setFooter(message.guild.name, message.guild.iconURL());
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setEmoji(EmjTrue)
        .setStyle("SECONDARY")
        .setCustomId("show"),
      new Discord.MessageButton()
        .setEmoji(EmjFalse)
        .setStyle("SECONDARY")
        .setCustomId("hide"),
    );
    message.reply({ embeds: [embed], components: [row] }).then((m) => {
      db.set(`m_${message.guild.id}`, m.id);
    });
  }
});
// == [ Say ]

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("$say")) {
    const content = message.content.slice("$say".length).trim();

    const isAdmin = message.member.permissions.has("ADMINISTRATOR");

    if (!isAdmin) {
      return message.reply("You do not have permission to use this command.");
    }

    const embed = new MessageEmbed()
      .setColor(`${colorE}`)
      .setDescription(content)
      .setThumbnail(message.guild.iconURL())
      .setFooter({ text: `Eiffel S`, iconURL: `https://cdn.discordapp.com/attachments/1196091329084674149/1208147644204060732/image_prev_ui_1.png?ex=65e23a2c&is=65cfc52c&hm=15b4b42781417c45221b94e880f437bcccb1cc94543425227a76b5daaee9a6d0&` })
      .setTimestamp();
    

    message.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith(prefix + "warns") ||
    message.content.startsWith(prefix + "تحذيرات")
  ) {
    let user = message.mentions.members.first();
    if (user) {
      let member = message.guild.members.cache.find((u) => u == user.id);
      var warns = db.get(`weekwarns_${user.id}`);
      var allwarns = db.get(`allwarns_${user.id}`);
      if (!warns) {
        warns = 0;
      }
      if (!allwarns) {
        allwarns = 0;
      }
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag}, Warns :`)
        .setDescription(
          `> **All Warns : \`${allwarns}\`**\n> **Week Warns : \`${warns}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed2] });
    }
    if (!user) {
      var warns = db.get(`weekwarns_${message.member.id}`);
      var allwarns = db.get(`allwarns_${message.member.id}`);
      if (!warns) {
        warns = 0;
      }
      if (!allwarns) {
        allwarns = 0;
      }
      let embed4 = new Discord.MessageEmbed()
        .setTitle(`${message.member.user.tag}, Warns :`)
        .setDescription(
          `> **Week Warns : \`${warns}\`**\n> **All Warns : \`${allwarns}\`**`,
        )
        .setColor(`${colorE}`)
        .setFooter({
          text: `Requested By : ${message.member.user.tag}`,
          iconURL: message.member.user.displayAvatarURL(),
        });
      message.reply({ embeds: [embed4] });
    }
  }
});

////////
client.on("messageCreate", async (message) => {
  if (message.content.startsWith("$repoints")) {
    if (!message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has("1151903317811810444")) {
          var points = db.get(`weekuser_${member.id}`);
          var weekwarns = db.get(`weekwarns_${member.id}`);
          var weekmute = db.get(`muteweek_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({
              user: member.user,
              points,
              weekwarns,
              weekmute,
              total: points + weekwarns + weekmute,
            });
          }
        }
      });
      usersData.sort((a, b) => b.total - a.total);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle("**Top 10 Week :**");
      const topUsers = usersData.slice(0, 10);
      topUsers.forEach((user, index) => {
        embed.addField(
          `**#${index + 1} | **`,
          `**<@${user.user.id}> - ${user.points} Tickets - ${
            user.weekwarns
          } Warns - ${user.weekmute} Mutes - All Week : ${
            user.points + user.weekwarns + user.weekmute
          } **`,
        );
      });
      const channel = message.guild.channels.cache.get("1182353465343737927");
      if (channel && channel.isText()) {
        await channel.send({ embeds: [embed] });
        await message.reply("**تم إعادة تعيين نقاط الأسبوع بنجاح.**");
      }
      usersData.forEach((user) => {
        if (user.user.id !== client.user.id) {
          if (db.has(`feedback_${user.user.id}`)) {
            db.delete(`feedback_${user.user.id}`);
          }
          if (
            user.points === 0 &&
            user.weekwarns === 0 &&
            user.weekmute === 0
          ) {
            db.delete(`weekuser_${user.user.id}`);
            db.delete(`weekwarns_${user.user.id}`);
            db.delete(`muteweek_${user.user.id}`);
          } else {
            db.set(`muteweek_${user.user.id}`, 0);
            db.set(`weekwarns_${user.user.id}`, 0);
            db.set(`weekuser_${user.user.id}`, 0);
          }
        }
      });
    } catch (error) {
      console.error("حدث خطأ :", error);
    }
  }
});

//////////////
client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith("$top") ||
    message.content.startsWith("$توب")
  ) {
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has("1182353465343737927")) {
          var points = db.get(`alluser_${member.id}`);
          var weekwarns = db.get(`allwarns_${member.id}`);
          var weekmute = db.get(`muteall_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({
              user: member.user,
              points,
              weekwarns,
              weekmute,
              totalPoints: points + weekwarns + weekmute,
            });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle("**Top 10 Points :**");
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription("**لا يوجد أعضاء يمتلكون نقاط .**");
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(
            `**#${index + 1} | **`,
            `**<@${user.user.id}> - ${user.points} Tickets - ${
              user.weekwarns
            } Warns - ${user.weekmute} Mutes - All Top : ${
              user.points + user.weekwarns + user.weekmute
            } **`,
          );
        });
      }
      let rowtp = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("All")
            .setCustomId("altop")
            .setStyle("SECONDARY")
            .setDisabled(true),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(false),
        );
      await message.channel.send({ embeds: [embed], components: [rowtp] });
    } catch (error) {
      console.error("حدث خطأ :", error);
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "wetop") {
    const message = await interaction.channel.messages.fetch(
      interaction.message.id,
    );
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has("1182353465343737927")) {
          var points = db.get(`weekuser_${member.id}`);
          var weekwarns = db.get(`weekwarns_${member.id}`);
          var weekmute = db.get(`muteweek_${member.id}`);

          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({
              user: member.user,
              points,
              weekwarns,
              weekmute,
              totalPoints: points + weekwarns + weekmute,
            });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle("**Top 10 Week :**");
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription("**لا يوجد أعضاء يمتلكون نقاط في هذا الإسبوع .**");
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(
            `**#${index + 1} | **`,
            `**<@${user.user.id}> - ${user.points} Tickets - ${
              user.weekwarns
            } Warns - ${user.weekmute} Mutes - All Week : ${
              user.points + user.weekwarns + user.weekmute
            } **`,
          );
        });
      }
      let rowtpreply = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("All")
            .setCustomId("altop")
            .setStyle("SECONDARY")
            .setDisabled(false),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(true),
        );
      await message.edit({ embeds: [embed], components: [rowtpreply] });
    } catch (error) {
      console.error("حدث خطأ :", error);
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "altop") {
    const message = await interaction.channel.messages.fetch(
      interaction.message.id,
    );
    try {
      const memberList = await message.guild.members.fetch();
      let usersData = [];
      memberList.forEach((member) => {
        if (member.roles.cache.has("1182353465343737927")) {
          var points = db.get(`alluser_${member.id}`);
          var weekwarns = db.get(`allwarns_${member.id}`);
          var weekmute = db.get(`muteall_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          if (points > 0 || weekwarns > 0 || weekmute > 0) {
            usersData.push({
              user: member.user,
              points,
              weekwarns,
              weekmute,
              totalPoints: points,
            });
          }
        }
      });
      usersData.sort((a, b) => b.totalPoints - a.totalPoints);
      const embed = new MessageEmbed()
        .setColor(`${colorE}`)
        .setTitle("**Top 10 Points :**");
      const topUsers = usersData.slice(0, 10);
      if (topUsers.length === 0) {
        embed.setDescription("**لا يوجد أعضاء يمتلكون نقاط .**");
      } else {
        topUsers.forEach((user, index) => {
          embed.addField(
            `**#${index + 1} | **`,
            `**<@${user.user.id}> - ${user.points} Tickets - ${
              user.weekwarns
            } Warns - ${user.weekmute} Mutes - All Points : ${
              user.points + user.weekwarns + user.weekmute
            } **`,
          );
        });
      }
      let rowtpreply = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel("All")
            .setCustomId("altop")
            .setStyle("SECONDARY")
            .setDisabled(true),
        )
        .addComponents(
          new Discord.MessageButton()
            .setLabel("Week")
            .setCustomId("wetop")
            .setStyle("SECONDARY")
            .setDisabled(false),
        );
      await message.edit({ embeds: [embed], components: [rowtpreply] });
    } catch (error) {
      console.error("حدث خطأ :", error);
    }
  }
});

///////////
let messageCount = 0;
client.on("messageCreate", async (message) => {
  if (message.content.startsWith("$start")) {
    if (!message.member.roles.cache.some((r) => r.id == 1151903262556049450)) {
      return message.reply("**للأسف لا تمتلك صلاحية**");
    }
    try {
      const memberList = await message.guild.members.fetch();
      memberList.forEach(async (member) => {
        if (member.roles.cache.has("1151903317811810444")) {
          var points = db.get(`weekuser_${member.id}`);
          var weekwarns = db.get(`weekwarns_${member.id}`);
          var weekmute = db.get(`muteweek_${member.id}`);
          points = parseInt(points) || 0;
          weekwarns = parseInt(weekwarns) || 0;
          weekmute = parseInt(weekmute) || 0;
          messageCount++;
          var roleToAssign = "1151903317811810444";
          var roleToAssignHighStaff = "1151903303274332320";
          if (!member.roles.cache.some((r) => r.id == 1151903317811810444)) {
            if (points + weekwarns + weekmute >= 100) {
              roleToAssign = "دبل ترقية";
            } else if (
              points + weekwarns + weekmute >= 50 &&
              points + weekwarns + weekmute <= 99
            ) {
              roleToAssign = "ترقية";
            } else if (
              points + weekwarns + weekmute >= 15 &&
              points + weekwarns + weekmute <= 49
            ) {
              roleToAssign = "سكب";
            } else if (points + weekwarns + weekmute < 15) {
              roleToAssign = "تخفيض";
            }
          }
          if (member.roles.cache.some((r) => r.id == 1151903303274332320)) {
            if (points + weekwarns + weekmute >= 130) {
              roleToAssignHighStaff = "دبل ترقية";
            } else if (
              points + weekwarns + weekmute >= 90 &&
              points + weekwarns + weekmute <= 129
            ) {
              roleToAssignHighStaff = "ترقية";
            } else if (
              points + weekwarns + weekmute >= 20 &&
              points + weekwarns + weekmute < 90
            ) {
              roleToAssignHighStaff = "سكب";
            } else if (points + weekwarns + weekmute < 20) {
              roleToAssignHighStaff = "تخفيض";
            }
          }
          let replyMessage = `> ** الإداري : <@${
            member.user.id
          }>**\n> ** الإداري رقم : ${messageCount}**\n** عدد التكتات : ${points}\n عدد التحذيرات : ${weekwarns}\n عدد الميوتات : ${weekmute}\n مجموع النقاط الكلي : ${
            points + weekwarns + weekmute
          }**`;
          if (!member.roles.cache.some((r) => r.id == 1151903317811810444)) {
            if (roleToAssign !== "") {
              replyMessage += `\n**<:141414:1158892392217313351> النتيجة : ${roleToAssign}**`;
            }
          }
          if (member.roles.cache.some((r) => r.id == 1151903303274332320)) {
            if (roleToAssignHighStaff !== "") {
              replyMessage += `\n**<:141414:1158892392217313351> النتيجة : ${roleToAssignHighStaff}**`;
            }
          }

          await message.channel.send(replyMessage);
        }
      });
    } catch (error) {
      console.error("خطأ :", error);
    }
  }
});

// == [ Prv Rooms ]
client.on("messageCreate", async (message) => {
  const args = message.content.split(" ");
  const now = new Date();
  if (message.content.startsWith(prefix + "rm")) {
    if (message.member.roles.cache.some((r) => r.id == 1168972405063028838)) {
      let prv = message.guild.roles.cache.find(
        (r) => r.id == 1169201862268956702,
      );
      let Emoji = message.guild.roles.cache.find((r) => r.name == "- Mats");
      let DisStaff = message.guild.roles.cache.find(
        (r) => r.name == "- Discord Staff",
      );
      let args = message.content.split(" ");
      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.find((r) => r.id == args[1]);
      if (!args[1]) return message.reply(`${EmjFalse} | **منشن شخص !**`);
      if (!member) return message.reply(`${EmjFalse} | **منشن شخص !**`);
      if (db.has(`prvuser_${member.id}`))
        return message.reply(
          `${EmjFalse} | **هذا الشخص يمتلك بالفعل روم خاص**`,
        );
      if (!args[2]) return message.reply(`${EmjFalse} | **حدد مدة الروم !**`);
      if (!args[2].endsWith("d")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("m")) {
            return message.reply(
              `${EmjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`,
            );
          }
        }
      }
      if (isNaN(args[2][0]))
        return message.reply(`${EmjFalse} | **حدد وقت صحيح !**`);

      message.reply(
        `${EmjTrue} **| تم إنشاء روم خاص لـ ${member} لمدة \`${args[2]}\`**`,
      );

      let embed = new Discord.MessageEmbed()
        .setDescription(
          `** Eiffel \`S\` Private Rooms・الرومات الخاصه**\n\n> ** صاحب الروم : <@${
            member.id
          }> **
  
> ** صنع بواسطة : ${message.member} **
  
> ** صنع في : <t:${Math.floor(now.getTime() / 1000)}:d> **
  
> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[2])) / 1000)}:R> **

> ** مدة الروم : ${args[2]} **
`,
        )
        .setColor(`${colorE}`);
      let mm = await message.guild.channels
        .create(`∞・${member.user.username}`, { type: "text" })
        .then(async (m) => {
          const categoryId = '1169012400226312272';
          m.setParent(categoryId);
          member.roles.add([prv]).catch((err) => {});
          db.set(`prvuser_${member.id}`, member.id);
          db.set(`prvroom_${m.id}`, member.id);
          m.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
          });

          m.permissionOverwrites.edit(Emoji, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true,
          });
          m.permissionOverwrites.edit(DisStaff, {
            MANAGE_MESSAGES: true,
          });
          m.permissionOverwrites.edit(member.id, {
            SEND_MESSAGES: true,
            MENTION_EVERYONE: true,
            ATTACH_FILES: true,
          });

          m.send({ content: `<@${member.id}>`, embeds: [embed] });
          db.push(`room`, {
            server: message.guild.id,
            id: member.id,
            endsAt: Date.now() + ms(args[2]),
            channelid: m.id,
          });
        });
    }
  }
});

async function saleh() {
  if (db.has(`room`)) {
    const data = await db.get(`room`);
    for (const x of data) {
      let end = x.endsAt;
      let g = await x.server;
      if (end < new Date()) {
        const guild = await client.guilds.cache.get(g);
        const channel = await guild.channels.cache.find(
          (r) => r.id == x.channelid,
        );
        await db.set(`enduser_${x.id}`, x.id);
        await db.set(`endroom_${x.channelid}`, x.channelid);

        await channel.bulkDelete(100);

        const embed = new Discord.MessageEmbed()
          .setDescription(
            `** Eiffel S Rooms Ended・إنتهاء الروم**\n> ** لقد انتهت مدة هذا الروم، لديك مهلة 24 ساعه لتجديده ..**\n> ** للتجديد تواصل مع <#1162595280881987585> .**`,
          )
          .setColor(`${colorE}`)
          .setTimestamp();
        channel.permissionOverwrites.edit(guild.members.cache.get(x.id), {
          SEND_MESSAGES: false,
        });
        await channel.send({ content: `<@${x.id}>`, embeds: [embed] });

        const index = data.indexOf(x);
        if (index !== -1) {
          data.splice(index, 1);
          await db.set("room", data);
        }
      }
    }
  }
}
setInterval(async () => {
  saleh();
}, 10000);

client.on("messageCreate", async (message) => {
  const args = message.content.split(" ");
  const now = new Date();
  if (message.content.startsWith(prefix + "renew")) {
    if (message.member.roles.cache.some((r) => r.id == 1168972405063028838)) {
      let prv = message.guild.roles.cache.find(
        (r) => r.id == 1169201862268956702,
      );

      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.find((r) => r.id == args[1]);
      let channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((r) => r.id == args[2]);
      if (!args[1]) return message.reply(`${EmjFalse} | **منشن شخص !**`);
      if (!member) return message.reply(`${EmjFalse} | **منشن شخص !**`);
      if (!channel) return message.reply(`${EmjFalse} | **منشن الروم !**`);
      if (!args[2]) return message.reply(`${EmjFalse} | **منشن الروم !**`);

      if (!args[3]) return message.reply(`${emjFalse} | **حدد مدة الروم !**`);
      if (!args[3].endsWith("d")) {
        if (!args[3].endsWith("h")) {
          if (!args[3].endsWith("m")) {
            return message.reply(
              `${EmjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`,
            );
          }
        }
      }
      if (isNaN(args[3][0]))
        return message.reply(`${EmjFalse} | **حدد وقت صحيح !**`);

      if (!db.has(`enduser_${member.id}`))
        return message.reply(`${EmjFalse} | **هذا الشخص لا يمتلك روم منتهي**`);
      if (!db.has(`endroom_${channel.id}`))
        return message.reply(`${EmjFalse} | **هذا الروم ليس منتهي**`);

      message.reply(
        `${EmjTrue} **| تم تجديد الروم ${channel} لـ ${member} لمدة \`${args[3]}\`**`,
      );
      db.set(`prvuser_${member.id}`, member.id);
      db.set(`prvroom_${channel.id}`, member.id);
      let embed = new Discord.MessageEmbed()
        .setDescription(
          `** Manter \`S\` Private Rooms・الرومات الخاصه**\n\n> ** صاحب الروم : <@${
            member.id
          }> **
  
> ** تم التجديد بواسطة : ${message.member} **
  
> ** تم التجديد في : <t:${Math.floor(now.getTime() / 1000)}:d> **
  
> ** ينتهي في : <t:${Math.floor((now.getTime() + ms(args[3])) / 1000)}:R> **

> ** مدة الروم : ${args[3]} **
`,
        )
        .setColor(`${colorE}`);
      channel.bulkDelete(100);
      member.roles.add([prv]).catch((err) => {});
      db.delete(`enduser_${member.id}`);
      db.delete(`endroom_${channel.id}`);
      channel.permissionOverwrites.edit(member.id, {
        SEND_MESSAGES: true,
      });
      channel.send({ content: `<@${member.id}>`, embeds: [embed] });
      db.push(`room`, {
        server: message.guild.id,
        id: member.id,
        endsAt: Date.now() + ms(args[3]),
        channelid: channel.id,
      });
    }
  }
});

client.on("messageCreate", async (message) => {
  const args = message.content.split(" ");
  if (message.content.startsWith(prefix + "close")) {
    if (message.member.roles.cache.some((r) => r.id == 1168972405063028838)) {
      let prv = message.guild.roles.cache.find(
        (r) => r.id == 1169201862268956702,
      );
      let member =
        message.mentions.members.first() ||
        message.guild.members.cache.find((r) => r.id == args[1]);
      let channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((r) => r.id == args[2]);
      if (!args[1]) return message.reply(`${EmjFalse} | **منشن شخص !**`);
      if (!member) return message.reply(`${EmjFalse} | **منشن شخص !**`);
      if (!channel) return message.reply(`${EmjFalse} | **منشن الروم !**`);
      if (!args[2]) return message.reply(`${EmjFalse} | **منشن الروم !**`);
      if (!db.has(`prvuser_${member.id}`))
        return message.reply(`${EmjFalse} | **هذا الشخص ليس لديه روم خاص**`);
      await message.reply(
        `${EmjTrue} | **تم حذف الروم ${channel.name} للشخص ${member} .**`,
      );
      await channel.delete();
      await member.roles.remove([prv]);
      if (db.has(`enduser_${member.id}`)) {
        await db.delete(`enduser_${member.id}`);
      }
      if (db.has(`endroom_${channel.id}`)) {
        await db.delete(`endroom_${channel.id}`);
      }
      if (db.has(`prvuser_${member.id}`)) {
        await db.delete(`prvuser_${member.id}`);
      }
      if (db.has(`prvroom_${channel.id}`)) {
        await db.delete(`prvroom_${channel.id}`);
      }
      if (db.has(`room`)) {
        const data = await db.get(`room`);
        for (const x of data) {
          if (x.id == member.id) {
            if (x.channelid == channel.id) {
              const index = data.indexOf(x);
              if (index !== -1) {
                data.splice(index, 1);
                await db.set("room", data);
              }
            }
          }
        }
      }
    }
  }
});

client.on("channelDelete", async (channel) => {
  if (db.has(`prvroom_${channel.id}`)) {
    let member = channel.guild.members.cache.find(
      (r) => r.id == db.get(`prvroom_${channel.id}`),
    );
    if (db.has(`enduser_${member.id}`)) {
      await db.delete(`enduser_${member.id}`);
    }
    if (db.has(`endroom_${channel.id}`)) {
      await db.delete(`endroom_${channel.id}`);
    }
    if (db.has(`prvuser_${member.id}`)) {
      await db.delete(`prvuser_${member.id}`);
    }
    if (db.has(`prvroom_${channel.id}`)) {
      await db.delete(`prvroom_${channel.id}`);
    }
    if (db.has(`room`)) {
      const data = await db.get(`room`);
      for (const x of data) {
        if (x.id == member.id) {
          if (x.channelid == channel.id) {
            const index = data.indexOf(x);
            if (index !== -1) {
              data.splice(index, 1);
              await db.set("room", data);
            }
          }
        }
      }
    }
  }
});

//////////////////
client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith(prefix + "ميوت") ||
    message.content.startsWith(prefix + "mute")
  ) {
    if (message.content.startsWith(prefix + "mutes")) return;
    if (message.content.startsWith(prefix + "ميوتات")) return;
    let ch = "1184876271642095786";
    if (ch.includes(message.channel.id)) {
      const guild = message.guild;
      const channel10 = await guild.channels.cache.find(
        (r) => r.name == "໒・mute・log",
      );
      const now = new Date();
      let args = message.content.split(" ");
      if (!args) return message.reply("**حدد الشخص !**");
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.find((r) => r.id == args[1]);
      if (!user) return message.reply("**حدد الشخص !**");
      if (!args[2]) return message.reply(`${EmjFalse} | **حدد مدة الميوت !**`);
      if (!args[2].endsWith("d")) {
        if (!args[2].endsWith("h")) {
          if (!args[2].endsWith("m")) {
            return message.reply(
              `${EmjFalse}** | حدد الوقت بالأيام - بالساعات أو بالدقائق**`,
            );
          }
        }
      }
      if (isNaN(args[2][0]))
        return message.reply(`${EmjFalse} | **حدد وقت صحيح !**`);
      let role = message.guild.roles.cache.find((r) => r.name == "Muted");
      user.roles.add([role]).catch((err) => {});
      db.add(`muteweek_${message.member.id}`, 1);
      db.add(`muteall_${message.member.id}`, 1);

      message.reply(`**تم إسكات ${user} بنجاح !**`);

      let SpecialEmbedLog10 = new Discord.MessageEmbed()
        .setTitle(`** Add Order Mute !**`)
        .setDescription(
          `> ** تم إضافة ميوت لـ ${user} , المشرف المسؤول ${message.author} **
      ** إيدي الشخص : ${user.id}
       إيدي المشرف المسؤول : ${
         message.author.id
       } \n\n تاريخ إضافة الميوت : <t:${Math.floor(now.getTime() / 1000)}:d>**`,
        )
        .setColor(`${colorE}`)
        .setTimestamp();

      channel10.send({ embeds: [SpecialEmbedLog10] });
      db.set(`muted_${user.id}`, user.id);
      db.push(`mute`, {
        server: message.guild.id,
        id: user.id,
        endsAt: Date.now() + ms(args[2]),
      });
    }
  }
});

client.on("guildMemberAdd", (member) => {
  if (db.has(`muted_${member.id}`)) {
    db.push(`mute`, {
      server: member.guild.id,
      id: member.id,
      endsAt: Date.now() + ms(`5h`),
    });
    member.roles.add([member.guild.roles.cache.find((r) => r.name == "Muted")]);
  }
});

client.on("guildMemberRemove", async (member) => {
  if (db.has(`muted_${member.id}`)) {
    if (db.has(`mute`)) {
      const data = await db.get(`mute`);
      for (const x of data) {
        if (x.id == member.id) {
          const index = data.indexOf(x);
          if (index !== -1) {
            data.splice(index, 1);
            await db.set("mute", data);
          }
        }
      }
    }
  }
});

async function mute() {
  if (db.has(`mute`)) {
    const data = await db.get(`mute`);
    for (const x of data) {
      let end = x.endsAt;
      let g = await x.server;
      if (end < new Date()) {
        const guild = await client.guilds.cache.get(g);
        const member = await guild.members.cache.get(x.id);
        const role = await guild.roles.cache.find((r) => r.name == "Muted");
        const channel = await guild.channels.cache.find(
          (r) => r.name == "໒・mute・log",
        );
        channel.send(`**لقد انتهت مدة الميوت للشخص ${member} .**`);
        member.roles.remove([role]).catch((err) => {});
        db.delete(`muted_${member.id}`);
        const index = data.indexOf(x);
        if (index !== -1) {
          data.splice(index, 1);
          await db.set("mute", data);
        }
      }
    }
  }
}
setInterval(async () => {
  mute();
}, 15000);

////////////

client.on("messageCreate", (message) => {
  if (
    message.content.startsWith("$discount") ||
    message.content.startsWith("$تخفيض") ||
    message.content.startsWith("تخفيض")
  ) {
    const discountPercentage = message.content.split(" ")[1];
    if (
      isNaN(discountPercentage) ||
      discountPercentage < 0 ||
      discountPercentage > 100
    )
      return message.reply("**حدد نسبة بين 0 و 100 !**");
    const originalPrice = message.content.split(" ")[2];
    if (isNaN(originalPrice) || originalPrice <= 0)
      return message.reply("**حدد رقم للخصم !**");
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    message.reply(
      `** المبلغ الاساسي : ${originalPrice}**\n** نسبة الخصم : ${discountPercentage}%**\n **قيمة الخصم : ${discountAmount}**\n **المبلغ النهائي مع الخصم : ${discountedPrice}**`,
    );
  }
});
client.on("messageCreate", (message) => {
  if (message.content === prefix + "setup") {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.reply("لا يُسمح لك باستخدام هذا الأمر.");
    }

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("apply")
        .setEmoji("<:12:1211716689616441406>")  
        .setStyle("SECONDARY"),
    );
    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setTitle("**نموذج التقديم :**")
      .setDescription(
        `**
> تـم فـتـح الـتـقـديـم عـلـي الإدارة
-
>  أسـمـك :
>  عـمـرك :
>  بـلـدك :
-
>  كـم مـدة تـفـاعـلـك :
>  خـبـراتـك :
>  الرابط : أجـبـاري

https://discord.gg/eiffel`,
      )
      .setColor(`${colorE}`)
      .setImage(`https://media.discordapp.net/attachments/1196091329084674149/1208111148071788594/image.png?ex=65e2182f&is=65cfa32f&hm=0c700fac2b13cf28e9c37d3cec822b1e2216290dc0a0945a027cf063114b2587&=&format=webp&quality=lossless&width=1439&height=382`)
      .setFooter({ text: `Eiffel S` , iconURL: `https://media.discordapp.net/attachments/1196091329084674149/1208112074362986596/image_prev_ui_1.png?ex=65e2190c&is=65cfa40c&hm=7968e82af572ca3f2a724f97eea532a60a5bed12bdc5cb2e49f3478a9ae64784&=&format=webp&quality=lossless&width=1105&height=426` })
      .setThumbnail(message.guild.iconURL());
    message.delete();
    message.channel.send({ components: [row], embeds: [embed] });
  }
});

const cooldown = new Set();

const discordModals = require("discord-modals");
discordModals(client);
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId === "apply") {
    if (cooldown.has(interaction.member.id))
      return interaction.reply({ content: "Cooldown !", ephemeral: true });
    let user = db.get(`user_${interaction.member.id}`);
    if (db.has(`userapply_${interaction.member.id}`))
      return interaction.reply({
        content: "**انت بالفعل على قائمة المقدمين !**",
        ephemeral: true,
      });
    if (
      interaction.member.roles.cache.some((r) => r.id == 1200465251385212988) ||
      interaction.member.roles.cache.some((r) => r.id == 1200465251385212988)
    )
      return interaction.reply({
        content: "**انت بالفعل اداري**",
        ephemeral: true,
      });
    const {
      Modal,
      TextInputComponent,
      SelectMenuComponent,
      showModal,
    } = require("discord-modals");

    const modal = new Modal()
      .setCustomId("modal")
      .setTitle("نموذج التقديم :")
      .addComponents(
        new TextInputComponent()
          .setCustomId("name")
          .setLabel("مـا أسـمـك ؟")
          .setRequired(true)
          .setPlaceholder("أدخـل أسـمـك هـنـا")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("age")
          .setRequired(true)
          .setPlaceholder("أدخـل عمرك هـنـا")
          .setLabel("كـم عـمـرك ؟")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("country")
          .setRequired(true)
          .setPlaceholder("أدخـل بـلـدك هـنـا")
          .setLabel("مـن ويــن ؟")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("active")
          .setRequired(true)
          .setPlaceholder("أدخـل مـدة تـفـاعـلـك هـنـا")
          .setLabel("كـم مـدة تـفـاعـلـك ؟")
          .setStyle("SHORT"),

        new TextInputComponent()
          .setCustomId("shop")
          .setRequired(true)
          .setPlaceholder("أدخـل هـنـا خـبـراتـك")
          .setLabel("خـبـراتـك ؟")
          .setStyle("LONG"),
      );

    showModal(modal, {
      client: client,
      interaction: interaction,
    });
  }
});

client.on("modalSubmit", async (modal) => {
  if (modal.customId == "modal") {
    let ch = db.get(`channel_${modal.guild.id}`);
    let channel = modal.guild.channels.cache.find(
      (c) => c.id == 1211712446402928690,
    );
    const name = modal.getTextInputValue("name");
    const age = modal.getTextInputValue("age");
    const country = modal.getTextInputValue("country");
    const active = modal.getTextInputValue("active");
    const shop = modal.getTextInputValue("shop");

    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setEmoji(`${EmjTrue}`)
        .setCustomId("acc")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setEmoji(`${EmjFalse}`)
        .setCustomId("dec")
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setEmoji("🤐")
        .setCustomId("time")
        .setStyle("SECONDARY"),
    );
    let embed = new Discord.MessageEmbed()
      .setAuthor({
        name: `${modal.member.user.username}`,
        iconURL: `${modal.member.user.displayAvatarURL()}`,
      })
      .setFooter({ text: modal.guild.name, iconURL: modal.guild.iconURL() })
      .setTimestamp()
      .setThumbnail(modal.guild.iconURL())
      .setTitle("**تقديم جديد !**")
      .setDescription(
        `**الشخص : <@${modal.member.id}>**\n\n>  **الأسـم : ${name}**\n\n>  **الـعـمـر : ${age}**\n\n>  **الـبـلـد : ${country}**\n\n>  **مـدة الـتـفـاعـل : ${active}**\n\n>  **خـبـراتــه : ${shop}**`,
      )
      .setColor(`${colorE}`);
    modal.reply({ content: "تم ارسال تقديمك !", ephemeral: true });
    channel
      .send({ content: `${modal.member}`, embeds: [embed], components: [row] })
      .then((m) => {
        db.set(`userapply_${modal.member.id}`, modal.member.id);
        db.set(`userm_${m.id}`, modal.member.id);
      });
  }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
    if (
      !interaction.member.roles.cache.some((r) => r.id == "1211691455651782666")
    )
      return interaction.reply({
        content: "**ما تقدر تستعمل هذا الامر**",
        ephemeral: true,
      });
      
    if (interaction.customId == "acc") {
      let user = db.get(`userm_${interaction.message.id}`);
      let member = interaction.guild.members.cache.get(user);
      let role = interaction.guild.roles.cache.find(
        (r) => r.id == "1169196867586883584", 
      );
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تقديم مقبول من : ${member} ${EmjTrue}**`)
        .setAuthor({
          name: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(`${colorE}`)
        .setTimestamp();
      member.roles.add([role]).catch((err) => {});
      member
        .send(
          `**لقد تم قبول تقديمك !**\n**الرجاء مراجعة هذه الرومات و حفظ ما فيها :**\n<#1163871132802355323> | <#1163871135679660113> | <#1205152002313818112>`
        )
        .catch((err) => {});
      interaction.message.edit({
        content: `${member}`,
        embeds: [embed],
        components: [],
      });
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`);
      db.delete(`userm_${interaction.message.id}`);
    }
    
    if (interaction.customId == "dec") {
      let user = db.get(`userm_${interaction.message.id}`);
      let member = interaction.guild.members.cache.get(user);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تقديم مرفوض من : ${member} ${EmjFalse}**`)
        .setAuthor({
          name: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(`${colorE}`)
        .setTimestamp();
      interaction.message.edit({
        content: `${member}`,
        embeds: [embed],
        components: [],
      });
      member
        .send(`**لقد تم رفض تقديمك ! الرجاء عدم التقديم مرة ثانية لتجنب الميوت .**`)
        .catch((err) => {});
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`);
      db.delete(`userm_${interaction.message.id}`);
    }
    
    if (interaction.customId == "time") {
      let user = db.get(`userm_${interaction.message.id}`);
      let member = interaction.guild.members.cache.get(user);
      let embed = new Discord.MessageEmbed()
        .setDescription(`**لقد تم اسكات : ${member} 🤐**`)
        .setAuthor({
          name: member.user.username,
          iconURL: member.user.displayAvatarURL(),
        })
        .setFooter({
          text: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(`${colorE}`)
        .setTimestamp();
      interaction.message.edit({
        content: `${member}`,
        embeds: [embed],
        components: [],
      });
      member.send(`**لقد تم اسكاتك !**`).catch((err) => {});
      member.timeout(86400000).catch((err) => {});
      db.delete(`userapply_${db.get(`userm_${interaction.message.id}`)}`);
      db.delete(`userm_${interaction.message.id}`);
    }
  }
});


let buttonwinner = false;

client.on("messageCreate", async (message) => {
  if (
    message.content == prefix + "زر" ||
    message.content == prefix + "button"
  ) {
    const wait = require("node:timers/promises").setTimeout;
    buttonwinner = false;
    const embed = new Discord.MessageEmbed()
      .setTitle("**اسرع شخص يضغط الزر : ⚡**")
      .setDescription(
        "**معكم 10 ثواني تضغطون الزر**\n**اسرع واحد يضغط الزر يفوز**",
      )
      .setTimestamp()
      .setColor("333333");
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r1")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r2")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r3")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r4")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r5")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    );
    const row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r6")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r7")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r8")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r9")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r10")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    );
    const row3 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r11")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r12")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r13")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r14")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r15")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    );
    const row4 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("r16")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r17")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r18")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r19")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
      new Discord.MessageButton()
        .setCustomId("r20")
        .setLabel("・")
        .setDisabled(true)
        .setStyle("SECONDARY"),
    );
    message.channel
      .send({ components: [row, row2, row3, row4], embeds: [embed] })
      .then(async (m) => {
        await wait(3500);
        const all = [
          ...row.components,
          ...row2.components,
          ...row3.components,
          ...row4.components,
        ];
        const r = Math.floor(Math.random() * all.length);
        const button = all[r];
        button.setStyle("SUCCESS");
        button.setDisabled(false);
        const embed2 = new Discord.MessageEmbed()
          .setTitle("**اسرع شخص يضغط الزر : ⚡**")
          .setDescription(
            "**معكم 10 ثواني تضغطون الزر**\n**اضغط على الزر الأخضر 🟢**",
          )
          .setTimestamp()
          .setColor("GREEN");
        m.edit({ components: [row, row2, row3, row4], embeds: [embed2] });
        const time = setTimeout(() => {
          button.setDisabled(true);
          button.setStyle("DANGER");
          const embed3 = new Discord.MessageEmbed()
            .setTitle("**اسرع شخص يضغط الزر : ⚡**")
            .setDescription("**انتهى الوقت**\n**🔴 لا يوجد اي فائز**")
            .setTimestamp()
            .setColor("RED");
          m.edit({ components: [row, row2, row3, row4], embeds: [embed3] });
        }, 10000);
        client.on("interactionCreate", (interaction) => {
          if (interaction.isButton()) {
            if (
              interaction.customId == `${button.customId}` &&
              buttonwinner == false
            ) {
              buttonwinner = true;
              button.setDisabled(true);
              const embed4 = new Discord.MessageEmbed()
                .setTitle("**اسرع شخص يضغط الزر : ⚡**")
                .setDescription(`**👑 | ${interaction.member}**`)
                .setTimestamp()
                .setColor("YELLOW");
              m.edit({ components: [row, row2, row3, row4], embeds: [embed4] });
              interaction.channel.send(
                `**⚡ | الفائز هو : ${interaction.member}**`,
              );
              interaction.deferUpdate();
              clearTimeout(`${time}`);
            }
          }
        });
      });
  }
});


client.on("messageCreate", async (message) => {
  const roleId = "1211691455651782666";
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(prefix + "spin")
  )
    return;
  const guildId = message.guild.id;
  if (guildId !== "1001033892876255342") {
    await message.reply("**الامر غير متاح**.");
    return;
  }
  let data = db.get(`guildData_${guildId}`) || [];
  if (!data || data.length === 0) {
    await message.reply("**لا يوجد جوائز حاليا**.");
    return;
  }
  const member = message.guild.members.cache.get(message.author.id);
  if (!member.roles.cache.has(roleId)) {
    await message.reply("**لا يوجد معك صلاحية**");
    return;
  }
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomExtra = data[randomIndex];
  const embed = new MessageEmbed()
    .setTitle("Congratulations, You Won :")
    .setDescription(`> **${randomExtra}** `)
    .setColor(`${colorE}`)
    .setFooter("Eiffel Spin", message.guild.iconURL({ dynamic: true }));

  await message.channel.send({ embeds: [embed] });
});

client.on("messageCreate", async (message) => {
  const roleId = "1211691455651782666";
  if (!message.guild || message.author.bot) return;
  const [command, ...args] = message.content.slice(prefix.length).split(" ");
  if (command === "addspin") {
    if (!message.member.roles.cache.has(roleId)) {
      await message.reply("**لا يوجد معك صلاحية**");
      return;
    }
    const guildId = message.guild.id;
    let data = db.get(`guildData_${guildId}`) || [];
    if (args.length === 0) {
      await message.reply("**اكتب المكافأة**.");
      return;
    }
    const extrasToAdd = args.filter((extra) => !data.includes(extra));
    if (extrasToAdd.length === 0) {
      await message.reply("**المكافأة موجودة بالفعل**.");
      return;
    }
    data.push(...extrasToAdd);
    db.set(`guildData_${guildId}`, data);
    await message.reply("**تم الاضافة بنجاح**.");
  }
});
const replace = [
  {
    word: "بيع",
    replace: "بيــ3",
  },
  {
    word: "شراء",
    replace: "$ــراء",
  },
  {
    word: "حساب",
    replace: "7ساب",
  },
  {
    word: "وسيط",
    replace: "9سـيط",
  },
  {
    word: "هاك",
    replace: "هـ-ــاك",
  },
  {
    word: "شوب",
    replace: "شـ9ب",
  },
  {
    word: "متجر",
    replace: "متـ_gـر",
  },
  {
    word: "ديسكورد",
    replace: "ديسـkـورد",
  },
  {
    word: "سعر",
    replace: "سـ3ـر",
  },
  {
    word: "نيترو",
    replace: "نـيـtـرو",
  },
  {
    word: "متوفر",
    replace: "متـ9فـر",
  },
];

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "تشفير")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return;
    const embed = new MessageEmbed()
    .setTitle("**تشفير**")
    .setDescription("***لتشفير منشورك يرجى ضغط الزر وضع منشورك***")
      .setColor(`${colorE}`)
      .setImage("https://media.discordapp.net/attachments/1186423150746017902/1206326946255085631/f9bc1f9418039ed6.jpg?ex=65db9a84&is=65c92584&hm=2b12c7bd0f59a6f694ed390515035717acd5c37905c910dfa07271e91c0bc4bf&=&format=webp&width=1439&height=383");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("تشفير")
        .setCustomId("replace"),
    );
    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on("interactionCreate", async (i) => {
  if (!i.isButton()) return;
  if (i.customId == "replace") {
    const modal = new Modal().setTitle("Replacer").setCustomId("rep");

    const replacer = new TextInputComponent()
      .setCustomId("replacetext")
      .setLabel(`قـم بـ وضـع مـنـشـورك هـنـا .`)
      .setPlaceholder(`ضع منشورك هنا`)
      .setMaxLength(2000)
      .setRequired(true)
      .setStyle("PARAGRAPH");

    const rows = [replacer].map((component) =>
      new MessageActionRow().addComponents(component),
    );
    modal.addComponents(...rows);
    i.showModal(modal);
  }
});

client.on("interactionCreate", async (i) => {
  if (!i.isModalSubmit()) return;
  if (i.customId == "rep") {
    let text = i.fields.getTextInputValue("replacetext");
    let replaced = false;

    replace.forEach((t) => {
      const regex = new RegExp(t.word, "g");
      if (regex.test(text)) {
        text = text.replace(regex, t.replace);
        replaced = true;
      }
    });

    if (replaced) {
      i.reply({
        content: `\`المنشور بعد التشفير :\`\n\n ${text}`,
        ephemeral: true,
      });
    } else {
      i.reply({ content: "**منشورك لا يحتاج للتشفير**", ephemeral: true });
    }
  }
});
process.on("unhandledRejection", (e) => {
  console.log(e);
});
////////////
const channelId = "1151903417753677975"; // ايدي روم الي هيترسل فيها
const messageContent = "**اللهم صلي وسلم وبارك علي سيدنا محمد**";

setInterval(() => {
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;

  if (channel.isText() && messageContent) {
    channel.send(messageContent);
  }
}, 3600000);

const channelId1 = "1162595281683103800"; //
const reactions = ["<:999:1184916942017003630>", "<:888:1184916761037000765>"]; //

client.on("messageCreate", async (message) => {
  //
  if (message.author && message.channelId === channelId1) {
    //
    for (const reaction of reactions) {
      await message.react(reaction);
    }
  }
});

client.on("messageCreate", (msg) => {
  if (msg.channel.id === "1162595280257028244") {
    msg.react("<a:love:1184975022771671090>");
  }
});

client.on('messageCreate', (message) => {
    if (message.content == 'خط') {
      if (message.author.bot) return ; 
      if (!message.member.permissions.has("ADMINISTRATOR"))
        return
           message.delete()
        message.channel.send({files : [`https://media.discordapp.net/attachments/1196091329084674149/1208111660296830996/1031289246897668258.webp?ex=65e218a9&is=65cfa3a9&hm=4cf8df5e6ec92c6ded0cb8c08cd3ade40a4eb4e5ee375666e60195bf639c8149&=&format=webp&width=1265&height=147`]});
    }
});

 let role = "1169196748347035728"//ايدي الرول يلي تنعطى للشخص

client.on("messageCreate" , message => {
  if(message.content == "setupp") {
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
      .setEmoji("<:__:1184903030143983746>")
      .setCustomId("prove")
      .setStyle("SECONDARY")
    )
    let embed = new Discord.MessageEmbed()
    .setDescription(`**إثبت نفسك بالضغط علي الزر في الأسفل.
ملاحظة : إثبت نفسك لتظهر لك الرومات.**`)
    .setColor(`${colorE}`)
    .setImage(`https://media.discordapp.net/attachments/1183875520434290809/1184899759870333048/0da3f95adb69293a.png?ex=658da6e5&is=657b31e5&hm=5e1493b4c3f3f78a3656e8f21a48580894fa17fee3df3aab2694991cbdf0ce13&=&format=webp&quality=lossless`)
    message.delete()
    message.channel.send({embeds:[embed] , components:[row]})
  }
});

client.on("interactionCreate" , interaction => {
  if(interaction.isButton()) {
    if(interaction.customId == "prove") {
      let role2 = interaction.guild.roles.cache.find(r=>r.id == role)
      if(!interaction.member.roles.cache.some(r=>r.id == role2.id)) {
        interaction.member.roles.add([role2])
        interaction.reply({content:`** لقد تم اعطائك الرتبة بنجاح **` , ephemeral:true})
      }
      if(interaction.member.roles.cache.some(r=>r.id == role2.id)) {
        interaction.member.roles.remove([role2])
        interaction.reply({content:`**تم حذف الرتبة منك**` , ephemeral:true})
      }
    }
 }
});

client.on('messageCreate', message => {
  if (message.content.startsWith(prefix + `تحويل`))
   //الرسالة {
    return message.channel.send(`**الـتـحـويـل فـقـط لـ <@796861763902636052> .**`) //الرد
  }
);

client.on("messageCreate", (message) => {
  if (
    message.content.startsWith(prefix + "info") ||
    message.content.startsWith(prefix + "معلومات")
  ) {
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId == "Rarole") {
    const message = await interaction.channel.messages.fetch(
      interaction.message.id,
    );
    let embed2 = new MessageEmbed()
      .setDescription(`** Eiffel \`S\`  __Rare__Role__S__

> <:12121212:1184917708597379293> __Role Mention__ : <@&1162595277283278959>  
> <:12121212:1184917708597379293> __Cost__ \`:\` \`700,000\` __Credits__<:262626:1184920131952967802> 
> <:666:1184914873956704346> لأول 50 بالسيرفر
> <:666:1184914873956704346> جميع خواص رتبة Vip
> <:666:1184914873956704346> روم خاص بالرتبة مع باقي الرومات
> <:666:1184914873956704346> إمكانية منشن افري ون مرتين كل يوم في الروم الخاص بالرتبه
> <:666:1184914873956704346> رتبه بإسمك + تغيير لونها
> <:666:1184914873956704346> منشور مميز برودكاست كل اسبوع مره
<:151515:1184918629272264775><:151515:1184918629272264775><:151515:1184918629272264775><:151515:1184918629272264775><:151515:1184918629272264775><:151515:1184918629272264775>
> <:12121212:1184917708597379293> __Role Mention__ : <@&1162595277253906582>  
> <:12121212:1184917708597379293> __Cost__ \`:\` \`400,000\` __Credits__<:262626:1184920131952967802>
> <:666:1184914873956704346> لأول 100 بالسيرفر
> <:666:1184914873956704346> إمكانية النشر بكل الرومات
> <:666:1184914873956704346> روم خاص بالرتبة
> <:666:1184914873956704346> امكانية منشن افري ونمره كل يوم  في الروم الخاص بالرتبة
> <:666:1184914873956704346> لون اسود
> <:666:1184914873956704346> رتبة بأسمك
> <:666:1184914873956704346> منشور مميز كل اسبوع مره
   **`)
      .setColor(`${colorE}`);
    message.edit({ embeds: [embed2], components: [] });

    setTimeout(() => {
      interaction.channel.send(`**التحويل فقط لـ <@796861763902636052> .**`);
    }, 500);
  }
});

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "اعلان")) {
    if (message.member.roles.cache.some(r=> r.id == Disowners)) {

if(message.content.startsWith(prefix + "اعلانات")) return false;

member = message.mentions.members.first()
      if (!member) return message.reply("** يرجى منشن صاحب الاعلان أولاً !**")
manshor = message.content.split(" ").slice(2).join(" ");
  if (!manshor) return message.reply("** يرجى وضع الاعلان أولاً !**")

let embed = new Discord.MessageEmbed()
      .setTitle(`** إختر نوع المنشن :**`)
      .setDescription(`** يرجى إختيار نوع المشنن المناسب : \`Here\` أو \`Everyone\`\nالاعلان :\n\`${manshor}\`**`)
      .setColor(`${colorE}`)
  let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Here")
        .setCustomId("adhere")
        .setStyle("SECONDARY")
    )
  .addComponents(
   new Discord.MessageButton()
        .setLabel("Everyone")
        .setStyle("SECONDARY")
        .setCustomId("adeve")
    )

  message.reply({ embeds: [embed], components: [row] })
            }}});

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

 if (interaction.customId === "adhere") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners) || interaction.member.permissions.has('ADMINISTRATOR')) {
    const message = await interaction.channel.messages.fetch(interaction.message.id); 

const heremanshor = `@here\n${manshor}`


let embed2 = new Discord.MessageEmbed()
      .setTitle(`** هل انت متأكد من إرسال الاعلان ؟**`)
  .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`Send\` أو \`Cancel\` ..\n الاعلان :\n\`${heremanshor}**`)
      .setColor(`${colorE}`)
  let row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Send")
        .setCustomId("adhcompleteid")
        .setStyle("SUCCESS")
    )
  .addComponents(
   new Discord.MessageButton()
        .setLabel("Cancel")
        .setCustomId("adhcancelid")
        .setStyle("DANGER")
    )

    message.edit({ embeds: [embed2], components: [row2] });
      } else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  } else if (interaction.customId === "adeve") {
    if (interaction.member.roles.cache.some((role) => role.id === Disowners) || interaction.member.permissions.has('ADMINISTRATOR')) {
    const message = await interaction.channel.messages.fetch(interaction.message.id); 

const evemanshor = `@everyone\n${manshor}`


let embed2 = new Discord.MessageEmbed()
      .setTitle(`** هل انت متأكد من إرسال الاعلان ؟**`)
  .setDescription(`** يرجى الإستجابة مع الأزرار بـ \`Send\` أو \`Cancel\` ..\n الاعلان :\n\`${evemanshor}**`)
      .setColor(`${colorE}`)
  let row2 = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel("Send")
        .setCustomId("adecompleteid")
        .setStyle("SUCCESS")
    )
  .addComponents(
   new Discord.MessageButton()
        .setLabel("Cancel")
        .setCustomId("adecancelid")
        .setStyle("DANGER")
    )

    message.edit({ embeds: [embed2], components: [row2] });
      } else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
    }
  }
});        

client.on("interactionCreate" , async interaction => {
if(interaction.customId == "adecancelid") {
if (interaction.member.roles.cache.some((role) => role.id === Disowners) || interaction.member.permissions.has('ADMINISTRATOR')) {
const message = await interaction.channel.messages.fetch(interaction.message.id);

let embed3 = new Discord.MessageEmbed()
  .setColor(`${colorE}`)
  .setDescription(`** تم إلغاء إرسال هذا الاعلان .
 بواسطة :
${interaction.member}
**`)

message.edit({ embeds: [embed3], components: [] });
} else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
}
}});

client.on("interactionCreate" , async interaction => {
if(interaction.customId == "adhcompleteid") {
if (interaction.member.roles.cache.some((role) => role.id === Disowners) || interaction.member.permissions.has('ADMINISTRATOR')) {
const message = await interaction.channel.messages.fetch(interaction.message.id);
const now = new Date();
  const adChannel = client.channels.cache.get('1163871078167355493');
  const adLog = interaction.guild.channels.cache.get('1211950213053423667');

  const memhere = `${member}`
  const manshorhere = `\n${manshor}\n 
\`-\` ||@here|| `


let embed5 = new Discord.MessageEmbed()
  .setColor(`${colorE}`)
  .setDescription(`** تم إرسال هذا الاعلان إلى ${adChannel}
 بواسطة :
${interaction.member}
**`)

message.edit({ embeds: [embed5], components: [] });

  await adChannel.send(`${manshorhere}`);
  await adChannel.send(`**إعـلان مـدفـوع لـيـس لـنـا أي عـلاقـة بـ أي شـيء يـصـيـر فـي الـسـيـرفـر .**`)
  await adChannel.send({ files: [lineLink] });

await adLog.send(`** \n\`${manshor}\`\n  :\n@here\n   **`)
await adLog.send({ files: [lineLink] });

} else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
}
}});

client.on("interactionCreate" , async interaction => {
if(interaction.customId == "adecompleteid") {
if (interaction.member.roles.cache.some((role) => role.id === Disowners) || interaction.member.permissions.has('ADMINISTRATOR')) {
const message = await interaction.channel.messages.fetch(interaction.message.id);
const now = new Date();
  const adChannel2 = client.channels.cache.get('1163871078167355493');
  const adLog2 = interaction.guild.channels.cache.get('1211950213053423667');

  const memeve = `${member}`
  const manshoreve = `\n${manshor}\n
\`-\` ||@everyone||`

let embed5 = new Discord.MessageEmbed()
  .setColor(`${colorE}`)
  .setDescription(`** تم إرسال هذا الاعلان إلي ${adChannel2}
 بواسطة :
${interaction.member}
**`)

message.edit({ embeds: [embed5], components: [] });

  await adChannel2.send(`${manshoreve}`);
  await adChannel2.send(`**إعـلان مـدفـوع لـيـس لـنـا أي عـلاقـة بـ أي شـيء يـصـيـر فـي الـسـيـرفـر .**`)
  await adChannel2.send({ files: [lineLink] });

await adLog2.send(`**\n\`${manshor}\`\n  \`-\`\n@everyone\n   **`)
await adLog2.send({ files: [lineLink] });

} else {
      interaction.reply({ content: `** لا يمكنك إستخدام هذا الزر .**`, ephemeral: true });
}
}});
// خط تلقائي 
/*const { MessageAttachment } = require('discord.js');

client.on('messageCreate', (message) => {
  // تحديد الرومات المستهدفة
  let targetChannelIds= ["1201884652944760904", "1201884627040735252", "1201884567695261706", "1201884537811111986", "1201884513840668713", "1201884457838317568", "1201884420479664129", "1201884375470583818", "1202926690188263434"]; // قم بوضع أيدي الرومات هنا

  if (targetChannelIds.includes(message.channel.id) && !message.author.bot) {
    // إرسال الخط
    const attachment = new MessageAttachment('https://media.discordapp.net/attachments/1196091329084674149/1208111660296830996/1031289246897668258.webp?ex=65e218a9&is=65cfa3a9&hm=4cf8df5e6ec92c6ded0cb8c08cd3ade40a4eb4e5ee375666e60195bf639c8149&=&format=webp&width=1265&height=147');

    message.channel.send({ files: [attachment] });
  }
}); */

// اقتراحات
client.on("message", async (message) => {
  if (message.channel.id === "1207389287960551464") { // أيدي الروم المحدد
    await message.react("<:emoji_46:1201160871670460456>"); // رياكشن الموافقة
    await message.react("<:emoji_45:1201160762538864721>"); // رياكشن الرفض
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.channel.id === "1211730251282124810" && !user.bot) {
    if (reaction.emoji.name === "<:emoji_46:1201160871670460456>") {
      // رد فعل الموافقة
      reaction.message.channel.send(`تمت الموافقة على الاقتراح من قبل ${user.username}`);
    } else if (reaction.emoji.name === "<:emoji_45:1201160762538864721>") {
      // رد فعل الرفض
      reaction.message.channel.send(`تم رفض الاقتراح من قبل ${user.username}`);
    }
  
    reaction.remove(); // إزالة رد الفعل بعد التعامل معه
  }
});



// اظهار الرومات كلها
client.on('message', (message) => {
  if (message.content === '$roomsall') {
    const guild = message.guild;
    const channels = guild.channels.cache.filter((channel) => channel.type === 'text' || channel.type === 'voice');
    
    let channelList = '';
    channels.forEach((channel) => {
      channelList += `${channel.name} - ${channel.type}\n`;
    });
    
    message.channel.send(`قائمة الرومات:\n${channelList}`);
  }
});
// ban code.
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    let c = message.content.split(' ')
    if (c[0] == prefix + 'ban') {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permissions **`);
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return;
      
    let argss = message.content.split(' ')
    let user = message.guild.members.cache.get(argss[1]) || message.mentions.members.first();
    if(!user) return message.reply(`** 😕 Please mention member or id **`);
 if(user.roles.highest.position > message.member.roles.highest.position && message.author.id !== message.guild.fetchOwner().id) return message.reply(`** ❌ You can't ban this user**`);
      
    if(!user.bannable) return message.reply(`** ❌ You can't ban this user**`);
    await user.ban().catch(err => {console.log(err)});
     await message.reply(`✅**${user.user.tag} banned from the server!**✈️`);
    }
})  
// unban
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + 'unban')) {
if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`** 😕 You don't have permissions **`);
if(!message.guild.me.permissions.has("BAN_MEMBERS")) return;
    let args = message.content.split(' ')
    let id = args[1];
    if(!id)  return message.reply(`** 😕 Please mention member or id **`);
    if(isNaN(id)) {
       return message.reply(`** 😕 Please mention member or id **`);
    } else {
message.guild.members.unban(id).then(mmm => {
        message.reply(`✅** ${mmm.tag} unbanned!**`)
      }).catch(err => message.reply(`**I can't find this member in bans list**`));
      }
    }
}) 
// server
client.on("messageCreate", async message => {
  if(message.content.startsWith(prefix+"server")){
      if(message.author.bot) return;
  const verificationLevels = {NONE: '0',LOW: '1',MEDIUM: '2',HIGH: '3',VERY_HIGH: '4'};
      let on = message.guild.presences.cache.filter(e => e.status == 'online').size - 1 || 0
  let idle = message.guild.presences.cache.filter(e => e.status == 'idle').size + 1 || 0
  let dnd = message.guild.presences.cache.filter(e => e.status == 'dnd').size || 0
      var embed  = new MessageEmbed()
  .setThumbnail(message.guild.iconURL({dynamic:true})) 
        .addFields([
      {
      name: `🆔 Server ID: `,
      value: `**${message.guild.id}**`
  },
      {
      name: `📅 Created On: `,
      value: `**<t:${parseInt(message.guild.createdAt / 1000)}:R>**`
  }, 
      {
        name: `👑 Owned by: `, 
        value: `**${await message.guild.fetchOwner()}**`
  }, 
        {
          name: `👥  Members: (**${message.guild.memberCount}**)`, 
          value: `**${Math.floor(on + idle + dnd)}** **Online \n${message.guild.premiumSubscriptionCount} Boosts ✨**`
  }, 
          {
            name: `💬 Channels: (${message.guild.channels.cache.size})`, 
            value: `**${message.guild.channels.cache.filter(m => m.type === 'GUILD_TEXT').size}** **Text | ${message.guild.channels.cache.filter(m => m.type === 'GUILD_VOICE').size} Voice**`
  }, 
          {
            name: `🌍 Others: `, 
            value: `**Verification Level: ${verificationLevels[message.guild.verificationLevel]}**`
  },
          {
            name: `🔐 Roles:(${message.guild.roles.cache.size})`, 
            value: `**To see a list with all roles use ${prefix}roles**`
  }, 
  ])  
  .setColor(message.guild.me.displayHexColor)
  .setAuthor(`${message.guild.name}`, `${message.guild.iconURL({dynamic:true})}`)
      message.reply({embeds: [embed]})
    }
  })
// avatar
client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + `avatar`)) {
    const mention = message.mentions.users.first();
    let userId = mention ? mention.id : message.content.split(' ')[1];

    if (!userId) {
      userId = message.author.id;
    }

    const user = await client.users.fetch(userId);
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 4096 });

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag}'s Avatar`)
      .setImage(avatarURL)
      .setColor(`${colorE}`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});
// banner 
client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + 'banner') || message.content.startsWith(prefix + 'بنر')) {
    const args = message.content.split(' ');
    let member;

    if (message.mentions.members.first()) {
      member = message.mentions.members.first();
    } else if (args[1]) {
      member = await message.guild.members.fetch(args[1]).catch(() => null);
    } else {
      member = message.member;
    }

    if (member) {
      const user = member.user;
      await user.fetch();

      if (user.banner !== null) {
        const image = user.bannerURL({ dynamic: true, size: 2048 });
        const button = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setStyle('LINK')
              .setLabel('تحميل')
              .setURL(image)
          );
        const embed = new Discord.MessageEmbed()
          .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
          .setImage(image)
          .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
          .setTitle('رابط البنر')
          .setURL(image)
          .setColor('BLUE')
          .setTimestamp();
        message.reply({ embeds: [embed], components: [button] });
      } else {
        message.reply(`**${user.username}** لا يمتلك بانر حاليًا.`);
      }
    } else {
      message.reply('لم أتمكن من العثور على العضو المذكور. يرجى التأكد من ذكر العضو بشكل صحيح.');
    }
  }
});
// user
client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + 'user') || message.content.startsWith(`u`)) {
    const args = message.content.split(' ');
    let member;

    if (message.mentions.members.first()) {
      member = message.mentions.members.first();
    } else if (args[1]) {
      member = await message.guild.members.fetch(args[1]).catch(() => null);
    } else {
      member = message.member;
    }

    if (member) {
      const user = member.user;

      const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField('Username', user.username, true)
        .addField('Nickname', member.displayName, true)
        .addField('Tag', user.tag, true)
        .addField('Account Created', user.createdAt.toLocaleString(), true)
        .addField('Joined Server', member.joinedAt.toLocaleString(), true)
        .setColor('BLUE')
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } else {
      message.reply('I couldn\'t find the mentioned user. Please make sure to mention the user correctly.');
    }
  }
});
// roles
client.on("messageCreate", async message => {
  if (message.content.startsWith(prefix + 'roles')) {
    const roles = message.guild.roles.cache.filter(role => role.id !== message.guild.id);
    
    const sortedRoles = roles.sort((a, b) => b.position - a.position);

    const roleMentions = sortedRoles.map(role => `<@&${role.id}>`).join('\n');

    const embed = new Discord.MessageEmbed()
      .setTitle('Server Roles')
      .setDescription(roleMentions)
      .setColor('BLUE')
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
});
// اراء
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.channel.id === '1163871118474616933') {     ///هنا ايدي الروم
    message.delete()

    const { MessageEmbed } = require('discord.js');
    const exampleEmbed = new MessageEmbed()
      .setColor(`${colorE}`)
      .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setDescription(`> **${message.content}**`)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setTimestamp()
    message.channel.send({ embeds: [exampleEmbed] }).then(msg => {
      msg.react('<:1169782673506582538:1211363845994709062>');
    });
  }
});
// طلبات
client.on("messageCreate", message => {
  if (message.channel.id == `${talabtRoom}`) {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix + "طلب")) return false;
    setTimeout(() => {
      message.delete()
    }, 3000)
  }
});

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix + "طلب")) {
    if (message.channel.id == `${talabtRoom}`) {
      let args = message.content.split(" ").slice(1).join(" ")
      if (!args) {
        message.reply(`**طريقة الطلب \`:\` ${prefix}طلب + طلبك**`).then(m => {
          setTimeout(() => {
            m.delete()
            message.delete()
          }, 3000)
        })
      }
      if (args) {
        let row = new Discord.MessageActionRow().addComponents(
          new Discord.MessageButton()
            .setLabel("منتجات 🎮")
            .setCustomId("mon")
            .setStyle("SECONDARY"),
          new Discord.MessageButton()
            .setLabel("تصاميم 🎨")
            .setCustomId("des")
            .setStyle("SECONDARY"),
          new Discord.MessageButton()
            .setLabel("برمجيات 💻")
            .setCustomId("dev")
            .setStyle("SECONDARY"),
          new Discord.MessageButton()
            .setLabel("الغاء ❌")
            .setCustomId("can")
            .setStyle("DANGER"),)
        let embed = new Discord.MessageEmbed()
          .setTitle("**__إختر المكان الصحيح لطلبك :__                                                                  **")
          .setDescription(`**منتجات : 🎮                                                                                        
- مثل : نيترو , حسابات , الخ ..
تصاميم : 🎨
- مثل صورة , بنر , الخ ..
برمجيات : 💻
- مثل : بوت , كود , الخ ..
إلغاء الطلب : ❌
- لإلغاء طلبك، عدم إرساله للبائعين .**`)
          .setColor(`${colorE}`)
        db.set(`talab_${message.member.id}`, args)
        message.channel.send({ content: `${message.member}`, embeds: [embed], components: [row] })
        message.delete()
      }
    }
  }
})

client.on("interactionCreate", interaction => {
  if (interaction.isButton()) {
    if (interaction.customId == "mon") {
      let talab = db.get(`talab_${interaction.member.id}`)
      let number = db.fetch(`OrderMsg_${interaction.guild.id}`)
      if (!number || number === null) number = 1;
      db.add(`OrderMsg_${interaction.guild.id}`, 1)
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Delete")
          .setCustomId("del")
          .setStyle("DANGER"))
      let mon = new Discord.MessageEmbed()
        .setTitle("> **الطلب الجديد :                                                                  **")
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`**${talab}**`)
        .setColor(`${colorE}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      interaction.guild.channels.cache.get(`1211722488967598130`).send({ content: `
      from: ${interaction.member}
      to: <@&1211724507249909760> 
      order number:**${number}**`, embeds: [mon], components: [row] })
      interaction.guild.channels.cache.get(`1211722488967598130`).send({ content: `${lineLink}` })
      interaction.reply("> **تم إرسال طلبك إلى البائعين، الرجاء الإنتظار ليتواصل معك أحدهم .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(err => { })
          }, 5000);
        })
      db.delete(`talab_${interaction.member.id}`)
    }
    if (interaction.customId == "des") {
      let talab = db.get(`talab_${interaction.member.id}`)

      let number = db.fetch(`OrderMsg_${interaction.guild.id}`)
      if (!number || number === null) number = 1;
      db.add(`OrderMsg_${interaction.guild.id}`, 1)
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Delete")
          .setCustomId("del")
          .setStyle("DANGER"))
      let mon = new Discord.MessageEmbed()
        .setTitle("> **الطلب الجديد :                                                                  **")
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`**${talab}**`)
        .setColor(`${colorE}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      interaction.guild.channels.cache.get(`1211722510031388693`).send({ content: `
      from: ${interaction.member}
      to: <@&1169204417292148776> 
      order number:**${number}**`, embeds: [mon], components: [row] })
      interaction.guild.channels.cache.get(`1211722510031388693`).send({ content: `${lineLink}` })
      interaction.reply("> **تم إرسال طلبك إلى المصممين، الرجاء الإنتظار ليتواصل معك أحدهم .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(console.error);
          }, 5000);
        })
      db.delete(`talab_${interaction.member.id}`)
    }
    if (interaction.customId == "dev") {
      let talab = db.get(`talab_${interaction.member.id}`)

      let number = db.fetch(`OrderMsg_${interaction.guild.id}`)
      if (!number || number === null) number = 1;
      db.add(`OrderMsg_${interaction.guild.id}`, 1)
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel("Delete")
          .setCustomId("del")
          .setStyle("DANGER"))
      let mon = new Discord.MessageEmbed()
        .setTitle("> **الطلب الجديد :                                                                  **")
        .setAuthor({ name: `${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`**${talab}**`)
        .setColor(`${colorE}`)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
      interaction.guild.channels.cache.get(`1211722528150782032`).send({ content: `
      <@&1211724507249909760>  
      from: ${interaction.member}
      **`, embeds: [mon], components: [row] })
      interaction.guild.channels.cache.get(`1211722528150782032`).send({ content: `${lineLink}` })
      interaction.reply("> **تم إرسال طلبك إلى المبرمجين، الرجاء الإنتظار ليتواصل معك أحدهم .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(console.error);
          }, 5000);
        })
      db.delete(`talab_${interaction.member.id}`)
    }
    if (interaction.customId == "can") {
      interaction.reply("> **تم إلغاء طلبك بنجاح .**")
      interaction.message.delete()
        .then((reply) => {
          setTimeout(() => {
            interaction.deleteReply().catch(console.error);
          }, 5000);
        })
    }
    if (interaction.customId == "del") {
      if (interaction.member.roles.cache.some(r => r.id == 1169196867586883584)) {
        interaction.message.delete()
        interaction.reply({ content: `**${emjTrue} لقد تم حذف الطلب بنجاح .**`, ephemeral: true })
      }
    }
  }
});

//ضريبة تلقائية
let autotax = ['1211364865990725684'];// ايدي الروم بدل كلمة id

client.on("messageCreate", message => {
 if(message.channel.type === "dm" || 
  message.author.bot) return
  
if(autotax.includes(message.channel.id)){

  var args = message.content.split(' ').slice(0).join(' ')
if(!args) return;
  
if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
else if (args.endsWith("مليون")) args = args.replace(/مليون/gi, "") * 1000000;
else if (args.endsWith("الف")) args = args.replace(/الف/gi, "") * 1000;
else if (args.endsWith("ألف")) args = args.replace(/ألف/gi, "") * 1000;
else if (args.endsWith("ك")) args = args.replace(/ك/gi, "") * 1000;
else if (args.endsWith("م")) args = args.replace(/م/gi, "") * 1000000;
else if (args.endsWith("آلاف")) args = args.replace(/آلاف/gi, "") * 1000;
else if (args.endsWith("ألاف")) args = args.replace(/ألاف/gi, "") * 1000;
else if (args.endsWith("الاف")) args = args.replace(/الاف/gi, "") * 1000;
else if (args.endsWith("ملايين")) args = args.replace(/ملايين/gi, "") * 1000000;
    if(!args) return message.reply('> **يرجى كتابة الرقم صحيح**')
      let args2 = parseInt(args)
          if (args2 == 1) return message.reply(`> **يرجى كتابة رقم أكبر من \`1\`** ⚠️`);
          let tax = Math.floor(args2 * (20) / (19) + (1))
        let tax2 = Math.floor(args2 * (20) / (19) + (1) - (args2))
        let tax3 = Math.floor(tax2 * (20) / (19) + (1))
        let tax4 = Math.floor(tax2 + tax3 + args2);
        let tax5 = Math.floor((2.5 / 100) * args)
        let tax6 = Math.floor(tax4 + args2 * (20) / (19) + (1)-(args2))
        let tax7 = Math.floor(tax + tax5)
        let tax8 = Math.floor(tax4 + tax5)
let tax9 = Math.floor((5 / 100) * args - args * -0)
let tax10 = Math.floor(tax - args)
let tax11 = Math.floor(tax9 + tax10)
let tax12 = Math.floor(tax - tax11)
         
    let embed = new Discord.MessageEmbed()
      
    .setColor("67c9c9")

   .setThumbnail(client.user.avatarURL({ dynamic: true }))   

      .setFooter({text :`By  : ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`
               })
      
      .addFields(
      {
      name:"> **Price (Not Tax):**", value:`**\`${args}\`**`
    },
    {
      name:"> **2.5% Tax:**", value:`**\`${tax5}\`**`
    },
    {
      name:"> **Price (1 Tax):**", value:`**\`${tax}\`**`
    },
      {
      name:"> **Price (2 Tax):**", value:`**\`${tax4}\`**`
    },
      {
      name:"> **Price (1 Tax) + 2.5%:**", value:`**\`${tax7}\`**`
    },
      {
      name:"> **Price (2 Tax) + 2.5%:**", value:`**\`${tax8}\`**`
    }, 
     {
      name:"**=============================**", value:`**=**`
   }, 
    {
      name:"> **Transfer Price (Not Tax):**", value:`**\`${tax12}\`**`
    },  
    {
      name:"> **ProBot Tax:**", value:`**\`${tax9}\`**`
    },
    {
      name:"> **Tax:**", value:`**\`${tax10}\`**`
    },
        )
      
  .setTimestamp()
  
   message.reply({embeds: [embed]}).catch((err) => {
   console.log(err.message)
   });    
  }
});


/// جيف اواي

////
/// send
client.on("messageCreate", async message => {
if (message.author.bot) return;
if (!message.channel.guild) return;
if (message.content.startsWith(prefix + 'send')) {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
  return message.reply("** 😕 You don't have permissions **"); 
}
if(!message.guild.me.permissions.has('ADMINISTRATOR')) {
  return message.reply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`);
}
let args = message.content.split(' ').slice(2).join(' ')
let argss = message.content.split(' ')
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(argss[1])
        let attach = message.attachments.first()
        if (!channel) return message.channel.send('** 😕 Please mention channel or id **');
        if (!args) return message.channel.send('** ❌ Please select a message **');
        message.delete()
      if (!attach) {
        channel.send({content: `${args}`});
} else {
        channel.send({content: `${args}`, files: [attach]});
}
    }
});




process.on("uncaughtException", (err) => {
  return;
});
process.on("unhandledRejection", (err) => {
  return;
});
process.on("rejectionHandled", (error) => {
  return;
});