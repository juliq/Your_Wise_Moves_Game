# Your Wise Moves™

## Client Overview
Julie Delene is founder and owner of Move As One, a wholistic consulting service, whose goal is to empower leaders and teams to clarify their direction and meet their highest goals. Your Wise Moves™ was created by Julie and is intended as a tool to help organizations and groups solve problems together and inspire a way forward. Julie aligns leaders and teams using the game.

------------
## Your Wise Moves™ Overview
We created a digital version of the Your Wise Moves™ game. Our goal in creating this app, was to make it possible for Julie to both expand her game to reach a broader audience and, in addition to facilitating the game in-person, eventually facilitate the game remotely to groups in different locations. The digital game version enables Julie to add, edit and delete cards in the deck as well as add decks.

------------
## Roles

**Administrator:** The game administrator (Julie) is the only person who has the authority to make any changes to the game. As mentioned above, she is able to add, edit and delete cards in a deck as well as create new decks. Julie creates an account for each facilitator, giving them access to facilitate games.
**Facilitator:** The game facilitator has received extensive training from Julie and has the authority to facilitate games. The facilitator needs to log in to begin a game.
**Player:** The player does not need an account to play the game
### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
#### Prerequisites
What you will need to do to to get the project running:
* You'll need these softwares:
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
* run
```npm install```
in terminal to install node modules
* configure your postgres database to match the pool.js file
* create a SERVER_SESSION_SECRET in a .env file

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes.

------------
### Technology Overview
* Node
* Express
* PostgreSQL
* Passport
* React
* Redux/Saga
* Socket.io
* Node Mailer
* CSS
* 3JS
* SASS

------------
# Game Logic
## Overview
* Each game runs on a unique socket connection in the namespace of a randomly generated code.
* Clients connect to the socket through user input of a player name and the randomly generated code. 
* Game data is stored in a postgreSQL database while the game is active. All game data is deleted in a cascade at the end of the game. 
* The state of the game in the sql database is mirrored by the client side redux state during the game.
* Socket events created by clients are transmitted to the server where the database is manipulated, then transmitted back to that client and all other connected clients to update their redux state. 

------------
## Server Side

### All of the server side files for the game operation live in /server/game.
 
On the server, the game is structured as an exportable node module to be used in the game router. game.js exports functions for creating, rejoining, and ending games. Inside of the /game directory live all of the separate modules needed to run the game. 

The most critical sub module to the game's functionality is receiver.js.
This function is run on the data received in socket events from the clients. 
This function determines the necessary sub-module to run based on the data contained in the socket event. 

Other modules in the game directory are local to one specific player action that can be transmitted. For example, the advance.js function is run whenever the game needs to be moved forward one stage. 

In addition to the socket connections for data transmission, there are also several routes in the game router specifically for players in game to refresh certain data sets through redux-sagas. In short, the socket connection is responsible for transmitting key game actions and no more than one 'row' of data between clients and server, and REST api get routes for clients to refresh the whole specific data set. 

------------
## Client Side

###The bulk of the files for the client side of the game are in the /src/components/Game directory. 

The game begins and ends on the client side through api post requests to the server.

The client side components for the game views are structured like a tree branching off of the Game.js file. Game.js conditionally renders sub components based on the current game state in redux. 

The client side also has a receiver.js file, this file operates very similarly to the server side file, but instead of modifying data in the database, it constructs and returns redux actions to be dispatched in the game components.

In addition to the main component views that branch from Game.js, there is a sidebar and an action panel that have matching conditional rendering to show the proper actions and data throughout the game experience.

All of the game data that exists in rows in the sql database have matching reducers to store the arrays of javascript objects that are pulled from the database.

The game heavily uses sagas for any type of action that requires a single client fetching whole data sets at once.

------------
# THREE.js

The rendered canvas is placed in the background of the entire app.  As the rounds of the game progress, the background
changes to reflect the change.  There is a black sphere, or a neutral sphere, that moves to the front and then 
switches places with the current rounds' sphere.  It does this along an inside or outside bezier curve path so that
the sphere never travel through one another.  These curve paths are also eased so that the animation looks more natural.  
The background also rotates to reflect the current round by revealing a different colored part of the background plane, most
of which is not in the field of view at any given point.

The animation functions are called in Game.js when certain socket events are received.  

All THREE.js code is located in /src/components/App/Background.js

**NOTE:**  Currently, upon a player rejoin the background will not properly reflect the state of the game.

------------
# SASS/SCSS

In the stylesheets folder, you will see four folders:

**base:** Houses styling for body and other app wide styling
**components:** Any component that needs it's own specific styling is housed here
**themes:**  Right now, only a neutral theme is housed here, which is used app wide.  A goal of the app is to have a seperate
         theme for each of the 5 rounds of the game, and change to the other styling themes as the game progresses.
**utils:**  Panels, cards, and other utilities styling are housed here.  

Each of these folders has an all.scss file, that imports the other files in the folder.  main.scss imports the all.scss
files from each of the four folders.  

 
