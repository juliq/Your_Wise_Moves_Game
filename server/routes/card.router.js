const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const isAdmin = require('../modules/isAdmin');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET info on all questions from the card table
router.get('/', rejectUnauthenticated, isAdmin, (req, res) => {
    console.log('get all cards');
    pool.query(`
    SELECT "card"."id",
    "card"."text",
    "stage_id",
    "stage_type"."type" 
    FROM "card"
    JOIN "stage_type"
    ON "card"."stage_id"="stage_type"."id"
    ORDER BY "card"."id" DESC;`)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Card GET error: ', error);
            res.sendStatus(500);
        })
});
router.get('/:id', (req, res) => {
    console.log('get card');
    pool.query(`
    SELECT "card"."id","card"."text","stage_id","stage_type"."type" FROM "card"
    JOIN "stage_type"
    ON "card"."stage_id"="stage_type"."id"
    WHERE "card"."id" = $1`, [req.params.id])
        .then((results) => {
            res.send(results.rows[0])
        }).catch((error) => {
            console.log('Error GET /card', error);
            res.sendStatus(500);
        })
});


// POST for adding a new question to the card table in the database
router.post('/', rejectUnauthenticated, isAdmin, (req, res) => {
    console.log(req.body.decksToAddTo)
    pool.query(`INSERT INTO "card"( "text","stage_id" )
                VALUES ($1, $2)
                RETURNING "id";`,
        [req.body.text,
        req.body.stage_id])
        .then((results) => {
            if (req.body.decksToAddTo !== []) {
                for (let i = 0; i < req.body.decksToAddTo.length; i++) {
                    pool.query(`UPDATE "deck"
                SET "cards_in_deck" = array_append("cards_in_deck", $1)
                WHERE "deck"."id" = $2`, [results.rows[0].id, req.body.decksToAddTo[i]]
                    ).catch((error) => {
                        console.log('Card POST error in append to deck loop:', error);
                        res.sendStatus(500);
                    })
                }
            }
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Card POST error:', error);
            res.sendStatus(500);
        })
});


// DELETE question from card database
router.delete('/:id', rejectUnauthenticated, isAdmin, (req, res) => {
    pool.query(`DELETE FROM "card"
                WHERE "id"=$1;`,
        [req.params.id])
        .then((results) => {
            pool.query(`UPDATE "deck"
                        SET "cards_in_deck" = array_remove("cards_in_deck", $1)`, [req.params.id])
                .catch((error) => {
                    console.log('error removing deleted cards from deck', error)
                    res.sendStatus(500)
                })
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Card DELETE error:', error);
            res.sendStatus(500);
        })
});

// PUT to edit a question
router.put('/', rejectUnauthenticated, isAdmin, (req, res) => {
    pool.query(`UPDATE card
    SET "text" = $1,
    "stage_id" = $2
    WHERE "id" = $3`,
        [req.body.text,
        req.body.stage_id,
        req.body.id])
        .then((results) => {
            res.send(200)
        }).catch((error) => {
            console.log('Card PUT error: ', error);
            res.send(500);
        })
})

module.exports = router;