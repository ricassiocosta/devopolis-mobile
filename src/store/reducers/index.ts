import { combineReducers } from 'redux';

import { SET_TOKEN, LOGOUT } from '../actions/index';

import dev from './dev';

const initialState = {
  token: undefined,
};

const root = (state = initialState, action: any) => {
  if (action.type === SET_TOKEN) {
    return { ...state, token: action.payload };
  }
  if (action.type === LOGOUT) {
    return { ...state, token: '' };
  }
  return state;
};

const combinedReducers = combineReducers({
  root,
  dev,
});

export default combinedReducers;
