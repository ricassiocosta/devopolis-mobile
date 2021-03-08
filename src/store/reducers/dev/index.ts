import { SET_DEV_INFO } from '../../actions/dev';

const initialState = {
  devInfo: undefined,
};

const reducer = (state = initialState, action: any) => {
  if (action.type === SET_DEV_INFO) {
    return { ...state, devInfo: action.payload };
  }
  return state;
};

export default reducer;
