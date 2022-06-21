import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const store = configureStore (
   { reducer: rootReducer },
   compose (
      applyMiddleware(thunk),
      window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
   )
);

export default store;