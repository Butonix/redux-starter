import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';
import {} from './root.scss';

const Root = ({
  history,
  routes,
  store
}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        {renderRoutes(routes, { key: history.location.pathname })}
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  history: object.isRequired,
  store: object.isRequired,
  routes: oneOfType([
    array,
    object,
  ]).isRequired
};

export default Root;
