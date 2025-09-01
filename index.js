// Este script mantiene el proceso corriendo 24/7 y responde a health checks
console.log("Bot encendido y corriendo 24/7 🚀");

setInterval(() => {
  console.log("Estoy vivo...");
}, 60000);

// Servidor HTTP para health checks de Koyeb
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Estoy vivo!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor de salud escuchando en puerto ${PORT}`);
});
