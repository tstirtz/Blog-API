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
})

module.exports = router;
