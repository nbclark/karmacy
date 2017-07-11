/// <reference path="../typings/index.d.ts" />
import * as React from 'react'
import Karma from './karma.tsx'
import { pushPath } from 'redux-simple-router'

var actions = {
  
  performLogin : (email, password) => {
    return function(dispatch, getState) {
      dispatch(actions.setIsLoggingIn(true))
      Karma.API.authenticate(email, password).
        done(function(data) {
          Karma.API.loadMe().done(function(me) {
            dispatch(actions.setLoggedInUser($.extend({}, me[0], data)))
            dispatch(pushPath('/'))
          }).
          fail(function() {
            alert('Error logging in')
            debugger
          })
        }).
        fail(function(a,b,c) {
          alert('Error logging in')
          debugger
        }).
        always(function() {
          dispatch(actions.setIsLoggingIn(false))
        })
    }
  },
  
  refreshAccessToken : () => {
    return function(dispatch, getState) {
      var state = getState()
      if (!state.userInfo.isRefreshingAccessToken && state.userInfo.loggedInUser) {
        var waiter = Karma.API.refreshAccessToken(state.userInfo.loggedInUser.refresh_token)
        
        if (waiter) {
          dispatch(actions.setIsRefreshingToken(true))
          
          waiter.
            done(function(data) {
              dispatch(actions.updateLoggedInUser(data))
              dispatch(actions.setIsRefreshingToken(false))
              
              Karma.API.replayFailedRequests()
            }).
            fail(function(a,b,c) {
              // TODO - We need to trigger a logout here
              dispatch(actions.setLoggedInUser(null))
            })
        }
      }
    }
  },
  
  setIsLoggingIn: (yesNo) => {
    return {
      type: 'IS_LOGGING_IN',
      value: yesNo
    }
  },
  
  
  setIsRefreshingToken: (yesNo) => {
    return {
      type: 'IS_REFRESHING_TOKEN',
      value: yesNo
    }
  },
  
  setLoggedInUser: (user) => {
    return {
      type: 'SET_LOGGED_IN_USER',
      user: user
    }
  },
  
  updateLoggedInUser: (user) => {
    return {
      type: 'UPDATE_LOGGED_IN_USER',
      user: user
    }
  }
}

export default actions