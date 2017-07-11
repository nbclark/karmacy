/// <reference path="../typings/index.d.ts" />
import * as React from 'react'
import Karma from './karma.tsx'
import { store } from './karma.store.tsx'

var wrapDirtyingEventAction = function(eventId, action) {
  return function(dispatch, state) {
    dispatch(action)
    dispatch({ type: 'DIRTY_EVENT', id: eventId })
  }
}

var localIndex = 0

class Actions {
  
  loadInitialState() {
    return function(dispatch, getState) {
      // Open up a socket connection on first load
      
      dispatch({ type: 'START_LOADING_TEAMS' })
      dispatch({ type: 'START_LOADING_COMPANY' })
      dispatch({ type: 'START_LOADING_USER' })
      dispatch({ type: 'START_LOADING_MEMBERS' })
      dispatch({ type: 'START_LOADING_QUESTIONS' })
      dispatch({ type: 'START_LOADING_POLL' })
      
      // Joint load so we can add names to the rooms
      Karma.API.loadMe().then((user) => {
        var emptyPromise = $.Deferred()
        emptyPromise.resolve([])

        var isAdmin = user.Role === "Administrator"
        var loadTeams = isAdmin ? Karma.API.loadTeams() : emptyPromise
        var loadQuestions = isAdmin ? Karma.API.loadQuestions() : emptyPromise
        var loadMembers = isAdmin ? Karma.API.loadMembers() : emptyPromise
        
        $.when(
          Karma.API.loadCompany(), loadTeams,
          loadMembers, Karma.API.loadProducts(), loadQuestions,
          Karma.API.loadPoll()
        ).done((company, teams, members, products, questions, poll) => {

          dispatch({ type: 'RECEIVED_USER', data: user })
          dispatch({ type: 'RECEIVED_COMPANY', data: company })
          dispatch({ type: 'RECEIVED_TEAMS', data: teams })
          dispatch({ type: 'RECEIVED_MEMBERS', data: members })
          dispatch({ type: 'RECEIVED_PRODUCTS', data: products })
          dispatch({ type: 'RECEIVED_QUESTIONS', data: questions })
          dispatch({ type: 'RECEIVED_POLL', data: poll })
          
        })
      })
    }.bind(this)
  }
  
  loadPollResults(instanceID) {
    return function(dispatch, getState) {
      dispatch({
        type: 'START_LOADING_POLL_RESULTS',
        instanceID: instanceID
      })
      
      Karma.API.loadPollResults(instanceID).done(function(data) {
        dispatch({ type: 'RECEIVED_POLL_RESULTS', data: data, instanceID: instanceID })
      }.bind(this))
    }.bind(this)
  }
  
  createTeam(teamName) {
    return function(dispatch, getState) {
      localIndex--
      
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_CREATE_TEAM',
        name: teamName
      })
      
      Karma.API.createTeam(teamName).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }
  
  createQuestion(title, options, type, position) {
    return function(dispatch, getState) {
      localIndex--
      
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_CREATE_QUESTION',
        title: title
      })
      
      Karma.API.createQuestion(title, options, type, position).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }

  setQuestionPosition(questionID, position) {
    return function(dispatch, getState) {
      
      dispatch({
        type: 'START_SET_QUESTION_POSITION',
        id: questionID,
        position: position
      })
      
      Karma.API.setQuestionPosition(questionID, position).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }
  
  createProduct(name, description, price, quantity) {
    return function(dispatch, getState) {
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_CREATE_PRODUCT',
        name: name,
        description: description,
        price: price
      })
      
      Karma.API.createProduct(name, description, price, quantity).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }
  
  purchaseProduct(productID, price) {
    return function(dispatch, getState) {
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_PURCHASE_PRODUCT',
        id: productID,
        price: price
      })
      
      Karma.API.purchaseProduct(productID, price).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
        debugger
      }.bind(this)).fail(function(status, statusText, responseText) {
        dispatch({
          type: 'FAIL_PURCHASE_PRODUCT',
          id: productID,
          price: price
        })
      }.bind(this))
    }.bind(this)
  }
  
  donateKarma(toAccountID, amount, message) {
    return function(dispatch, getState) {
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_DONATE_KARMA',
        toAccountID: toAccountID,
        amount: amount,
        message: message
      })
      
      Karma.API.donateKarma(toAccountID, amount, message).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
        debugger
      }.bind(this)).fail(function(status, statusText, responseText) {
        dispatch({
          type: 'FAIL_DONATE_KARMA',
        toAccountID: toAccountID,
        amount: amount,
        message: message
        })
      }.bind(this))
    }.bind(this)
  }

  assignMember(memberID, teamID) {
    return function(dispatch, getState) {
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'ASSIGN_TEAM',
        memberID: memberID,
        teamID: teamID
      })
      
      Karma.API.assignMember(memberID, teamID).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }

  submitPollResponse(pollID, option, response, suggestion) {
    return function(dispatch, getState) {
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_ANSWER_POLL',
        option: option,
        response: response,
        suggestion: suggestion
      })
      
      Karma.API.submitPollResponse(pollID, option, response, suggestion).done(function(data) {
        // TODO
        console.log(data)
      }.bind(this))
    }.bind(this)
    //
  }

  sendPollResponseMessage(instanceID, pollID, comments) {
    return function(dispatch, getState) {
      var state = getState()
      var me = state.userInfo.loggedInUser
      
      dispatch({
        type: 'START_SEND_MESSAGE',
        instanceID: instanceID,
        pollID: pollID,
        comments: comments
      })
      
      Karma.API.sendPollResponseMessage(instanceID, pollID, comments).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }
  
  sendInvite(email, firstName, lastName, role, teamID) {
    return function(dispatch, getState) {
      
      dispatch({
        type: 'INVITE_MEMBER',
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        teamID: teamID
      })
      
      Karma.API.sendInvite(email, firstName, lastName, role, teamID).done(function(data) {
        // Need to set RoomId since it doesn't come back from this API
        console.log(data)
      }.bind(this))
    }.bind(this)
  }
}

export default new Actions()