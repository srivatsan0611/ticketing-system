
FROM node:18

WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

# Running the Application
CMD ["node", "index.js"]
