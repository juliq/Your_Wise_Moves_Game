import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* fetchGames(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/games'})
    yield put({ type: 'SET_GAMES', payload: response.data });
  } catch (error) {
    console.log('games get request failed', error);
  }
}

function* fetchGame(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/game', params: {id: action.payload}})
    yield put({ type: 'SET_GAME', payload: response.data });
  } catch (error) {
    console.log('game get request failed', error);
  }
}

function* gamesSaga() {
  yield takeLatest('FETCH_GAMES', fetchGames);
  yield takeLatest('FETCH_GAME', fetchGame);
}

export default gamesSaga;