/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import LoadingOverlay from './karma.loadingoverlay.tsx'
import Component from './karma.component.tsx'
import TeamView from './karma.teamview.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<InviteView> {
  dispatch: any
  teams: any
  company: any
  sendInvite: Function
}

interface IComponentState {
  email?: any
  firstName?: any
  lastName?: any
  role?: any
  teamID?: any
}

class InviteView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { email: '', firstName: '', lastName: '', role: 'Employee', teamID: '' }
  }

  _emailChanged(ev) {
    this.setState({ email: ev.currentTarget.value })
  }

  _roleChanged(ev) {
    this.setState({ role: ev.currentTarget.value })
  }

  _teamChanged(ev) {
    this.setState({ teamID: ev.currentTarget.value })
  }

  _firstNameChanged(ev) {
    this.setState({ firstName: ev.currentTarget.value })
  }

  _lastNameChanged(ev) {
    this.setState({ lastName: ev.currentTarget.value })
  }

  _sendClicked(ev) {
    if (this.state.email.length < 1) {
      alert('Invalid Email')
    } else if (this.state.firstName.length < 1) {
      alert('Invalid First Name')
    }  else if (this.state.lastName.length < 1) {
      alert('Invalid Last Name')
    } else {
      var email = this.state.email + '@' + this.props.company.Domain
      if (confirm('Are you sure you want to invite ' + email + ' to team ' + this.state.teamID + '?')) {
        this.props.sendInvite({
          email: email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          teamID: this.state.teamID,
          role: this.state.role
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.company) {
      if (!this.state.email) {
      }
    }
  }
  
  render() {

    return (
      <div className="invite_view form">
        <h5>Invite Member(s)</h5>
        <div>
          <div>
            <div className="columns three">
              <input type="text" placeholder="First Name..." value={this.state.firstName} onChange={this._firstNameChanged.bind(this)} />
            </div>

            <div className="columns three">
              <input type="text" placeholder="Last Name..." value={this.state.lastName} onChange={this._lastNameChanged.bind(this)} />
            </div>

            <div className="columns six">
              <input type="text" placeholder="Email Address..." value={this.state.email} onChange={this._emailChanged.bind(this)}>
              </input>
              <label>{'@' + this.props.company.Domain}</label>

            </div>
          </div>

          <div>
            <div className="columns six">
              <select value={this.state.teamID} onChange={this._teamChanged.bind(this)}>
                  <option value="">Un-assigned</option>
                  { this.props.teams.map((team) => {
                      return <option key={team.ID}>{team.Name}</option>
                  })}
              </select>
            </div>

            <div className="columns six">
              <select value={this.state.role} onChange={this._roleChanged.bind(this)}>
                <option>Employee</option>
                <option>Manager</option>
                <option>Administrator</option>
              </select>
            </div>
          </div>
          <button className="button-primary" onClick={this._sendClicked.bind(this)}>Send Invite</button>
        </div>
      </div>
    )
  }
}

export default InviteView