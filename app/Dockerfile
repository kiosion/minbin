FROM node:18-slim AS build

RUN apt-get update && apt-get install -y

RUN mkdir /emberapp
WORKDIR /emberapp

COPY . .

RUN rm -rf ./node_modules && yarn install --immutable && yarn cache clean

RUN yarn build

# For production we just need the 'dist' dir and a barebones NGINX proxy
FROM nginx:1.21.3-alpine AS server

COPY --from=build /emberapp/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf

COPY --from=build /emberapp/nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200

ENTRYPOINT ["nginx", "-g", "daemon off;"]
