FROM node:lts-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN npm install
RUN npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Expose the port that the application will run on
EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
