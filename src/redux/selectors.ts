import * as NS from '../types/namespace';
import { IAppReduxState, ICommunication } from "../types/app";
import { IDictionary } from "../types/responses";

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.main;
}

export function selectDictionary(state: IAppReduxState): IDictionary {
  return getFeatureState(state).data.dictionary;
}

export function selectCommunication(state: IAppReduxState, key: keyof NS.IReduxState['communication']): ICommunication {
  return getFeatureState(state).communication[key];
}
