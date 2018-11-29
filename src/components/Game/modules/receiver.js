/** receiver.js
 * module for converting custom actions to redux actions
 * case switch calls appropriate subfunction based on action type
 */

//function receives actions and routes them to their proper handlers
const receiver = (action) => { //receiver must return a redux action
    switch (action.type) {
        case ('advance'):
            return (advance(action));
        case ('discussion'):
            return (discussion(action));
        case ('journal'):
            return (journal(action));
        case ('join'):
            return (join(action));
    }
}

const advance = action => { //returns redux action to advance game state
    const reduxAction = {
        type: 'UPDATE_GAME_STATE',
        payload: {
            newGameState: action.data.newGameState,
            fetchPlayers: action.data.resetDiscussion,
        }
    }
    return reduxAction;
}

const journal = action => { //returns redux action to update intention or journal
    let reduxAction;
    if (action.intention) { //if intention boolean is set to true
        reduxAction = {
            type: 'UPDATE_INTENTION', //update journal intention
            payload: {
                intention: action.data.intention,
            }
        }
    }
    else { //else update the journal body
        reduxAction = {
            type: 'UPDATE_JOURNAL_QUESTION',
            payload: {
                question: action.data.question,
                response: action.data.response,
                roundNumber: action.data.roundNumber,
                playerId: action.data.playerId,
            }
        }
    }
    return reduxAction;
}

const join = action => { //returns array of two actions to handle join actions
    const actions = [];
    //action one sets the joining players info into redux
    const reduxActionOne = {
        type: 'FETCH_PLAYER',
        payload: action.data.id,
        
    }
    //action two sets the game id into redux state
    actions.push(reduxActionOne);
    const reduxActionTwo = {
        type: 'FETCH_GAME',
        payload: action.game
    }
    actions.push(reduxActionTwo);
    //action three gets all of the other players
    const reduxActionThree = {
        type: 'FETCH_PLAYERS',
        payload: action.game
    }
    actions.push(reduxActionThree);
    return actions;
}

const discussion = action => { //returns action that sets selected player in redux state (for display)
    const reduxAction = {
        type: 'SET_SELECTED_PLAYER',
        payload: {
            player: action.data.player,
        }
    }
    return reduxAction;
}

export default receiver;