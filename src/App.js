import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import 'semantic-ui-css/semantic.min.css';
import Notifications from './components/notifications';

export default class App extends Component {
  render() {
    const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <Notifications />
      </Provider>
    )
  }
}
