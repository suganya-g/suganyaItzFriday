FROM mhart/alpine-node-auto
RUN mkdir /chatController -p
WORKDIR /chatController
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start", "--production"]