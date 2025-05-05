FROM node:23-alpine3.20

WORKDIR /app

COPY package.json .

RUN npm install pnpm -g

RUN pnpm install 

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "pnpm dlx prisma db push && pnpm run dev"]