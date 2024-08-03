FROM node:20.16.0 AS development
WORKDIR /code

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY --chown=node:node . .
USER node

FROM node:20.16.0 AS build
WORKDIR /code

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node nest*.json ./
COPY --chown=node:node --from=development /code/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

COPY --from=build /code/node_modules ./node_modules
COPY --from=build /code/dist ./dist

CMD [ "node", "dist/main" ]