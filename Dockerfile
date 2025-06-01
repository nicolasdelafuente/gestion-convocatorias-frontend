# Dockerfile para el frontend

FROM node:18

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Elimina node_modules y package-lock.json si existen (por si acaso)
RUN rm -rf node_modules package-lock.json

# Instala dependencias
RUN npm install

# Ahora copia el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "start"]