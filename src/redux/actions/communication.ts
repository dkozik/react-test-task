import * as NS from '../../types/namespace';
import { IDictionary } from "../../types/responses";

export function loadDictionary(): NS.ILoadDictionary {
  return { type: 'LOAD_DICTIONARY' };
}

export function loadDictionarySuccess( payload: IDictionary ): NS.ILoadDictionarySuccess {
  return { payload, type: 'LOAD_DICTIONARY_SUCCESS' };
}

export function loadDictionaryFailed(error: string): NS.ILoadDictionaryFailed {
  return { error, type: 'LOAD_DICTIONARY_FAILED' };
}
