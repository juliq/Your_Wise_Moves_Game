/**  Function Should:
 * run whenever a player disconnects from the game
*/

const pool = require('../../modules/pool');

const removePlayer =  async (action, gameId, socket, config) => {
    try {
        await pool.query(`UPDATE "player" SET "in_game"=$1 WHERE "id"=$2;`, [false, action.id]);
        socket.broadcast.emit('players', {done: true});
        socket.broadcast.emit('game', {done: true});
    }   
    catch (err) {
        console.log('Error in remove player handler', err);
    }
}


module.exports = removePlayer;