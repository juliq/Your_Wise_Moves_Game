const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const isAdmin = require('../modules/isAdmin');
const isFacilitator = require('../modules/isFacilitator');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET a list of all decks no need to be protected, it doesn't actually contain any card data
router.get('/',  (req, res) => {
    pool.query(`SELECT * FROM "deck"
                ORDER BY "id";`)
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error with deck GET', error);
            res.sendStatus(500);
        })
});
// GET all the cards in a given deck
router.get('/:id', rejectUnauthenticated, isFacilitator, (req, res) => {
    pool.query(`
    SELECT "card"."id","card"."text","stage_id","stage_type"."type" FROM "card"
    JOIN "stage_type"
    ON "card"."stage_id"="stage_type"."id"
    WHERE "card"."id"=ANY(SELECT unnest("cards_in_deck") FROM "deck" WHERE "id" = $1)
    ORDER BY "card"."id";`,
    [req.params.id])
        .then((results) => {
            res.send(results.rows)
        }).catch((error) => {
            console.log('Error with cards in deck GET', error);
            res.sendStatus(500);
        })
});


// POST a new deck, takes an array of cards that make up the deck, and the description of the deck
router.post('/', rejectUnauthenticated, isAdmin, (req, res) => {
    pool.query(`INSERT INTO "deck"( "cards_in_deck","description" )
    VALUES (ARRAY [${req.body.cards_in_deck}], $1);`,
        [req.body.description])
        .then((results) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Deck POST error:', error);
            res.sendStatus(500);
        })
});


// DELETE a whole deck
router.delete('/:id', rejectUnauthenticated, isAdmin, (req, res) => {
    pool.query(`DELETE FROM "deck"
    WHERE "id"=$1;`,
        [req.params.id])
        .then((results) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Error with deck DELETE:', error);
            res.sendStatus(500);
        })
});

// PUT to edit the makeup of the deck, takes an array of cards.
router.put('/', rejectUnauthenticated, isAdmin, (req, res) => {
    pool.query(`UPDATE "deck"
    SET "cards_in_deck" = ARRAY [${req.body.cards_in_deck}],
    "description" = $1
    WHERE "id" = $2`,
        [req.body.description,
        req.body.id])
        .then((results) => {
            res.sendStatus(200)
        }).catch((error) => {
            console.log('Error with deck PUT:', error);
            res.sendStatus(500);
        })
})

module.exports = router;