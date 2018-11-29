const selectedGame = (state = {}, action) => {
    switch(action.type) {
        case 'SELECT_GAME':
            let result;
            for (let item of action.payload.games) {
                if (item.id == Number(action.payload.id)){
                    result = item;
                    return result;
                }
            }
        case 'CLEAR_SELECT_GAME':
            return {};
        default:
            return state;
    }
}


export default selectedGame;