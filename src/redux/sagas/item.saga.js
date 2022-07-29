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

function* addItem(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('action.payload', action.payload);

    yield axios.post('/api/shelf', action.payload, config);
    yield put({type: 'POST_ITEM', payload: action.payload});
  } catch (error) {
    console.log('User post request failed', error);
  }
}

function* deleteItem(action) {
  console.log('this is action', action.payload);
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.delete(`/api/shelf/${action.payload}`, config)
    yield put({type: 'UNSET_ITEM'});
  }
  catch (error) {
    console.log('item is too strong to be deleted', error);
  }
}


function* itemSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeLatest('ADD_ITEM', addItem);
  yield takeEvery('VANISH_ITEM', deleteItem);
}

export default itemSaga;