/// <reference path="../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import Karma from './karma.tsx'
import API from './karma.api.signup.tsx'
import SignupView from './karma.signupview.tsx'
import { store } from './karma.store.tsx'
import Actions from './karma.store.actions.signup.tsx'
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { createHistory } from 'history'
import DevTools from './redux.devtools.tsx'

const history = createHistory()

syncReduxAndRouter(history, store)

Karma.API = new API(store)

export default ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <div>
        <Router history={browserHistory}>
          <Route path="/signup" component={SignupView}>
          </Route>
        </Router>
        <DevTools />
      </div>
    </ReactRedux.Provider>,
    document.getElementById('content')
  )
