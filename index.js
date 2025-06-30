const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!gen mcfa") {
    try {
      let data = fs.readFileSync("mcfa.txt", "utf-8").split("\n").filter(Boolean);
      if (!data.length) return message.reply("❌ No accounts left!");

      const account = data.shift();
      fs.writeFileSync("mcfa.txt", data.join("\n"));

      await message.author.send(`🎮 Your MCFA account:\n\`${account}\``);
      return message.reply("✅ Sent in DMs!");
    } catch {
      return message.reply("❌ Could not send DM. Please open your DMs.");
    }
  }

  if (message.content === "!stock") {
    let data = fs.readFileSync("mcfa.txt", "utf-8").split("\n").filter(Boolean);
    return message.reply(`📦 Stock: ${data.length} accounts`);
  }
});

client.login(process.env.TOKEN);
