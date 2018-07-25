FROM node:latest
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY backpack-ui/package.json /usr/src/app
RUN npm install
COPY ./backpack-ui /usr/src/app
EXPOSE 6006
CMD ["npm","run","storybook"]