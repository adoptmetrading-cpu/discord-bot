const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const express = require("express");

// Inicializar el bot de Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.login(process.env.TOKEN);

// Mantener vivo el servicio en Koyeb con Express
const app = express();
app.get("/", (req, res) => res.send("Bot corriendo en Koyeb"));
app.listen(process.env.PORT || 8080);
