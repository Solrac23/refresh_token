# Build stage
FROM node:24-alpine AS builder

WORKDIR /usr/app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install -g corepack@latest; \
   corepack enable pnpm && corepack install -g pnpm@11.9.0

COPY package.json pnpm*.yaml ./

RUN pnpm ci

COPY . .

RUN pnpm build

# Dev stage
FROM node:24-alpine AS dev

WORKDIR /usr/app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install -g corepack@latest && \
   corepack enable pnpm && corepack install -g pnpm@11.9.0

COPY --from=builder /usr/app/node_modules ./
COPY package.json pnpm*.yaml ./

ENV NODE_ENV=development

EXPOSE 3333 3400

ENTRYPOINT [ "/bin/sh", "-c", "pnpm generate:dev && pnpm dev" ]

# Production stage
FROM node:24-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install -g corepack@latest && \
   corepack enable pnpm && corepack install -g pnpm@11.9.0

# Install only production dependencies
COPY package.json pnpm*.yaml ./

RUN pnpm ci -P

COPY --from=builder /usr/app/dist ./dist

# Runs as non-root user
RUN addgroup -S node && adduser -S node -G node && \
  chown -R node:node /usr/app && \
  chmod -R 755 /usr/app

USER node

EXPOSE 3400

CMD [ "pnpm", "start" ]
