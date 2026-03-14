# Stage 1: Build
FROM node:23-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --ignore-scripts
COPY . .
RUN pnpm run build

# Stage 2: Production Run
FROM node:23-alpine
WORKDIR /app

# বিল্ডার থেকে শুধু প্রয়োজনীয় ফাইলগুলো নিন
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# pnpm ছাড়াই সরাসরি next কমান্ড দিয়ে রান করুন
EXPOSE 3000
CMD ["./node_modules/.bin/next", "start"]
