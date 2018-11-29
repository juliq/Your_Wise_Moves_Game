import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCards(action) {
    try {
        const response = yield axios.get('api/card')
        yield put({ type: 'SET_CARDS', payload: response.data });
    } catch (error) {
        console.log('Error getting cards', error);
    }
}

function* fetchSpecificCard(action) {
    try {
        const response = yield axios.get(`api/card/${action.payload}`)
        yield put({ type: 'SET_SPECIFIC_CARD', payload: response.data });
    } catch (error) {
        console.log('Error getting cards', error);
    }
}

function* addCard(action) {
    try {
        yield axios.post('api/card', action.payload)
        yield put({ type: 'FETCH_CARDS' });
        yield put({ type: 'FETCH_DECKS' });
    } catch (error) {
        console.log('Error adding card: ', error)
    }
}
function* editCard(action) {
    try {
        yield axios.put('api/card', action.payload)
        yield put({ type: 'FETCH_CARDS' });
    } catch (error) {
        console.log('Error updating card: ', error)
    }
}
function* deleteCard(action) {
    try {
        yield axios.delete(`api/card/${action.payload}`);
        yield put({ type: 'FETCH_CARDS' });
        yield put({ type: 'FETCH_DECKS' });
    } catch (error) {
        console.log('Error deleting card', error);
    }
}

function* fetchDeckCards(action) {
    if (action.payload !== '0') {
        try {
            const response = yield axios.get(`api/deck/${action.payload}`)
            yield put({ type: 'FILTER_CARDS_BY_DECK', payload: response.data });
        } catch (error) {
            console.log('Error getting cards', error);
        }
    } else {
        yield put({type:'CLEAR_CARD_FILTER'})
    }
}

function* cardSaga() {
    yield takeLatest('FETCH_CARDS', fetchCards);
    yield takeLatest('FETCH_SPECIFIC_CARD', fetchSpecificCard);
    yield takeLatest('FETCH_DECK_CARDS', fetchDeckCards);
    yield takeLatest('ADD_CARD', addCard);
    yield takeLatest('EDIT_CARD', editCard);
    yield takeLatest('DELETE_CARD', deleteCard);
}

export default cardSaga;