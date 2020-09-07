import * as NS from './namespace';
import { Reducer } from "redux";
import { RouterState } from "connected-react-router";
import { LocationState } from "history";

export interface ICommunication<E = string> {
  isRequesting: boolean;
  error: E | undefined;
  isLoaded: boolean;
}

export interface IPayloadHolder<T> {
  payload: T;
}

export interface IPlainAction<T> {
  type: T;
}

export interface IAction<T, P> extends IPlainAction<T>, IPayloadHolder<P> {}

export interface IPlainFailAction<T, E = string> extends IPlainAction<T> {
  error: E;
}

export interface IFailAction<T, P, E = string> extends IPlainFailAction<T, E> {
  payload: P;
}

export const initialCommunicationField: ICommunication = { isRequesting: false, error: '', isLoaded: false };

export type ReducersMap<T> = { [key in keyof T]: Reducer<T[key]> };

export interface IAppReduxState {
  main: NS.IReduxState;
  router: RouterState<LocationState>;
}
