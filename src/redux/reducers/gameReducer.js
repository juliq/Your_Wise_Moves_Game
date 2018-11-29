import { combineReducers } from 'redux';

const game = (state = '', action) => {
    switch (action.type) {
        case 'SET_GAME':
            return action.payload;
        default:
            return state;
    }
};

const gameState = (state =  '00', action) => {
    switch (action.type) {
        case 'UPDATE_GAME_STATE':
            return action.payload.newGameState;
        default:
            return state;
    }
};



const journal = (state = {intention: '', question_one: '', question_two: '', question_three: '', question_four: '', question_five: '', response_one: '', response_two: '', response_three: '', response_four: '', response_five: '' }, action) => {
    switch (action.type) {
        case 'UPDATE_JOURNAL_QUESTION':
            let question = `question_${action.payload.roundNumber}`;
            let response = `question_${action.payload.roundNumber}`;
            return {
                ...state,
                [question]: action.payload.question,
                [response]: action.payload.response,
            };
        case 'UPDATE_INTENTION':
            return {
                ...state,
                intention: action.payload.intention,
            }
        case 'UPDATE_JOURNAL_INTENTION':
            return {
                ...state,
                intention: action.payload.intention,
            }
        case 'SET_JOURNAL':
            return action.payload;
        default:
            return state;
    }
};

const player = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PLAYER':
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

const allPlayers = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PLAYERS':
            return action.payload;
        default:
            return state;
    }
}

const roundNumber = (state = '0', action) => {
    switch (action.type) {
        case 'UPDATE_ROUND_NUMBER':
            return action.payload;
        default:
            return state;
    }
}

const selectedPlayer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PLAYER':
            return action.payload.player;
        case 'CLEAR_SELECTED_PLAYER':
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    game,
    gameState,
    player,
    journal,
    allPlayers,
    roundNumber,
    selectedPlayer,
});
