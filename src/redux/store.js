
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import UserReducer from './reducers/usersReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user: UserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

