/// <reference path="../typings/index.d.ts" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import Karma from './karma.tsx'
import MainView from './karma.mainview.tsx'
import LoginView from './karma.loginview.tsx'
import { store } from './karma.store.tsx'
import API from './karma.api.tsx'
import HomeView from './karma.homeview.tsx'
import StoreView from './karma.storeview.tsx'
import AdminView from './karma.adminview.tsx'
import AdminPollResultView from './karma.adminpollresultview.tsx'
import Actions from './karma.store.actions.tsx'
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { createHistory } from 'history'
import DevTools from './redux.devtools.tsx'

const history = createHistory()

syncReduxAndRouter(history, store)

// let unlisten = history.listen((location) => {
//   console.log(location)
// })

Karma.API = new API(store)

export default ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={MainView}>
          <IndexRoute components={{ content: HomeView }} />
          <Route path="store" components={{ content: StoreView }} />
          <Route path="admin">
            <IndexRoute components={{ content: AdminView }} />
            <Route path="polls/:id" components={{ content: AdminPollResultView }} />
          </Route>
        </Route>
        <Route path="/login.html" component={LoginView} />
      </Router>
      <DevTools />
    </div>
  </ReactRedux.Provider>,
  document.getElementById('content')
)

// MOCK login process
var localIndex = 0

// setInterval(function() {
//   Karma.API.watcher.processMessage({ RoomId: 473 })
// }, 2500)

function mockAPI() {

  /*
   API.loadRooms = () => {
     var promise = $.Deferred()
     
     setTimeout(function() {
       promise.resolve(Mocks.rooms)
     }, 500)
     
     return promise
   }
  */
  /*
   API.loadMessages = (roomId, lastIndex) => {
     var promise = $.Deferred()
     
     setTimeout(function() {
       promise.resolve(Mocks.messages[roomId])
     }, 500)
     
     return promise
   }
   */
  /*
  API.sendMessage = (roomId, type, data) => {
    var promise = $.Deferred()
    
    var tempIndex = localIndex--
    
    setTimeout(function() {
      promise.resolve({
          Index: -tempIndex+10,
          UserId:3490495,
          Type:type,
          Data:data,
          Created:'2015-12-08 19:22:34.9023'
      })
    }, 500)
    
    return promise
  }*/
}

mockAPI()