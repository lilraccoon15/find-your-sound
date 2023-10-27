
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import UserReducer from './reducers/usersReducer';
import localStorageMiddleware from './localStorageMiddleware';

const rootReducer = combineReducers({
    user: UserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(localStorageMiddleware),
  );

let savedState;
if (localStorage.getItem('reduxState')) {
savedState = JSON.parse(localStorage.getItem('reduxState'));
}

export const store = createStore(
    rootReducer,
    savedState,
    enhancer
  );
