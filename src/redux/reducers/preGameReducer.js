import { combineReducers } from 'redux';

const userType = (state = '', action) => {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  userType,
});
