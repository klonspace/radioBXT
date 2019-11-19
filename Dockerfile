FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz
RUN tar xf ffmpeg-release-i686-static.tar.xz
RUN ls
RUN mv ffmpeg-4.2.1-i686-static/ffmpeg ffmpeg-4.2.1-i686-static/ffprobe /usr/bin


COPY . .

EXPOSE 1935 7000

CMD ["node",  "app.js"] 
