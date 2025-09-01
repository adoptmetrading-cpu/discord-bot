const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
app.get("/", (req, res) => res.send("Bot corriendo en Koyeb con auto-ping"));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor web activo en puerto ${port}`);
});

// Auto-ping cada 4 minutos para evitar deep sleep
const url = process.env.APP_URL; // Define tu URL en las variables de entorno de Koyeb
if (url) {
  setInterval(() => {
    fetch(url)
      .then(() => console.log("Ping enviado a", url))
      .catch(err => console.error("Error en ping:", err));
  }, 240000); // cada 4 min
} else {
  console.warn("APP_URL no está definida, el auto-ping no funcionará.");
}

// Manejo de errores para que no crashee
process.on("unhandledRejection", error => {
  console.error("Error no manejado:", error);
});

process.on("uncaughtException", error => {
  console.error("Excepción no manejada:", error);
});
