const chat = (state = [], action) => {
    switch(action.type) {
        case 'SET_CHAT':
            return action.payload;
        default:
            return state;
    }
}




export default chat;