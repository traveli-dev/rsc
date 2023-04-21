FROM node:18.16.0-slim

RUN apt update && apt install -y curl jq unzip gcc git
RUN curl -fsSL https://test.docker.com/ | sh

