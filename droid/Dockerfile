FROM mhart/alpine-node-auto
RUN mkdir /droid -p
WORKDIR /droid
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start", "--production"]