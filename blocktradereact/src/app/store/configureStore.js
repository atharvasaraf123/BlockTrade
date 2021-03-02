import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import tradeDealReducer from '../reducers/tradeDeal';
import kycReducer from '../reducers/kyc';
import thunk from 'redux-thunk';
import tradeReducer from '../reducers/trade';
import conReducer from '../reducers/connection';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      tradeDeal: tradeDealReducer,
      kyc: kycReducer,
      trade: tradeReducer,
      conn: conReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
