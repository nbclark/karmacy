/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.login.tsx'

class API {
  retryQueue: Array<any>
  tokens: any
  store: any
  apiRootUrl: string
  lastRefresh: Date

  constructor(store) {
    this.retryQueue = []
    this.store = store
    this.apiRootUrl = '/api/'
  }

  authenticate(email, password) {
    var self = this
    var promise = $.Deferred()

    $.post(
      '/identity/authenticate',
      JSON.stringify({ username: email, password: password }),
      null,
      'json'
    ).done((data) => {
      console.log('got tokens')
      this.tokens = data
      promise.resolve(data)
    }).
      fail(() => {
        promise.reject()
      })

    return promise
  }

  refreshAccessToken(token) {
    var now = new Date()
    if (this.lastRefresh && (now.getTime() - this.lastRefresh.getTime()) < 5000) {
      this.lastRefresh = null
      this.store.dispatch(Actions.setLoggedInUser(null))
      return
    }

    this.lastRefresh = now
    var self = this
    var promise = $.Deferred()

    $.post(
      '/identity/refresh',
      JSON.stringify({ refresh_token: token }),
      null,
      'json'
    ).done(function (data) {
      console.log('got tokens')
      self.tokens = data
      promise.resolve(data)
    }).
      fail(function () {
        promise.reject()
      })

    return promise
  }

  loadMe() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'me', {
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens['access_token'])
        // },
        contentType: 'application/json'
      }
    ).done(function (data) {
      console.log(data)
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          this._processAccessTokenExpiration(this.loadMe.bind(this))
        }
      }.bind(this))

    return promise
  }

  loadTeams() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'teams', {
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
        // },
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          this._processAccessTokenExpiration(this.loadUsers.bind(this))
        }
      }.bind(this))

    return promise
  }

  loadCompany() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'company', {
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
        // },
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          this._processAccessTokenExpiration(this.loadUsers.bind(this))
        }
      }.bind(this))

    return promise
  }

  loadPoll() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'poll', {
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
        // },
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        promise.resolve(null)
      }.bind(this))

    return promise
  }

  loadMembers() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'company/accounts', {
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader ("Authorization", "Bearer " + self.tokens.access_token)
        // },
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        promise.resolve([])
        // if (xhr.status == 401) {
        //   this._processAccessTokenExpiration(this.loadUsers.bind(this))
        // }
      }.bind(this))

    return promise
  }

  loadProducts() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'products', {
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        debugger
      }.bind(this))

    return promise
  }

  loadQuestions() {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'questions', {
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        debugger
        promise.resolve([])
      }.bind(this))

    return promise
  }

  loadPollResults(instanceID) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'poll/' + instanceID, {
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        debugger
      }.bind(this))

    return promise
  }

  createQuestion(title, options, type, position) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'questions', {
        type: "POST",
        data: JSON.stringify({ Title: title, Options: options, QuestionType: type, Position: position }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  setQuestionPosition(questionID, position) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'questions/' + questionID, {
        type: "PUT",
        data: JSON.stringify({ Position: position }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  createTeam(teamName) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'teams', {
        type: "POST",
        data: JSON.stringify({ Name: teamName }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  createProduct(name, description, price, quantity) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'products', {
        type: "POST",
        data: JSON.stringify({ Name: name, Description: description, Price: price, Quantity: quantity }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        debugger
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  submitPollResponse(pollID, option, response, suggestion) {
    var self = this
    var promise = $.Deferred()

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
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  sendPollResponseMessage(instanceID, pollID, comments) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'poll/' + instanceID + '/' + pollID + '/message', {
        type: "POST",
        data: JSON.stringify({
          Comments: comments
        }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  purchaseProduct(productID, price) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'purchase', {
        type: "POST",
        data: JSON.stringify({ ProductID: productID, Price: price }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        promise.reject(xhr.status, xhr.statusText, xhr.responseText)
      }.bind(this))

    return promise
  }

  donateKarma(toAccountID, amount, message) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'donate', {
        type: "POST",
        data: JSON.stringify({ ToAccountID: toAccountID, Amount: amount, Message: message }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        promise.reject(xhr.status, xhr.statusText, xhr.responseText)
      }.bind(this))

    return promise
  }

  assignMember(memberID, teamID) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'teams/members', {
        type: "POST",
        data: JSON.stringify({ MemberID: memberID, TeamID: teamID }),
        contentType: 'application/json'
      }
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
  }

  sendInvite(email, firstName, lastName, role, teamID) {
    var self = this
    var promise = $.Deferred()

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
    ).done(function (data) {
      promise.resolve(data)
    }).
      fail(function (xhr) {
        if (xhr.status == 401) {
          debugger
        }
      }.bind(this))

    return promise
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