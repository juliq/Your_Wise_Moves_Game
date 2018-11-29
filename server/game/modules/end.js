/**  Function Should:
 * Run on game ending by facilitator
 * should store this game's results in a separate temporary results table
 * schedule an action to clear that table in however long
 * clear all data with cascading delete
 * close socket connections after all users have responded to the results prompt
*/

const pool = require('../../modules/pool');
const schedule = require('node-schedule');
const moment = require('moment');

const end = async (socket, gameId, link, io, code) => {
    try {
        //store this game's results in a separate temporary results table
            //player id, player name, intention, all qs and as
        let playerResponse = await pool.query('SELECT * FROM "player" WHERE "game_id"=$1;', [gameId]);
        let players = playerResponse.rows;
        console.log(players);
        for (let player of players) { //insert a results row for each player
            let journalResponse = await pool.query('SELECT * FROM "journal" WHERE "id"=$1;', [player.journal_id])
            journal = journalResponse.rows[0];
            pool.query(`INSERT INTO "result"
            ("game_id", "player_id", "intention", "question_one", "response_one", "question_two", "response_two",
            "question_three", "response_three", "question_four", "response_four", "question_five", "response_five"
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);
            `, [gameId, player.id, player.intention, journal.question_one, journal.response_one, journal.question_two, journal.response_two,
                journal.question_three, journal.response_three, journal.question_four, journal.response_four, journal.question_five, journal.response_five
            ])
        }
        //schedule an action to clear that table in however long
        let deleteResults = gameId => {
            console.log('deleting results');
            pool.query(`DELETE FROM "result" WHERE "game_id"=$1;`, [gameId]);
        }

        //configure date object to be one day from when game ends
        let date = moment();
        console.log(date);
        let day = date.date();
        let newDay = day + 1;
        let scheduleDate = date.date(newDay);
        scheduleDate = scheduleDate.toDate();
        //schedule the delete task
        let task = schedule.scheduleJob(scheduleDate, () => deleteResults(gameId))

        //cascading delete on all temporary game data
        await pool.query(`DELETE FROM "game" WHERE "id"=$1;`, [gameId]);
        
        //end the socket connection
        try {
            const connectedNameSpaceSockets = Object.keys(link.connected); // Get Object with Connected SocketIds as properties
            connectedNameSpaceSockets.forEach(socketId => {
                link.connected[socketId].disconnect(); // Disconnect Each socket
            });
            link.removeAllListeners(); // Remove all Listeners for the event emitter
            delete io.nsps[`/${code}`]; //delete the namespace
        }
        catch (err) {
            console.log('Error disconnection sockets', err);
        }
    }
    catch (err) {
        console.log('Error ending game', err);
    }
    console.log('Game ended successfully');
}


module.exports = end;