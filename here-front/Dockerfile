FROM node:16-alpine AS base

# 만약 컨테이너 안의 이미지의 경로가 /app 이런식으로 되어있다면 작업할 div 경로를 설정할 수도 있다.
# 설정해주면 COPY 의 두번째 경로를 ./ 이것으로 했을 때 자동으로 /app 경로가 된다.
WORKDIR /app

# package.json 파일을 복사한다. 만약 다시 빌드할 때 변경사항이 없을 경우 npm install까지 그냥 넘어간다.
COPY package.json /app

# 이미지를 받으면 npm install을 자동으로 해줌
RUN npm install

# 어떤 파일이 이미지에 들어가야 하는지 
# 첫 번째 .은 이 프로젝트의 모든 폴더 및 파일들 (Dockerfile을 제외한)
# 두 번째 .은 파일을 저장할 컨테이너 내부 경로 (ex /app)
COPY . /app

RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]