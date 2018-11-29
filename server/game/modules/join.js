/**  Function Should:
 * Run whenever a facilitator choose to move the game forward
 * Update the game state in the database
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');

//the structure for what a join action will look like from the client
const sampleJoinAction = {
    type: 'join',
    data: {
        name: '',
    },
}

const join = async (action, gameId, socket, config) => {
    try {
        let playerCount = await pool.query(`SELECT COUNT("player"."id") FROM "game"
        FULL JOIN "player"
        ON "game"."id"="player"."game_id"
        WHERE "game"."id"=$1
        GROUP BY "game"."name";
        `, [gameId])
        if (playerCount.rows[0] && playerCount.rows[0].count < config.maxPlayers) {
            //As each player joins create a journal row
            let journalId = await pool.query(`INSERT INTO "journal" ("game_id") VALUES ($1)
            RETURNING "id";`, [gameId]);
            journalId = journalId.rows[0].id;
            //create the player's row in the table
            let playerId = await pool.query(`INSERT INTO "player" ("name", "game_id", "journal_id", "in_game")
            VALUES ($1,$2,$3,$4) RETURNING "id";`, [action.data.name, gameId, journalId, true]);
            //send the player information back to the client
            playerId = playerId.rows[0].id;

            /* socket emissions */
            //set player that joined's redux state on client
            socket.emit('join', { ...action, data: { id: playerId }, game: gameId });
            //tell all players to update their player record
            socket.broadcast.emit('players', { type: 'done' })
            //tell inbound player to update their game state
            socket.emit('moves', {
                type: 'advance',
                data: {
                    newGameState: '00',
                },
            })
        } else {
            throw new Error('The max number of players for this game has been reached');
        }
    }
    catch (err) {
        console.log('Error in join handler', err);
    }
}


module.exports = join;

