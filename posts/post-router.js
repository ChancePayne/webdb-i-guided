const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // SELECT * FROM post
    knex.select('*').from('posts').then(posts => {
        res.status(200).json(posts);
    }).catch(error => {
        res.status(500).json({error: "Failed to get posts from database"})
    });
});

router.get('/:id', (req, res) => {
    knex
        .select('*').from('posts')
        .where('id', '=', req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({error: "Failed to get posts from database"})
        });

});

router.post('/', (req, res) => {
    console.log(req.body);
    knex
        .insert(req.body, 'id')
        .into('posts')
        .then(ids => {
            res.status(200).json(ids);
        })
        .catch(error => {
            res.status(500).json({error: "Failed to add posts to database"})
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    knex('posts')
        .where({id: req.params.id})
        .update(changes)
        .then(count => {
            res.status(200).json(count)
        })
        .catch(error => {
            res.status(500).json({error: "Failed to updating post"})
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    knex('posts')
        .where({id: id})
        .del()
        .then(count => {
            res.status(200).json(count);
        }).catch(error => {
        res.status(500).json({error: "Failed to updating post"})
    });
});

module.exports = router;