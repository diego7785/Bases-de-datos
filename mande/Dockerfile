# pull official base image
FROM node:10.15.2-alpine

# set working directory
WORKDIR /app
EXPOSE 3000

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install google-map-react

# add app
COPY . ./



# start app
CMD ["npm", "audit", "fix"]
CMD ["npm", "start"]