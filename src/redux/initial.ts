import * as NS from '../types/namespace';
import { initialCommunicationField } from "../types/app";

const initial: NS.IReduxState = {
  communication: {
    loadData: initialCommunicationField,
  },
  data: {
    dictionary: [],
  }
};

export default initial;
