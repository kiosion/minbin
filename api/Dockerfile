FROM node:18-slim AS build

# Install our needed dev deps
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    python3

RUN mkdir /api
WORKDIR /api

COPY . .

RUN rm -rf ./node_modules && yarn install --immutable && yarn cache clean

ARG MONGO_UPW
ARG MONGO_HOST

RUN echo "MONGO_UPW=$(cat $MONGO_UPW)" > .env
RUN echo "MONGO_HOST=$(cat $MONGO_HOST)" >> .env

RUN yarn build

FROM node:18-slim AS api

EXPOSE 3000

RUN mkdir /api
WORKDIR /api

COPY --from=build /api/dist/index.js ./index.js
COPY --from=build /api/.env ./.env

RUN chown -R nobody: /api
USER nobody

ENTRYPOINT ["node", "./index.js"]
