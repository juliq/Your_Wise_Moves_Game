//routes to start, end game 
const router = require('express').Router();
const game = require('../game');
const pool = require('../../modules/pool');

const { rejectUnauthenticated } = require('../../modules/authentication-middleware');
const isFacilitator = require('../../modules/isFacilitator');

const transporter = require('../../modules/transporter');
const mailOptions = require('../../modules/mailOptions');

//post route (will require facilitator auth) to start game
router.post('/start', isFacilitator, async (req, res) => {
    const data = await game.begin(req.user.id, req.body.gameConfig, req.io);
    res.send(data);
})


//get route for players in a specific game, no auth required
router.get('/players', (req, res) => {
    pool.query(`SELECT * FROM "player" WHERE "game_id"=$1`, [req.query.id])
        .then(results => {
            res.send(results.rows);
        })
        .catch(err => {
            console.log('Error in players get', err);
        })
})

//get route for player in a specific game, no auth required
router.get('/player', (req, res) => {
    pool.query(`SELECT * FROM "player" WHERE "id"=$1`, [req.query.id])
        .then(results => {
            res.send(results.rows[0]);
        })
        .catch(err => {
            console.log('Error in player get', err);
        })
})

//get route for facilitator to get all of their active games
router.get('/games', rejectUnauthenticated, isFacilitator, (req, res) => {
    pool.query(`SELECT "game"."id", "game"."name" as "name", "game"."code" as "code", COUNT("player"."id") as "players", COUNT("player"."in_game"=true) as "active" FROM "game"
    FULL OUTER JOIN "player" ON "game"."id"="player"."game_id" 
    WHERE "game"."facilitator_id"=$1
    GROUP BY "game"."id";
 `, [req.user.id])
        .then(results => {
            res.send(results.rows);
        })
        .catch(err => {
            console.log('Error in games get', err);
            res.sendStatus(500);
        })
})

router.get('/game',  (req, res) => {
    pool.query(`SELECT * FROM "game" WHERE "id"=$1;`, [req.query.id])
        .then(results => {
            res.send(results.rows[0]);
        })
        .catch(err => {
            console.log('Error in game get', err);
            res.sendStatus(500);
        })
})

//post route for rejoining active games
router.post('/rejoin', (req, res) => { 
    game.rejoin(req.body.type, req.body.identifier, req.body.name)
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        console.log('error rejoining game', err);
    })
})

//router for player to get up to date journal info at all times
router.get('/journal', (req, res) => {
    pool.query(`SELECT * FROM "journal" WHERE "id"=$1;`, [req.query.id])
    .then(results => {
        res.send(results.rows[0])
    })
    .catch(err => {
        console.log('Error in journal get', err);
    })
})


//post route for getting results emailed after the game 
router.post('/get/results', async (req, res) => {
    //get results based on player id    
    let resultResponse = await pool.query(`SELECT * FROM "result" WHERE "player_id"=$1;`, [req.body.id])
    let response = resultResponse.rows[0];
    //will then pass the response and req.body.email into mailOptions
    //then dispatch the email with transporter module
    console.log(response);
    transporter.sendMail(mailOptions(req.body.email, response))
        .then(done => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('error sending mail', err);
        })

})

//get route for chat messages
router.get('/get/chat', (req, res) => {
    pool.query(`SELECT * FROM "chat" WHERE "game_id"=$1;`, [req.query.id])
    .then(results => {
        console.log(results);
        res.send(results.rows);
    })
    .catch(err => {
        console.log('error getting chat', err);
        res.sendStatus(500);
    })
})

//post route (will require facilitator auth) to end game
router.post('/end', rejectUnauthenticated, isFacilitator, (req, res) => {
    game.end(req.user.id, req.io)
        .then(() => res.sendStatus(200));
})


module.exports = router;