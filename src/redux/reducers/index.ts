import * as NS from '../../types/namespace';
import { combineReducers } from 'redux';

import communicationReducer from './communication';
import dataReducer from './data';

export default combineReducers<NS.IReduxState>({
  communication: communicationReducer,
  data: dataReducer,
});
