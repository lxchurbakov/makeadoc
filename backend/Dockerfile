# Build the application
FROM node:alpine

ARG MONGO_URI
ENV MONGO_URI=$MONGO_URI

ARG PORT
ENV PORT=$PORT

WORKDIR /app

COPY libs ./libs
COPY routes ./routes
COPY index.ts .
COPY tsconfig.json .
COPY package.json .
COPY package-lock.json .

# Install PYTHON for node-gyp to work
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm ci && npm run build

CMD [ "npm", "start" ]
