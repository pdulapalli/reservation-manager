FROM node:14-alpine AS base
WORKDIR /workspace
COPY ./*.json ./
COPY ./.* ./
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm ci
EXPOSE 3000

FROM base AS dev
ENV NODE_ENV=development
CMD [ "npm", "run", "start:dev" ]

FROM base as production
ENV NODE_ENV=production
COPY ./src ./src
RUN npm run build
RUN npm prune --production
CMD [ "npm", "run", "start:prod" ]