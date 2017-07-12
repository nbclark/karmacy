/// <reference path="../typings/index.d.ts" />
import { reducers, events } from './karma.store.reducers'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import DevTools from './redux.devtools'

var thunkMiddleware = (state) => {
  return (next) => {
    return (action) => {
      if (typeof(action) === 'function') {
        action(state.dispatch, state.getState)
      } else {
        next(action)
      }
    }
  }
}

//const persist = persistStore(store)
// autoRehydrate()(createStore)
const store = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore)(combineReducers(reducers), {})
const persist = persistStore(store)

for (var key in events) {
  events[key].getState = store.getState
}

export { store, persist, events }