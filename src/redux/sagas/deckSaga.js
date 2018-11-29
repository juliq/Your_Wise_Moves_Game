import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDecks(action) {
    try {
        const response = yield axios.get('api/deck')
        yield put({ type: 'SET_DECKS', payload: response.data });
    } catch (error) {
        console.log('Error getting decks', error);
    }
}

function* fetchDeckContent(action) {
    try {
        const response = yield axios.get(`api/deck/${action.payload}`)
        yield put({ type: 'SET_SELECTED_DECK', payload: response.data });
    } catch (error) {
        console.log('Error getting selected deck', error);
    }
}

function* addDeck(action) {
    try {
        yield axios.post('api/deck', action.payload)
        yield put({ type: 'FETCH_DECKS' });
    } catch (error) {
        console.log('Error updating deck: ', error)
    }
}
function* editDeck(action) {
    try {
        yield axios.put('api/deck', action.payload)
        yield put({ type: 'FETCH_DECKS' });
    } catch (error) {
        console.log('Error updating Deck: ', error)
    }
}
function* deleteDeck(action) {
    try {
        yield axios.delete(`api/deck/${action.payload}`);
        yield put({ type: 'FETCH_DECK' });
    } catch (error) {
        console.log('Error deleting deck', error);
    }
}

function* deckSaga() {
    yield takeLatest('FETCH_DECKS', fetchDecks);
    yield takeLatest('SET_SELECTED_DECK', fetchDeckContent);
    yield takeLatest('ADD_DECK', addDeck);
    yield takeLatest('EDIT_DECK', editDeck);
    yield takeLatest('DELETE_DECK', deleteDeck);
}

export default deckSaga;