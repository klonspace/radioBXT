module.exports = function (upload, chat, stream) {
    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    const { getVideoDurationInSeconds } = require('get-video-duration')
    router.post('/getFiles', async function (req, res, next) {

        var path = "./media/live/"+req.body.user+"/";
        var streamFiles = []
        var tempFiles = []
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(file => {
                tempFiles.push(file);
              });
              for(var i = 0; i < tempFiles.length; i++) {
                var minutes, seconds;
                await getVideoDurationInSeconds(path+tempFiles[i]).then((duration) => {
                    minutes = Math.floor(duration/60)
                    seconds = Math.floor(duration)
                  })
                  var stats = fs.statSync(path+tempFiles[i]);
                  streamFiles.push({
                      file : tempFiles[i],
                      minutes : minutes,
                      seconds : seconds,
                      path: path+tempFiles[i],
                      birthdate : stats.birthtimeMs
                  })
            }
            console.log(tempFiles)
            return res.json(streamFiles);
        }
        else {
            return res.json([]);
        }
        
    });


    return router;
}
