# --- Base stage ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# --- Production stage ---
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npx", "vite", "preview", "--port", "3000", "--host"]

# --- Development stage (optional) ---
FROM node:20-alpine AS dev
WORKDIR /app
COPY . .
RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "dev"]
