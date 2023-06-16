FROM node:18 AS build

RUN apt-get update && apt-get install -y

RUN mkdir /emberapp
WORKDIR /emberapp

COPY . .

RUN npm install -g pnpm && pnpm install --frozen-lockfile

RUN yarn build

# For production we just need the 'dist' dir and a barebones NGINX proxy
FROM nginx:1.21.3-alpine AS server

COPY --from=build /emberapp/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf

COPY --from=build /emberapp/nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200

ENTRYPOINT ["nginx", "-g", "daemon off;"]
