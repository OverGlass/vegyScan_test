import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './src/reducers';

import Base from './src/Base'

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  )
}

export default App;