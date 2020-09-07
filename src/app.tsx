import React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory, LocationState, History } from "history";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
  Store
} from "redux";
import { DictionaryContainer } from "./containers";
import { IAppReduxState } from "./types/app";
import { reducer as mainReducer, sagas as mainSagas } from "./redux";

import "./app.scss";

class App extends React.PureComponent {
  private store: Store<IAppReduxState>;
  private runSaga: SagaMiddleware<any>["run"];
  private history: History<LocationState>;
  private reducers: Reducer<IAppReduxState>;

  constructor(props: Readonly<any>) {
    super(props);

    const sagaMiddleware = createSagaMiddleware();
    this.history = createBrowserHistory();

    const middlewares = [routerMiddleware(this.history), sagaMiddleware];

    this.runSaga = sagaMiddleware.run;
    this.store = createStore(
      (state: IAppReduxState | undefined) => state!,
      compose(applyMiddleware(...middlewares))
    );

    this.runSaga(mainSagas());
    this.reducers = combineReducers({
      main: mainReducer,
      router: connectRouter<LocationState>(this.history)
    });

    this.store.replaceReducer(this.reducers);
  }

  public render() {
    return (
      <Provider store={this.store}>
        <BrowserRouter>
          <Switch>
            <Route
              path={`/regions/:regionId?`}
              component={DictionaryContainer}
            />
            <Redirect
              to={`/regions`}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
