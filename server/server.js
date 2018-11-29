
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const server = require('http').Server(app);
const io = require('socket.io')(server);


//middleware allows io to be accessed in game router
app.use(function(req, res, next) {
  req.io = io;
  next();
});

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const cardRouter = require('./routes/card.router');
const deckRouter = require('./routes/deck.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/game', require('./game/routes/game.router'));
app.use('/api/user', userRouter);
app.use('/api/card', cardRouter)
app.use('/api/deck', deckRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
