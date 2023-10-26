
import {createStore, combineReducers} from 'redux';
import UserReducer from './reducers/usersReducer';

const rootReducer = combineReducers({
    user: UserReducer,
});

export const store = createStore(
    rootReducer, /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

