# ── Stage 1: Builder ────────────────────────────────────────────
FROM node:18-alpine AS builder

RUN apk add --no-cache python3 make g++ postgresql-client

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Runner ─────────────────────────────────────────────
FROM node:18-alpine AS runner

RUN apk add --no-cache postgresql-client dumb-init

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.cache ./.cache
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src

EXPOSE 1337

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "start"]