FROM node:20-alpine

WORKDIR /app

COPY package.json server.js index.html style.css mobile.css script.js ./ 
COPY assets ./assets

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
