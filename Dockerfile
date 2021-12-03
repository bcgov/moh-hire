FROM node:16-alpine

# RUN yarn set version berry
# Copying repo resources
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./packages ./packages
COPY ./nodemon.json ./
COPY ./.eslintrc.js ./
COPY ./apps ./apps
RUN yarn install

# Build whole all packages
RUN yarn build

EXPOSE 3000
EXPOSE 4000

CMD /usr/bin/tail -f /dev/null
