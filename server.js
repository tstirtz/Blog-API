let express = require('express');
var morgan = require('morgan');

let app = express();

let blogPostsRouter = require('./blogPostsRouter');

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/blog-posts', blogPostsRouter);

let server;

function runServer(){
    const port = process.env.PORT || 8080;
    return new Promise ((resolve, reject) => {
        //on resolve run server
        server = app.listen('port', () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err);
        });
    });
}

function closeServer(){
    //when called close server
    return new Promise ((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
            if(err){
                reject(err);

                return;
            }
            resolve();
        });
    });
}

if(require.main === module){
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
