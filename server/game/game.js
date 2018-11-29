//function handles start of games
const start = require('./modules/start');

//function handles data sent from the clients
const receiver = require('./modules/receiver');

//function handles end of games
const end = require('./modules/end');

//function marks a player as not in game
const removePlayer = require('./modules/removePlayer');

//function handles chat events
const chatHandler = require('./modules/chat');

//functions allow players and facilitators to rejoin
const rejoinPlayer = require('./modules/rejoinPlayer');
const rejoinFacilitator = require('./modules/rejoinFacilitator');


//define variables that will be needed throughout functions
let game_socket;
let code;
let gameId;
let link;
let config;

exports.begin = async (facilitatorId, gameConfig, io) => {
    try {
        config = gameConfig;
        const data = await start(facilitatorId, config);
        //split up returned data for readability 
        code = data.code;
        gameId = data.gameId;
        //start socket here
        link = await
            //unique namespace for connection
            io.of(`/${code}`)
                //on connection do this:
                .on('connection', socket => {
                    socket.emit('start', { message: 'Connected to server.', code });
                    //set listener for players joining
                    socket.on('join', action => {
                        receiver(action, gameId, socket, config);
                    })
                    //set listener for game actions
                    socket.on('moves', action => {
                        console.log('received');
                        receiver(action, gameId, socket, config);
                    })
                    socket.on('chat', message => {
                        console.log('chat event occured');
                        chatHandler(message, gameId, socket, config,)
                    })
                    socket.on('end', action => {
                        socket.broadcast.emit('end', { done: true })
                    })
                    socket.on('leave', action => {
                        console.log('in leave');
                        removePlayer(action, gameId, socket, config);
                    })
                    socket.on('disconnect', data => {
                        console.log('a client has disconnected');
                    })
                    game_socket = socket;
                })
    }
    catch (err) {
        console.log('Error in game start', err);
    }
    console.log('game created');
    return ({ code, gameId });
}

exports.rejoin = async (type, identifier, name) => {
    console.log(type);
    if (type === 'player') {
        try { 
            let response = await rejoinPlayer(identifier, name); 
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (type === 'facilitator') {
        try { 
            let response = await rejoinFacilitator(identifier);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
}

exports.end = async (facilitatorId, io) => {
    try {
        setTimeout(() => {
            end(game_socket, gameId, link, io, code);
        }, 3000)
    }
    catch (err) {
        console.log('Error ending game', err);
    }
}