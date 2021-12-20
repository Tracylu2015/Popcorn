# pull official base image
FROM node:16-alpine3.12 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY popcorn-frontend ./
RUN npm install --silent

# # Dev environment
# CMD ["npm", "run", "start"]

# start app
RUN npm run build
RUN grep -rl localhost /app/build
RUN grep -rl localhost /app/build | xargs sed -i 's/http:\/\/localhost:8080//g'

# production environment
FROM nginx:1.21.4-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY popcorn-frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]