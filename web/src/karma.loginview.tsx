/// <reference path="../typings/index.d.ts" />
import Component from './karma.component.tsx'
import Actions from './karma.store.actions.login.tsx'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<LoginView> {
  dispatch: any
  loggedInUser: any
  companyInfo: any
  isLoggingIn: boolean
}

interface IComponentState {
  email?: any
  password?: any
}

class LoginView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { email: 'nclark@doubledutch.me', password : '' }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.state.email.length) {
      alert('Invalid email')
      return
    } else if (!this.state.password.length) {
      alert('Invalid password')
      return
    }
    
    // Flag that we are starting a login
    this.props.dispatch(Actions.performLogin(this.state.email, this.state.password))
  }
  
  _handleChange(event) {
    var s = {}
    s[event.target.name] = event.target.value
    this.setState(s);
  }
    
    handleGoogle() {
        var scopes = 'scope=' + encodeURIComponent(['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'].join(' '))
        var url = 'https://accounts.google.com/o/oauth2/auth?client_id={{ .GoogleClientID }}&' + scopes + '&response_type=code&prompt=consent&access_type=offline&redirect_uri=http://localhost:9000/login/oauth2callback&state=google'
        document.location.assign(url)
    }
    
    handleSlack() {
        var scopes = 'scope=' + encodeURIComponent([/*'users:read', 'incoming-webhook', 'commands',*/ 'identify'].join(' '))
        var url = 'https://slack.com/oauth/authorize?client_id={{ .SlackClientID }}&' + scopes + '&state=slack&redirect_uri=http://localhost:9000/login/oauth2callback'
        document.location.assign(url)
    }
  
  render() {
    var xxx = this.props.isLoggingIn ? "yes" : "no"
    var isDisabled = this.props.isLoggingIn
    
    return (
      <div className="login_view container">
        <form onSubmit={ (ev) => ev.preventDefault() }>
          <h2>Login</h2>
            <div id="gConnect" >
                <button type="submit" className="btn btn-danger" onClick={this.handleGoogle}
                    alt="Sign in with Google" style={{ width:"150px", margin: "20px" }}>Sign in with Google</button>
            </div>
            <div id="slackConnect" >
                <button type="submit" className="btn btn-success" onClick={this.handleSlack}
                alt="Sign in with Slack" style={{ width:"150px", margin: "20px" }}>Sign in with Slack</button>
            </div>
            
        </form>
      </div>
    )
  }
}

function LoginViewState(state) {
  return state.userInfo
}

export default ReactRedux.connect(LoginViewState)(LoginView)