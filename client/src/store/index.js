import { createStore } from 'redux';
import thuk from 'redux-thunk';

import rootReducer from './reducers'

const DEFAULT_STATE = {
    error: {message: null}
}

export const store = createStore(
    rootReducer,
    DEFAULT_STATE
);