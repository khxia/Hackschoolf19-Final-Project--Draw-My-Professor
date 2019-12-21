const express = require('express');
const app = express();
const path = require('path');

const drawings = [];

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index1.html');
});

app.get('/styles.css', (request, response) => {
    response.sendFile(__dirname + '/styles.css');
});

app.get('/picture', (request, response) => {
    const list = drawings.map((obj) => {
        return {
            artist: obj.artist,
            professor: obj.professor,
        }
    });
    for (let i = 0; i < list.length; i++){
        list[i].id = `${i}`;
    }
    response.json(list);
})

app.post('/picture',                       
         express.raw({ type: 'image/*' }),
         (request, response) => {
            // const newpic = request.body;
            // const picObj = {};
            // picObj["artist"] = request.query.artist; 
            // picObj["professor"] = request.query.professor;
            // picObj["rawPicture"] = newpic;
            const picObj = {
                artist: request.query.artist,
                professor: request.query.professor,
                thePic: request.body
            };

            drawings.push(picObj);
            response.json({id: drawings.length - 1});
         });
         
app.get('/picture/:id', (request, response) => {       
    const id = request.params.id;
    if ( id < 0 || id > drawings.legnth){
        response.status(404);
        response.send("Invalid id");
        return;
    }
    response.setHeader('Content-Type', 'image/png');
    response.send(drawings[id].thePic);
});

app.listen(3000);