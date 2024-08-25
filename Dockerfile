FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -y
CMD ["node", "./index.js"]
EXPOSE 3000
