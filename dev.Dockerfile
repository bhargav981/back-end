FROM node:11.14.0
RUN npm install -g sequelize-cli
ARG ssh_prv_key
RUN mkdir -p /root/.ssh
RUN echo "${ssh_prv_key}" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa
RUN ssh -o StrictHostKeyChecking=no -vT git@code.knolskape.com 2>&1 | grep -i aut
WORKDIR /usr/app
COPY yarn.lock ./
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
#RUN chown -R node:node /usr/app
#USER node
CMD ["npm", "run" ,"start-dev"]
