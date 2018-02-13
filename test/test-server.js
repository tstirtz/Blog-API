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

    it('should add new blog post on POST', function(){
        const newPost = {
            title: 'Test',
            content:'legam irure labore veniam cillum multos legam nulla sunt illum ipsum summis irure quae sint quis quid sint dolore quem',
            author: 'Tyler S.'
        };
        return chai.request(app)
            .post('/blog-posts')
            .send(newPost) //send new post to test
            .then(function(res){
                //expect status code 201
                expect(res).to.have.status(201);
                //expect to be json
                expect(res).to.be.json;
                //expect to an object
                expect(res.body).to.be.a('object');
                //expect body to contain keys title content and author to be present
                expect(res.body).to.include.keys('id', 'title', 'content', 'author');
                //expect id to be present in response
                expect(res.body.id).to.not.equal(null);
                //expect response to deep equal newPost if id is added to newPost
                expect(res.body).to.deep.equal(Object.assign(newPost, {id: res.body.id, publishDate: res.body.publishDate}));
            });
    });

    it('should update existing blog post on PUT', function(){
        const updatePost = {
            title: 'Foo',
            content: 'Bar',
            author: 'Bizz Bang'
        };

        return chai.request(app)
            .get('/blog-posts')
            .then(function(res){
                updatePost.id = res.body[0].id;
                return chai.request(app)
                    .put(`/blog-posts/${updatePost.id}`)
                    .send(updatePost);
            })
            .then(function(res){
                //expect status code of 204
                expect(res).to.have.status(204);
                        //expect res to be json
                // expect(res).to.be.json;
                        //expect res.body to be a Object
                // expect(res.body).to.be.a('object');
                //         //expect req id to match an existing id
                // expect(res.body).to.deep.equal(updatePost);
            });
        });

    it('should delete existing blog post on DELETE', function(){
        const deletePost = {
            title: 'Foo',
            content: 'Bar',
            author: 'Bizz Bang'
        };

        return chai.request(app)
            .get('/blog-posts')
            .then(function(res){
                deletePost.id = res.body[0].id;
                return chai.request(app) //I don't understand why we need to
                                            //return chai.request(app) here
                    .delete(`/blog-posts/${deletePost.id}`)
                    .send(deletePost)
            })
            .then(function(res){
                //expect res to have status 204
                expect(res).to.have.status(204);
            });
    });


});
