import * as NS from '../../types/namespace';
import initial from '../initial';

export default function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action) {
  switch (action.type) {
    case 'LOAD_DICTIONARY_SUCCESS':
      return {
        ...state,
        dictionary: action.payload,
      };
  }

  return state;
}
