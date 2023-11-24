
# Build
FROM node:20-alpine as builder
WORKDIR /app/

COPY . .
RUN yarn install --frozen-lockfiles --ignore-scripts  \
    && NODE_ENV=production yarn build                 \
    && yarn install --frozen-lockfiles --production --offline --ignore-scripts

# Run
FROM node:20-alpine
WORKDIR /app/

ENV NODE_ENV production

ARG BUILD_TZ=Asia/Ho_Chi_Minh
ENV TZ=$BUILD_TZ
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && chown node:node /app

RUN npm install -g pm2

USER node
COPY --from=builder --chown=node:node /app ./

CMD ["pm2-runtime", "start", "dist/index.js", "-i", "max"]
