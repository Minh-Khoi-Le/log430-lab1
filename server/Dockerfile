# Utilise une image Node officielle
FROM node:20

# Dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code (backend + Prisma schema)
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Port exposé (ex : 3800)
EXPOSE 3800

# Lancer le serveur
CMD ["npm", "start"]
