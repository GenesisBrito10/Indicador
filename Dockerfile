# Estágio 1: Build da Aplicação Vue.js
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Instala as dependências de produção e desenvolvimento
RUN npm install
COPY . .
# Compila os ficheiros estáticos para a pasta /dist
RUN npm run build

# Estágio 2: Imagem Final de Produção com Node.js
FROM node:lts-alpine
WORKDIR /app
# Copia as dependências de produção
COPY package*.json ./
RUN npm install --omit=dev
# Copia os ficheiros da aplicação e os ficheiros compilados
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Expõe a porta que o seu servidor Node.js usa
EXPOSE 2002

# Comando para iniciar o servidor
CMD ["node", "server.js"]