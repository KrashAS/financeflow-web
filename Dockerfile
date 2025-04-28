FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start --hostname 0.0.0.0 --port 3000"]

