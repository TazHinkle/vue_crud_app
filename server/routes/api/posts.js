const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
const mongodb = require('mongodb');

//Get Posts
router.get('/', async (request, response) => {
    const posts = await loadPostsCollection();
    response.send(await posts.find({}).toArray());
});


// Add Post
router.post('/', async (request, response) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: request.body.text,
        createdAt: new Date(),
    });
    response.status(201).send();
});

//Delete Post
router.delete('/:id', async (request, response) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(request.params.id)});
    response.status(200).send();
});

async function loadPostsCollection() {
    const client = await MongoClient.connect(
        'mongodb+srv://new-user31:password4321@cluster0.bl093.mongodb.net/test',
        { useNewUrlParser: true, useUnifiedTopology: true },
    );

    return client.db('cluster0')
        .collection('posts');
}



module.exports = router;
