import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

function* fetchChat(action) {
  try {
    const response = yield call(axios, {method: 'GET', url: '/game/get/chat', params: {id: action.payload}})
    yield put({ type: 'SET_CHAT', payload: response.data });
  } catch (error) {
    console.log('chat get request failed', error);
  }
}

function* chatSaga() {
  yield takeLatest('FETCH_CHAT', fetchChat);
}

export default chatSaga;