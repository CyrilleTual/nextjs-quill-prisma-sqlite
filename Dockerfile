# Utiliser une image de base légère pour la production
FROM node:18-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis votre machine locale

# Copier les dépendances (déjà installées)
COPY node_modules ./node_modules

# Copier le build Next.js
COPY .next ./.next

# Copier Prisma (fichier de base de données et le client généré)
COPY prisma ./prisma
COPY prisma/dev.db ./prisma/dev.db

# Copier le fichier package.json
COPY package.json ./package.json

# Exposer le port pour accéder à l'application
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
