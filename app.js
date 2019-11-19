const NodeMediaServer = require('./');
const md5 = require('md5');
const PORT = process.env.PORT || 1935;
const express = require('express');

const app = express();
var http = require('http').createServer(app);


var bodyParser = require('body-parser');

//express server for getting last files

http.listen(1337, function () {
  console.log('Express app listening on port 80');
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes')();
app.use('/', routes);


const config = {
  rtmp: {
    port: 1935,
    chunk_size: 5000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 7000,
    mediaroot: './media',
    webroot: '*',
    allow_origin: '*'
  },
  auth: {
    api: true,
    api_user: 'admin',
    api_pass: 'admin',
    play: false,
    publish: true,
    secret: 'purephaseSECRETEdeBREX1TR4D1-0'
  },
  
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        mp4: true,
        mp4Flags: '[movflags=faststart]',
      }
    ]
  }
  
};

var streamName = "WOOT";
var expiration = Math.floor(Date.now() / 1000) + (86400 * 365);
var hashValue =  md5("/live/"+streamName+"-"+expiration+"-purephaseSECRETEdeBREX1TR4D1-0");
var link = "live/"+streamName+"?sign="+expiration+"-"+hashValue;
console.log(link);
var nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
