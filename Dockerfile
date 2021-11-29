FROM node:11.14.0
ARG ssh_prv_key
RUN mkdir -p /root/.ssh

RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa

RUN ssh -o StrictHostKeyChecking=no -vT git@code.knolskape.com 2>&1 | grep -i aut

RUN apt-get update && apt-get install nano & export TERM=xterm

WORKDIR /usr/app

COPY package*.json ./

COPY yarn.lock yarn.lock

RUN yarn install

RUN touch .env

COPY . .

EXPOSE 3000
ENTRYPOINT [ "/bin/sh","-c" ]
CMD ["sh production-start.sh"]
