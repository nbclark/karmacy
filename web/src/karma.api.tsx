/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.login'
const Horizon = require('@horizon/client')

class API {
  retryQueue: Array<any>
  tokens: any
  store: any
  apiRootUrl: string
  lastRefresh: Date
  horizon: any

  constructor(store) {
    this.retryQueue = []
    this.store = store
    this.apiRootUrl = '/api/'
  }

  connect(token: string) {
    this.horizon = Horizon({
      host: 'localhost:9000',
      secure: false,
      authType: {
        storeLocally: true,
        token: token
      }
    })
    this.horizon.onReady(() => {
    })

    this.horizon.onSocketError((err) => {
    })

    this.horizon.connect()
  }

  authenticate(email, password) {
    return new Promise((resolve, reject) => {

      $.post(
        '/identity/authenticate',
        JSON.stringify({ username: email, password: password }),
        null,
        'json'
      )
        .done((data) => {
          console.log('got tokens')
          this.tokens = data
          resolve(data)
        })
        .fail(() => {
          reject()
        })

    })
  }

  refreshAccessToken(token) {
    var now = new Date()
    if (this.lastRefresh && (now.getTime() - this.lastRefresh.getTime()) < 5000) {
      this.lastRefresh = null
      this.store.dispatch(Actions.setLoggedInUser(null))
      return
    }

    this.lastRefresh = now
    return new Promise((resolve, reject) => {

      $.post(
        '/identity/refresh',
        JSON.stringify({ refresh_token: token }),
        null,
        'json'
      )
        .done((data) => {
          console.log('got tokens')
          this.tokens = data
          resolve(data)
        })
        .fail(function () {
          reject()
        })

    })
  }

  loadMe() {
    return new Promise((resolve, reject) => {
      $.ajax(
        this.apiRootUrl + 'me', {
          // beforeSend: (xhr) => {
          //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens['access_token'])
          // },
          contentType: 'application/json'
        }
      )
        .done((data) => {
          console.log(data)
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            this._processAccessTokenExpiration(this.loadMe)
          } else {
            reject()
          }
        })
    })
  }

  loadTeams() {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'teams', {
          // beforeSend: (xhr) => {
          //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
          // },
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            this._processAccessTokenExpiration(this.loadTeams)
          }
        })

    })
  }

  loadCompany() {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'company', {
          // beforeSend: (xhr) => {
          //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
          // },
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            this._processAccessTokenExpiration(this.loadCompany)
          }
        })

    })
  }

  loadPoll() {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'poll', {
          // beforeSend: (xhr) => {
          //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
          // },
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          resolve(null)
        })

    })
  }

  loadMembers() {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'company/accounts', {
          // beforeSend: (xhr) => {
          //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
          // },
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          resolve([])
          // if (xhr.status == 401) {
          //   this._processAccessTokenExpiration(this.loadUsers)
          // }
        })

    })
  }

  loadProducts() {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'products', {
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          debugger
        })

    })
  }

  loadQuestions() {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'questions', {
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          debugger
          resolve([])
        })

    })
  }

  loadPollResults(instanceID) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'poll/' + instanceID, {
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          debugger
        })

    })
  }

  createQuestion(title, options, type, position) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'questions', {
          type: "POST",
          data: JSON.stringify({ Title: title, Options: options, QuestionType: type, Position: position }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  setQuestionPosition(questionID, position) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'questions/' + questionID, {
          type: "PUT",
          data: JSON.stringify({ Position: position }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  createTeam(teamName) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'teams', {
          type: "POST",
          data: JSON.stringify({ Name: teamName }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  createProduct(name, description, price, quantity) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'products', {
          type: "POST",
          data: JSON.stringify({ Name: name, Description: description, Price: price, Quantity: quantity }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          debugger
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  submitPollResponse(pollID, option, response, suggestion) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'poll/instanceid/' + pollID, {
          type: "POST",
          data: JSON.stringify({
            Option: option,
            Response: response,
            Suggestion: suggestion
          }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  sendPollResponseMessage(instanceID, pollID, comments) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'poll/' + instanceID + '/' + pollID + '/message', {
          type: "POST",
          data: JSON.stringify({
            Comments: comments
          }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  purchaseProduct(productID, price) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'purchase', {
          type: "POST",
          data: JSON.stringify({ ProductID: productID, Price: price }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          reject(xhr.responseText)
        })

    })
  }

  donateKarma(toAccountID, amount, message) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'donate', {
          type: "POST",
          data: JSON.stringify({ ToAccountID: toAccountID, Amount: amount, Message: message }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          reject(xhr.responseText)
        })

    })
  }

  assignMember(memberID, teamID) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'teams/members', {
          type: "POST",
          data: JSON.stringify({ MemberID: memberID, TeamID: teamID }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  sendInvite(email, firstName, lastName, role, teamID) {
    return new Promise((resolve, reject) => {

      $.ajax(
        this.apiRootUrl + 'company/accounts', {
          type: "POST",
          data: JSON.stringify({
            Email: email, Role: role, TeamID: teamID,
            FirstName: firstName,
            LastName: lastName
          }),
          contentType: 'application/json'
        }
      )
        .done((data) => {
          resolve(data)
        })
        .fail((xhr) => {
          if (xhr.status == 401) {
            debugger
          }
        })

    })
  }

  replayFailedRequests() {
    this.retryQueue.forEach(function (func) {
      func()
    })

    this.retryQueue = []
  }

  _processApiResponse(data) {
    if (data.ErrorCode == 1401) {
      // refresh token
      return false
    } else if (!data.Value) {
      return false
    } else {
      return true
    }
  }

  _processAccessTokenExpiration(func) {
    this.retryQueue.push(func)
    this.store.dispatch(Actions.refreshAccessToken())
  }
}

export default API