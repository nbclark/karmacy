/// <reference path="../typings/index.d.ts" />
import * as React from 'react'
import Karma from './karma.tsx'
import { store } from './karma.store.tsx'

class Actions {

  companySignup(companyName, companyDomain, contactFirstName, contactLastName, contactEmail, contactPhone) {
    return function(dispatch, getState) {

      console.log(dispatch);
      console.log(getState);

      dispatch({
        type: 'START_COMPANY_SIGNUP'
      })

      Karma.API.createSignup(companyName, companyDomain, contactFirstName, contactLastName, contactEmail, contactPhone).
        done(function(data) {

          console.log("company signup done!")
          console.log(data)

          dispatch({
            type: 'COMPANY_SIGNUP_SUCCESS'
          })

          //not sure if this is where we should do the redirect
          location.pathname = "/"

        }).
        fail(function(a,b,c) {

          console.log("company signup fail!")
          console.log(a);
          console.log(b);
          console.log(c);

          dispatch({
            type: 'COMPANY_SIGNUP_FAIL',
            message: c
          })

          debugger
        }).
        always(function() {
          //dispatch(actions.setIsLoggingIn(false))
        })
    }
  }
}

export default new Actions()
