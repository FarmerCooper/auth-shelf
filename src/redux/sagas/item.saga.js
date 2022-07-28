import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';


// worker Saga: will be fired on "FETCH_USER" actions
function* fetchItems() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/shelf', config);
    console.log('This is response.data', response.data);
    yield put({ type: 'SET_ITEM', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* itemSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
}

export default itemSaga;