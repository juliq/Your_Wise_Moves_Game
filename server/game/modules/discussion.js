/**  Function Should:
 * Run whenever a discussion phase needs to be advanced by facilitator
 * Run a query on the database to update the boolean value of the speaker identified in the data
 * Emit an event to the client to signal success and refresh data.
*/

const pool = require('../../modules/pool');

//the structure for what a discussion action will look like from the client
const sampleDiscussionAction = {
    type: 'discussion',
    data: {
        player: {},
        set: 'next', //or 'done' // or 'ready'
    },
    facilitatorId: 0,
}

const discussion = async (action, gameId, socket, config) => {
    switch (action.data.set) {
        //update player to reflect that they have spoken their turn in the discussion phase
        case 'done':
            try {
                //update the player to reflect that they have spoken
                await pool.query(`UPDATE "player" SET "discussed"=$1, "selected"=$2 WHERE "id"=$3;`, [true, false, action.data.player.id]);
                //let all the clients know that this player has spoken
                socket.emit('players', { type: 'done' });
                socket.broadcast.emit('players', { type: 'done' })
                //clear the selected player on all clients
                socket.emit('moves', {
                    type: 'discussion', data: {
                        player: {},
                    }
                });
                socket.broadcast.emit('moves', {
                    type: 'discussion', data: {
                        player: {},
                    }
                });
            }
            catch (err) {
                console.log('Error in discussion handler', err);
            }
            break;
        //update all clients on which player is selected to speak
        case 'next':
            try {
                console.log('in next', action.data.player)
                await pool.query(`UPDATE "player" SET "selected"=$1 WHERE "id"=$2;`, [true, action.data.player.id]);
                socket.emit('players', { type: 'done' });
                socket.emit('player', { type: 'done' });
                socket.broadcast.emit('players', { type: 'done' })
                //let all the clients know that this player is selected
                socket.emit('moves', {
                    type: 'discussion', data: {
                        player: action.data.player,
                    }
                });
                socket.broadcast.emit('moves', {
                    type: 'discussion', data: {
                        player: action.data.player,
                    }
                });
            }
            catch (err) {
                console.log('Error in discussion handler', err);
            }
            break;
        case 'ready':
            try {
                console.log('in ready', action.data.player)
                //update the player to reflect that they are ready
                await pool.query(`UPDATE "player" SET "in_discussion"=$1 WHERE "id"=$2;`, [true, action.data.player]);
                //let all the clients know that this player is ready
                socket.emit('players', { type: 'done' });
                socket.broadcast.emit('players', { type: 'done' })
            }
            catch (err) {
                console.log('Error in discussion handler', err);
            }
            break;
    }
}


module.exports = discussion;