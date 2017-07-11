/// <reference path="../typings/index.d.ts" />
import * as Redux from 'redux'
import { routeReducer } from 'redux-simple-router'

var initialState = {
  isCreatingAccount: false,
  failMessage: '',
  success: false
}

function userInterfaceHandler(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case 'START_COMPANY_SIGNUP' :
      return Object.assign({}, state, {
        isCreatingAccount: true
      })
    case 'COMPANY_SIGNUP_FAIL' :
      return Object.assign({}, state, {
        isCreatingAccount: false,
        failMessage: action.message
      })
    case 'COMPANY_SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        isCreatingAccount: false,
        success: true
      })
  }

  return state
}

const reducers : Redux.ReducersMapObject = {
  userInterface: userInterfaceHandler,
  routing: routeReducer
}

const events = {
}

export { reducers, events }
