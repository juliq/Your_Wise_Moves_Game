/**  Function Should:
 * return the game_state for the facilitator
*/

const pool = require('../../modules/pool');

const rejoinFacilitator =  async (gameId) => {
    try {
        console.log('im running as a facilitator')
        let gameStateResponse = await pool.query(`SELECT "game_stage" FROM "game_state" WHERE 
        "game_id"=$1;`, [gameId]);
        let gameState = gameStateResponse.rows[0].game_stage;
        return {
            gameState,
            gameId,
        }
    }
    catch (err) {
        console.log('Error in rejoinFacilitator handler', err);
    }
}


module.exports = rejoinFacilitator;