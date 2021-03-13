FROM node:14-alpine AS dev
WORKDIR /workspace
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci
EXPOSE 1234
CMD [ "npm", "run", "start" ]

FROM node:14-alpine AS builder
WORKDIR /build
COPY --from=dev /workspace/node_modules ./node_modules
COPY --from=dev /workspace/package.json ./package.json
COPY --from=dev /workspace/package-lock.json ./package-lock.json
COPY ./src ./src
RUN npm run build

FROM nginx:1.16.0-alpine AS production
COPY --from=builder /build/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]