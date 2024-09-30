# Utiliser une image de base légère pour la production
FROM node:18-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json (s'il existe)
COPY package.json ./
COPY package-lock.json ./  

# Installer les dépendances
RUN npm install --production  # Installe uniquement les dépendances de production

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Ajuster les permissions du fichier de base de données
RUN chmod 666 ./prisma/dev.db

# Exposer le port pour accéder à l'application
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]

