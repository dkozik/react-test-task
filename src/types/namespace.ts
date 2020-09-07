import { IAction, ICommunication, IPlainAction, IPlainFailAction } from "./app";
import { IDictionary } from "./responses";

export interface IReduxState {
  communication: {
    loadData: ICommunication;
  };
  data: {
    dictionary: IDictionary;
  };
}

export type ILoadDictionary = IPlainAction<'LOAD_DICTIONARY'>;
export type ILoadDictionarySuccess = IAction<'LOAD_DICTIONARY_SUCCESS', IDictionary>;
export type ILoadDictionaryFailed = IPlainFailAction<'LOAD_DICTIONARY_FAILED'>;

export type Action =
  | ILoadDictionary
  | ILoadDictionarySuccess
  | ILoadDictionaryFailed;
