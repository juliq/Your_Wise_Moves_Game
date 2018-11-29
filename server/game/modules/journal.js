/**  Function Should:
 * Run whenever a user submits data to be saved in their journal
 * Insert the new answer into the table based on the provided round 
 * Emit an event to the specific client(s) to let them know it has been updated
*/

const pool = require('../../modules/pool');

//the structure for what a journal action will look like from the client
const sampleJournalAction = {
    type: 'journal',
    intention: 'false', //or true
    data: {
        playerId: '',
        question: '',
        response: '',
        roundNumber: 'one',
    },
    //or (when intention is true)
    data: {
        playerId: '',
        intention: '',
    }
}

const journal = async (action, gameId, socket, config) => {
    console.log(action);
    try {
        //get the inbound player's journal id
        let journalId = await pool.query(`SELECT * FROM "player" WHERE "id"=$1;`, [action.data.playerId]);
        journalId = journalId.rows[0].journal_id;
        //if the action is to update the intention
        if(action.intention){
            //update the intention in journal table
            await pool.query('UPDATE "journal" SET "intention"=$1 WHERE "id"=$2;', [action.data.intention, journalId])
            //update the intention in player table
            await pool.query('UPDATE "player" SET "intention"=$1 WHERE "id"=$2;', [action.data.intention, action.data.playerId])
            //tell the specific player to update redux state
            socket.emit('player', {done: true})
            //tell the facilitator to update their player info
            socket.broadcast.emit('players', {done: true})
        }
        //else the action is to update the journal body
        else {
            let query;
            //switch over which round number the journal update is for
            switch (action.data.roundNumber) {
                case '1':
                    query = `UPDATE "journal" set "question_one"=$1, "response_one"=$2 WHERE "id"=$3;`
                    break;
                case '2':
                    query = `UPDATE "journal" set "question_two"=$1, "response_two"=$2 WHERE "id"=$3;`
                    break;
                case '3':
                    query = `UPDATE "journal" set "question_three"=$1, "response_three"=$2 WHERE "id"=$3;`
                    break;
                case '4':
                    query = `UPDATE "journal" set "question_four"=$1, "response_four"=$2 WHERE "id"=$3;`
                    break;
                case '5':
                    query = `UPDATE "journal" set "question_five"=$1, "response_five"=$2 WHERE "id"=$3;`
                    break;
            }
            //update the correct journal information
            await pool.query(query, [action.data.question, action.data.response, journalId]);
        }
        //sets inbound player's redux state to include the journal update
        socket.emit('moves', { ...action });
    }
    catch (err) {
        console.log('Error in journal handler', err);
    }
}


module.exports = journal;