import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import document from 'global/document';
import {Provider} from 'react-redux';
import {hashHistory, Router, Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import store from './components/magicbox-kepler-demo/client/src/store';
import registerServiceWorker from './registerServiceWorker';

const history = syncHistoryWithStore(hashHistory, store);
// const prefix = getAppUrlPrefix();
// const path = prefix === '' ? '(:id)' : `${prefix}(/:id)`;

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/(:id)" component={App} />
      <Route path="/demo/(:id)" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
