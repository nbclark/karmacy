class API {
  retryQueue: Array<any>
  store: any
  apiRootUrl: string

  constructor(store) {
    this.retryQueue = []
    this.store = store
    this.apiRootUrl = '/api/'
  }

  createSignup(companyName, companyDomain, contactFirstName, contactLastName, contactEmail, contactPhone) {
    var self = this
    var promise = $.Deferred()

    $.ajax(
      this.apiRootUrl + 'signup', {
        type: "POST",
        data: JSON.stringify({
          CompanyName: companyName,
          CompanyDomain: companyDomain,
          ContactFirstName: contactFirstName,
          ContactLastName: contactLastName,
          ContactEmail: contactEmail,
          ContactPhone: contactPhone
        }),
        contentType: 'application/json'
      }
    ).done(function (data) {
        promise.resolve(data)
    }).
    fail(function(xhr) {
      if (xhr.status == 401) {
        debugger
      }
      promise.reject(xhr.status, xhr.statusText, xhr.responseText)

    }.bind(this))

    return promise
  }

}

export default API
