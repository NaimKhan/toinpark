FROM node:22-alpine

# সিস্টেম লাইব্রেরি
RUN apk add --no-cache libc6-compat

WORKDIR /app

# সব ফাইল একবারে কপি করা (কোনো মডিউল যাতে বাদ না পড়ে)
COPY . .

# pnpm-এর ঝামেলা এড়াতে সরাসরি npm দিয়ে ফ্রেশ ইনস্টল
RUN npm install

# প্রিজমা জেনারেট এবং বিল্ড
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

# রান করার কমান্ড
CMD ["node", "dist/src/main.js"]
