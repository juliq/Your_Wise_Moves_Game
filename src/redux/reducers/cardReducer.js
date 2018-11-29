const cards = (state = { originalCards: [], cards: [] }, action) => {
    switch (action.type) {
        case 'SET_CARDS':
            return { originalCards: action.payload, cards: action.payload };
        case 'CLEAR_CARD_FILTER':
            return { ...state, cards: state.originalCards };
        case 'FILTER_CARDS_BY_CATEGORY':
            return { ...state, cards: state.originalCards.filter(card => card.stage_id === Number(action.payload)) }
        case 'FILTER_CARDS_BY_DECK':
            return { ...state, cards: action.payload };
        case 'SET_SPECIFIC_CARD':
            return {
                ...state,
                card: {
                    id: action.payload.id,
                    stage_id: action.payload.stage_id,
                    text: action.payload.text,
                    type: action.payload.type
                }
            }
        default:
            return state;
    }
}




export default cards;