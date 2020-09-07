import { all, takeEvery, call, put } from 'redux-saga/effects';
import * as NS from '../types/namespace';
import * as actions from './actions';
import * as api from "../api";

const loadDictionary: NS.ILoadDictionary['type'] = 'LOAD_DICTIONARY';

export default function getSaga() {
  return function* saga() {
    yield all([
      takeEvery(loadDictionary, executeLoadDictionary),
    ]);
  }
}

function* executeLoadDictionary() {
  try {
    const response = yield call(api.getData);
    yield put(actions.loadDictionarySuccess(response));
  } catch (error) {
    yield put(actions.loadDictionaryFailed(error.message));
  }
}
