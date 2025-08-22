# Escolha a versão mais recente do Node
FROM node:24

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta usada pelo dev server (vite ou vue-cli)
EXPOSE 5173

# Comando padrão ao rodar o container
CMD ["npm", "run", "dev"]
