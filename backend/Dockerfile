FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production

ENV MONGO_DB_URL mongodb+srv://mongousr:YpBBLVzyVZlf2Ap4@cluster0.eyer5gh.mongodb.net/
USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3001
CMD [ "node", "dist/src/index.js" ]