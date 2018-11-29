/**  Function Should:
 * Run whenever a facilitator choose to move the game forward
 * Update the game state in the database
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');
const chat = require('../modules/chat');
const directions = require('../data/directions');
//the structure for what a advance action will look like from the client
const sampleAdvanceAction = {
    type: 'advance',
    data: {
        newGameState: 00,
        resetDiscussion: true, //or false
    },
    facilitatorId: 0,
}

const advance =  async (action, gameId, socket, config) => {
    console.log(action);
    if (config.showDirections) {
        let x = directions(action.data.newGameState)
        if ( x != ''){
            chat({
                message: x,
                type: 'directions',
                from: 'guide',
            }, gameId, socket, config)
        }
    }
    try {
        //update the database to reflect the new game state
        await pool.query(`UPDATE "game_state" SET "game_stage"=$1 WHERE "game_id"=$2;`, 
            [action.data.newGameState, gameId]);

        //if this action is the start of a new round, clear player discussion booleans
        if(action.data.resetDiscussion === true) {
            await pool.query(`UPDATE "player" SET "discussed"=$1, "in_discussion"=$1, "selected"=$1 WHERE "game_id"=$2;`, [false, gameId])
        }
        //send the action to all other users
        socket.emit('moves', {...action});
        socket.broadcast.emit('moves', {...action});
    }
    catch (err) {
        console.log('Error in advance handler', err);
    }
}


module.exports = advance;