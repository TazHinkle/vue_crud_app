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
    const insertResult = await posts.insertOne({
        text: request.body.text,
        createdAt: new Date(),
    });
    const post = insertResult.ops[0];
    response.status(201).json(post);
});

//Delete Post
router.delete('/:id', async (request, response) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(request.params.id)});
    response.status(200).send();
});

async function loadPostsCollection() {
    const client = await MongoClient.connect(
        process.env.MONGODB_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
    );

    return client.db('cluster0')
        .collection('posts');
}



module.exports = router;
