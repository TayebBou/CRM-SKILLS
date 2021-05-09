FROM ubuntu:bionic

WORKDIR /home/app

RUN apt-get update 
RUN apt-get install -y \
    wget \
    curl \
    vim \
    git \
    zip \
    bzip2 \
    fontconfig \
    python \
    g++ \
    libpng-dev \
    build-essential \
    software-properties-common \
    sudo && \
  # install tzdata
  export DEBIAN_FRONTEND=noninteractive && \
  apt-get install -y tzdata && \
  # install OpenJDK 11
  add-apt-repository ppa:openjdk-r/ppa && \
  apt-get update && \
  apt-get install -y openjdk-11-jdk && \
  update-java-alternatives -s java-1.11.0-openjdk-amd64 && \
  # install node.js
  wget https://nodejs.org/dist/v12.16.1/node-v12.16.1-linux-x64.tar.gz -O /tmp/node.tar.gz && \
  tar -C /usr/local --strip-components 1 -xzf /tmp/node.tar.gz && \
  # upgrade npm
  npm install -g npm && \
  apt-get clean && \
  rm -rf \
    /home/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*


RUN rm -Rf /home/app/node_modules 
RUN rm -Rf /home/app/package.json.lock 

COPY ./package.json .
RUN npm install --save --legacy-peer-deps

EXPOSE 8080 9000 3001

ENTRYPOINT [ "/bin/bash", "docker-entrypoint.sh" ]
