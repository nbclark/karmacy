/// <reference path="../typings/index.d.ts" />
import * as Redux from 'redux'
import * as Update from 'react-addons-update'
import {REHYDRATE} from 'redux-persist/constants'
import Karma from './karma'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
const Cookies = require('./js.cookie-2.1.0.min.js')

const REHYDRATE_COMPLETE = 'persist/COMPLETE'
var leaveTestData = true

var initialState = {
  events : [],
  loggedInUser : {},
  userInfo : {
    isLoggingIn: false,
    isHydrated: false,
    isRefreshingAccessToken: false,
    isLoadingUser: true,
    // loggedInUser: {
    //   id: -1,
    //   firstName: 'first',
    //   lastLame: 'last',
    //   email: 'nclark@doubledutch.me'
    // }
  },
  companyInfo : {
      teams : [],
      products: [],
      questions: [],
      members: []
  }
}

class Eventer {
  listeners : any
  constructor() {
    this.listeners = []
  }
  
  subscribe(func) {
    this.listeners.push(func)
  }
  
  fire(oldState, action) {
    if (this.listeners.length) {
      setTimeout(function() {
        // Need to run after a timeout so the state can be processed
        var newState = this.getState ? this.getState() : {}
        this.listeners.forEach(function(l) {
          l(oldState, newState, action)
        })
      }.bind(this), 0)
    }
  }
}

var userInfoEventer = new Eventer()
var roomInfoEventer = new Eventer()
var attendeeInfoEventer = new Eventer()

// Let's log out some of the model
if (!leaveTestData) {
  initialState.loggedInUser = null
  initialState.events = []
}

function companyHandler(state, action) {
  roomInfoEventer.fire(state, action)
  if (typeof state === 'undefined') {
    return initialState.companyInfo
  }

  switch (action.type) {
    case 'TOGGLE_CHOOSE_ROOM_MODAL' :
      return Object.assign({}, state, {
        showRoomModal: !state.showRoomModal
      })
    case 'START_LOADING_COMPANY' :
      return Object.assign({}, state, {
        isLoadingCompany: true
      })
    case 'START_LOADING_TEAMS' :
      return Object.assign({}, state, {
        isLoadingTeams: true
      })
    case 'START_LOADING_PRODUCTS' :
      return Object.assign({}, state, {
        isLoadingProducts: true
      })
    case 'START_LOADING_QUESTIONS' :
      return Object.assign({}, state, {
        isLoadingQuestions: true
      })
    case 'START_LOADING_MEMBERS' :
      return Object.assign({}, state, {
        isLoadingMembers: true
      })
    case 'RECEIVED_COMPANY' :
      return Object.assign({}, state, {
        company: action.data,
        isLoadingCompany: false
      })
    case 'RECEIVED_TEAMS' :
      return Object.assign({}, state, {
        teams: action.data,
        isLoadingTeams: false
      })
    case 'RECEIVED_PRODUCTS' :
      return Object.assign({}, state, {
        products: action.data,
        isLoadingProducts: false
      })
    case 'RECEIVED_QUESTIONS' :
      return Object.assign({}, state, {
        questions: action.data,
        isLoadingQuestions: false
      })
    case 'RECEIVED_MEMBERS' :
      return Object.assign({}, state, {
        members: action.data,
        isLoadingMembers: false
      })
    case 'START_PURCHASE_PRODUCT' :
      return Object.assign({}, state, {
        isLoadingMembers: true
      })

    case 'START_LOADING_POLL_RESULTS' :
    console.log('isLoadingPollResults')
      return Object.assign({}, state, {
        isLoadingPollResults: true
      })
      
    case 'RECEIVED_POLL_RESULTS' :
    console.log('RECEIVED_POLL_RESULTS')
      return Object.assign({}, state, {
        pollResults: { [action.instanceID]: action.data },
        isLoadingPollResults: false
      })
      
    default :
      return state
  }
}

function currentUserHandler(state, action) {
  userInfoEventer.fire(state, action)
  if (typeof state === 'undefined') {
    return initialState.userInfo
  }
  
  switch (action.type) {
    case REHYDRATE_COMPLETE :
    case REHYDRATE :
      var s = action.payload ? action.payload : state
      if (action.key == 'userInfo' || (action.type == REHYDRATE_COMPLETE)) {
        // TODO - this is a bit dirty
        if (s.loggedInUser && s.loggedInUser.session_name) {
          Karma.API.tokens = s.loggedInUser
        } else {
            var sn = Cookies.get('sessionName')

            if (sn) {
                s.loggedInUser = {
                    session_name: sn
                }
                Karma.API.tokens = s.loggedInUser
            }
        }
        
        console.log('hydrated')
        
        return Object.assign({}, s, {
          isRefreshingAccessToken: false,
          isLoggingIn: false,
          isHydrated: true,
          isLoadingUser: true
        })
      }
      return state
      
    case 'IS_REFRESHING_TOKEN' : 
      return Object.assign({}, state, {
        isRefreshingAccessToken: action.value
      })
    case 'START_LOADING_USER' :
      return Object.assign({}, state, {
        isLoadingUser: true
      })
    case 'RECEIVED_USER' : 
    console.log('received user')
      return Object.assign(state, {
        loggedInUser: action.data,
        isLoadingUser: false
      })

    case 'START_LOADING_POLL' :
      return Object.assign({}, state, {
        isLoadingPoll: true
      })
      
    case 'RECEIVED_POLL' :
      return Object.assign({}, state, {
        poll: action.data,
        isLoadingPoll: false
      })

    case 'START_PURCHASE_PRODUCT' :
      return Update(state, {
        loggedInUser : { Balance: { $set: (state.loggedInUser.Balance - action.price) }}
      })
    case 'FAIL_PURCHASE_PRODUCT' :
      return Update(state, {
        loggedInUser : { Balance: { $set: (state.loggedInUser.Balance + action.price) }}
      })
    case 'COMPLETE_PURCHASE_PRODUCT' :
      return state
    default:
      return state
  }
}

const userInterfaceInitialState = {
  activeModal : null
}

function userInterfaceHandler(state, action) {
  userInfoEventer.fire(state, action)
  if (typeof state === 'undefined') {
    return userInterfaceInitialState
  }
  
  switch (action.type) {
    case 'TOGGLE_MODAL' :
      return Object.assign({}, state, {
        activeModal: action.name
      })
  }
  
  return userInterfaceInitialState
}

const reducers : Redux.ReducersMapObject = {
  userInfo: currentUserHandler,
  companyInfo: companyHandler,
  userInterface: userInterfaceHandler,
  routing: routeReducer
}

const events = {
  userInfo: userInfoEventer,
  roomInfo: roomInfoEventer,
  attendeeInfo: attendeeInfoEventer,
}

export { reducers, events }