import React from 'react'
import ReactDom from 'react-dom'
import Cookie from 'react-cookie'

class App extends React.Component {

  constructor() {
    super()
    this.state = {  }
  }

  componentDidMount() {
    this.accessToken = Cookie.load('access_token')
  }

  redirectToLogin() {
  }

  render() {
    return (
      <div>
        <h1>Karmacy</h1>
      </div>
    )
  }
}

module.exports = ReactDOM.render(
  <App />,
  document.getElementById('content')
)
