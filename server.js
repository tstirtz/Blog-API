let express = require('express');
var morgan = require('morgan');

let app = express();

let blogPostsRouter = require('./blogPostsRouter');

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/blog-posts', blogPostsRouter);
app.use('/blog-posts/:id', blogPostsRouter);

app.listen(8000, function(){
    console.log('Listening on port ' + 8000);
});
