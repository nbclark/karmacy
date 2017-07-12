/// <reference path="../typings/index.d.ts" />
import Component from '../src/karma.component'
import Actions from './karma.store.actions.signup'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<SignupView> {
  dispatch: any
  loggedInUser: any
  userInterface: any
}

interface IComponentState {
  companyName?: string
  companyDomain?: string
  contactFirstName?: string
  contactLastName?: string
  contactEmail?: string
  contactPhone?: string
}

class SignupView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { companyName: '', companyDomain: '', contactFirstName: '', contactLastName: '', contactEmail: '', contactPhone: '' }
  }

  handleSubmit(e) {
    e.preventDefault();

    // Flag that we are starting a signup
    //this.props.dispatch(Actions.performLogin(this.state.email, this.state.password))
  }

  _companyNameChanged(ev) {
    this.setState({ companyName: ev.currentTarget.value })
  }

  _companyDomainChanged(ev) {
    this.setState({ companyDomain: ev.currentTarget.value })
  }

  _contactFirstNameChanged(ev) {
    this.setState({ contactFirstName: ev.currentTarget.value })
  }

  _contactLastNameChanged(ev) {
    this.setState({ contactLastName: ev.currentTarget.value })
  }

  _contactEmailChanged(ev) {
    this.setState({ contactEmail: ev.currentTarget.value })
  }

  _contactPhoneChanged(ev) {
    this.setState( { contactPhone: ev.currentTarget.value })
  }

  _sendClicked(ev) {

    //Do validation on form here

    this.props.dispatch(Actions.companySignup(this.state.companyName,
      this.state.companyDomain, this.state.contactFirstName,
      this.state.contactLastName,
      this.state.contactEmail,
      this.state.contactPhone
    ))

  }

  render() {

    var signupButton;
    if (this.props.userInterface.isCreatingAccount) {
      signupButton = <button className="button">Signing You Up!</button>
    } else {
      signupButton = <button className="button-primary" onClick={this._sendClicked.bind(this)}>Sign Up</button>;
    }

    var errStyle = {
      color:'#B22222'
    }

    var successStyle = {
      color: '#2E8B57'
    }

    var err;
    if(this.props.userInterface.failMessage.length > 0) {
      err = <div style={errStyle}>{this.props.userInterface.failMessage}</div>
    }

    var success;
    if(this.props.userInterface.success) {
      success = <div style={successStyle}>Successfully created account! Logging you in...</div>
      this.state = { companyName: '', companyDomain: '', contactFirstName: '', contactLastName: '', contactEmail: '', contactPhone: '' }
    }

    return (
      <div className="signup_view container">
          <h2>Signup your company for Karmacy</h2>
          {err}
          {success}
          <div className="row">
            <div className="columns three">
              <input type="text" placeholder="Company Name..." value={this.state.companyName} onChange={this._companyNameChanged.bind(this)} />
            </div>
            <div className="columns three">
              <input type="text" placeholder="Company Domain..." value={this.state.companyDomain} onChange={this._companyDomainChanged.bind(this)} />
            </div>
          </div>
          <div className="row">
            <div className="columns three">
              <input type="text" placeholder="Contact First Name" value={this.state.contactFirstName} onChange={this._contactFirstNameChanged.bind(this)} />
            </div>
            <div className="columns three">
              <input type="text" placeholder="Contact Last Name" value={this.state.contactLastName} onChange={this._contactLastNameChanged.bind(this)} />
            </div>
            <div className="columns three">
              <input type="text" placeholder="Contact Email" value={this.state.contactEmail} onChange={this._contactEmailChanged.bind(this)} />
            </div>
          </div>

          {signupButton}
      </div>
    )
  }
}


function SignupViewState(state) {
  return state
}

export default ReactRedux.connect(SignupViewState)(SignupView)
