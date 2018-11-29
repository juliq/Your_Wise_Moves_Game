import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* rejoinGamePlayer(action) {
  try { //later should fetch journal
    const response = yield call(axios, {method: 'POST', url: '/game/rejoin', data: {type: 'player', identifier: action.payload.code, name: action.payload.name}})
    console.log(response);
    yield put({ type: 'FETCH_PLAYER', payload: response.data.playerId });  
    yield put({ type: 'FETCH_PLAYERS', payload: response.data.gameId }); 
    yield put({ type: 'FETCH_CHAT', payload: response.data.gameId });  
    yield put({ type: 'FETCH_JOURNAL', payload: response.data.journalId });  
    yield put({ type: 'UPDATE_GAME_STATE', payload: {
        newGameState: response.data.gameState,
    } });  
    yield put({ type: 'UPDATE_ROUND_NUMBER', payload: response.data.gameState[0]})
} catch (error) {
    console.log('rejoin game as player request failed', error);
  }
}

function* rejoinGameFacilitator(action) {
  try {
    const response = yield call(axios, {method: 'POST', url: '/game/rejoin', data: {type: 'facilitator', identifier: action.payload}})
    yield put({ type: 'FETCH_PLAYERS', payload: action.payload }); 
    yield put({ type: 'FETCH_CHAT', payload: response.data.gameId });  
    yield put({ type: 'UPDATE_GAME_STATE', payload: {
        newGameState: response.data.gameState,
    } });  
    yield put({ type: 'UPDATE_ROUND_NUMBER', payload: response.data.gameState[0]})
  } catch (error) {
    console.log('rejoin game as facilitator request failed', error);
  }
}

function* rejoinSaga() {
  yield takeLatest('REJOIN_GAME_PLAYER', rejoinGamePlayer);
  yield takeLatest('REJOIN_GAME_FACILITATOR', rejoinGameFacilitator);
}

export default rejoinSaga;