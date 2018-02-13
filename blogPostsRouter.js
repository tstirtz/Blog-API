const express = require('express');
const router = express.Router();

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
    'Creating an API with Node.js and Express', 'Start by creating an express app. First create a new folder for your project. Run "npm init" inside of your project directory to initialize npm. Next, install the dependencies you will need for your project. One that will be needed in Express. Run "npm install express". Once express has finished installing create a .gitignore file in the root of your project file so that git will not track the node_modules folder that was created when you ran npm init. You can do this with one command by running: echo "node_modules" > .gitignore. This will create a file call .gitignore which already contains the text "node_modules". Finally set up your starter express application in a new server.js file.', 'Tyler Stirtz'
);

BlogPosts.create(
    'aute fore tempor dolor quae', 'anim quorum sunt magna noster duis fugiat quem noster dolore illum sint quorum eram culpa nisi enim labore magna fore', 'Tyler Stirtz'
);

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) =>{
    const requiredFields = ['title', 'content', 'author'];

    for(i=0; i <= requiredFields.length; i++){
        let field = requiredFields[i];
        if(!(field in req.body)){
            let message = `Missing ${field} in request body.`;
            console.log(message);
            return res.status(400).send(message);
        }
    //if all required fields are present post the new data to BlogPosts.create
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);

    res.status(201).json(item);

    }
});

//Delete blog posts by id

router.delete('/:id', (req, res) =>{
    const requestId = req.params.id;
    // console.log(BlogPosts[0]["id"]);
    //
    // for(i=0; i <= BlogPosts.length; i++){
    //     if(!(requestId in BlogPosts[i].id)){
    //         const message = `${requestId} must match a current Id.`;
    //         console.log(message);
    //         res.status(400).send(message);
    //     }
    // }
    //delete specified item if it does
    BlogPosts.delete(requestId);
    const message = `Deleted blog post item ${requestId}.`;
    console.log(message);
    res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
    //check that required fields are present
    const requiredFields = ['id', 'title', 'content', 'author'];

    for(i=0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)){
            const message = `Request body must contain "${field}"`;
            console.log(message);
            return res.status(400).send(message);
        }
    }

    //check that params.id and body.id match
    //send error message if they don't
    if(req.params.id !== req.body.id){
        const message = `Request path id ${req.params.id} and request body id must match`;
        return res.status(400).send(message);
    }
    //else BlogPosts.updata object
    console.log(`Updating list item ${req.params.id}`);
    const updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    res.status(204).end();
    //res.status(204).send(updatedItem) won't return updatedItem in the response?
});

module.exports = router;
