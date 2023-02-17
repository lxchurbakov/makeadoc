# Build the application
FROM node:alpine

# Install PYTHON for node-gyp to work
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

ARG API_HOST
ENV API_HOST=$API_HOST

WORKDIR /app

COPY src ./src
COPY patches ./patches
COPY tsconfig.json .
COPY package.json .
COPY package-lock.json .



RUN npm ci && npm run build

# Now put it inside nginx
# TODO uncomment that when I find out how to inject envs into build or hijack them in runtime

FROM nginx:latest
COPY nginx.conf /ent/nginx
COPY --from=0 /app/dist /usr/share/nginx/html
