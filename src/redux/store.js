import rootReducer from './rootReducer.js'
import {createStore,applyMiddleware} from 'redux'
import {logger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-Saga'
const sagaMiddleware=createSagaMiddleware();
const middleware=[logger,sagaMiddleware]
const store=createStore(rootReducer,applyMiddleware(...middleware))
sagaMiddleware.run(rootSaga);
export default store;
