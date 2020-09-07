import * as NS from '../../types/namespace';
import initial from '../initial';
import { ICommunication } from "../../types/app";

const executeType: ICommunication = { error: undefined, isRequesting: true, isLoaded: false };
const completeType: ICommunication = { error: undefined, isRequesting: false, isLoaded: true };
const failedType: ICommunication = { error: undefined, isRequesting: false, isLoaded: false };

export default function communicationReducer(state: NS.IReduxState['communication'] = initial.communication, action: NS.Action) {
  switch (action.type) {
    case 'LOAD_DICTIONARY': return { ...state, loadData: executeType };
    case 'LOAD_DICTIONARY_SUCCESS': return { ...state, loadData: completeType };
    case 'LOAD_DICTIONARY_FAILED': return { ...state, loadData: { ...failedType, error: action.error }};
  }
  return state;
}

