/**  Function Should:
 * return the game_state for the player
*/

const pool = require('../../modules/pool');

const rejoinPlayer =  async (code, name) => {
    try {
        console.log('im running as a player')
        const gameResponse = await pool.query(`SELECT "id" FROM "game" WHERE "code"=$1;`, [code])
        let gameId = gameResponse.rows[0].id;
        const playerResponse = await pool.query(`SELECT "id", "journal_id" FROM "player" WHERE "game_id"=$1 AND "name"=$2;`
        , [gameId, name])
        let playerId = playerResponse.rows[0].id;
        let journalId = playerResponse.rows[0].journal_id;
        await pool.query(`UPDATE "player" SET "in_game"=$1 WHERE "id"=$2;`, [true, playerId]);
        let gameStateResponse = await pool.query(`SELECT "game_stage" FROM "game_state" WHERE 
        "game_id"=$1;`, [gameId]);
        let gameState = gameStateResponse.rows[0].game_stage;
        return {
            gameId,
            playerId,
            gameState,
            journalId,
        }
    }
    catch (err) {
        console.log('Error in rejoinPlayer handler', err);
    }
}


module.exports = rejoinPlayer;