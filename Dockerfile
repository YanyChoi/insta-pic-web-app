FROM node:16-buster-slim

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm", "run", "start"]