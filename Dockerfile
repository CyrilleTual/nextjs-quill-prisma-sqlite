
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY prisma ./prisma
ENV DATABASE_URL="file:./dev.db"
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

COPY entrypoint.sh /
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
