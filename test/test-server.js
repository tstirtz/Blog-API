const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('BlogPost', function(){
    before(function(){
        return runServer();
    });

    after(function(){
        return closeServer();
    });

    it('should list blog posts of GET', function(){
        //return promise since the server may take longer to respond
        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {  //Don't use arrow functions with Mocha
                //test that respons is a json object
                expect(res).to.be.json;
                //test that response is an array of blog BlogPosts
                expect(res.body).to.be.a('array');
                //test that res body has a least one blog post
                expect(res.body).to.have.lengthOf.at.least(1);
            });
    });


});
