/**  Function Should:
 * Run when a facilitator clicks a start game button
 * Generate a unique code for the game
 * Insert row into game table
 * Create discussion phase and game state rows
*/
const pool = require('../../modules/pool');
const newCode = require('randomatic');

//changes needed -> all settings changed in database, allow options to be accessible throughout game modules
//check the database to make sure the code is unique before creating the new game with it

const start = async (facilitatorId, config) => {
    try {
        //use module to generate new six digit numerical code
        let code;
        let untestedCode = true;
        while(untestedCode) { //make new codes until a unique one is generated
            code = await newCode('0', 6);
            let response = await pool.query(`SELECT * FROM "game" WHERE "code"=$1;`, [code]);
            if(response.rows[0]){
                console.log('code matched');
            }
            else {
                untestedCode = false;
            }
        }
        //create new game row, get the id back from db
        let gameId = await pool.query(`INSERT INTO "game" ("facilitator_id", "name", "max_players", "can_kick", "show_directions", "deck_id", "code")
            VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "id";`, [facilitatorId, config.name, config.maxPlayers, config.canKick, config.showDirections, config.deckId, code]);
        gameId = gameId.rows[0].id
        //create new game state row using game id
        pool.query(`INSERT INTO "game_state" ("game_id")
            VALUES ($1);`, [gameId]);
        //send the data back to the game function
        return {
            gameId,
            code,
        };
    }
    catch (err) {
        console.log('Error starting game', err);
    }
}

module.exports = start;