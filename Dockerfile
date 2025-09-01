# Imagen base con Node.js
FROM node:18

# Carpeta de trabajo
WORKDIR /app

# Copiamos package.json e instalamos dependencias
COPY package*.json ./
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Exponemos un puerto (Koyeb lo necesita aunque Discord bots no usen HTTP)
EXPOSE 8080

# Comando para iniciar tu bot
CMD ["node", "index.js"]
