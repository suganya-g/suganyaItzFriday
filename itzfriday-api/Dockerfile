FROM mhart/alpine-node-auto
RUN mkdir /appApi -p
WORKDIR /appApi
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start", "--production"]