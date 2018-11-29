import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* fetchPlayers(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/players', params: {id: action.payload}})
    yield put({ type: 'SET_ALL_PLAYERS', payload: response.data });
  } catch (error) {
    console.log('players get request failed', error);
  }
}

function* fetchPlayer(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/player', params: {id: action.payload}})
    yield put({ type: 'SET_PLAYER', payload: response.data });
  } catch (error) {
    console.log('player get request failed', error);
  }
}

function* fetchJournal(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/journal', params: {id: action.payload}})
    yield put({ type: 'SET_JOURNAL', payload: response.data });
  } catch (error) {
    console.log('journal get request failed', error);
  }
}

function* playersSaga() {
  yield takeLatest('FETCH_PLAYERS', fetchPlayers);
  yield takeLatest('FETCH_PLAYER', fetchPlayer);
  yield takeLatest('FETCH_JOURNAL', fetchJournal);
}

export default playersSaga;