/// <reference path="../typings/index.d.ts" />
import * as ReactRedux from 'react-redux'
import Actions from './karma.store.actions'
import LoadingOverlay from './karma.loadingoverlay'
import Component from './karma.component'
import TeamView from './karma.teamview'
import ProductView from './karma.productview'
import QuestionView from './karma.questionview'
import DonateView from './karma.donateview'
import InviteView from './karma.inviteview'
import AdminPollView from './karma.adminpollview'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<AdminPollResultView> {
  dispatch: any
  params: any
  companyInfo: any
}

interface IComponentState {
  message?: any
}

class AdminPollResultView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { message: '' }
  }
  
  componentWillMount () {
    var id = this.props.params.id
    this.props.dispatch(Actions.loadPollResults(id))
  }

  _messageValueChanged(ev) {
    this.setState({ message: ev.currentTarget.value })
  }

  _sendMessage(pollID) {
    var id = this.props.params.id
    this.props.dispatch(Actions.sendPollResponseMessage(id, pollID, this.state.message))
  }
  
  render() {

    if (this.props.companyInfo.isLoadingPollResults || !this.props.companyInfo.pollResults) {
        return (
            <div className="admin_view">
                <LoadingOverlay />
            </div>
        )
    }

    var id = this.props.params.id
    var results = this.props.companyInfo.pollResults[id]
// {JSON.stringify(r.Answer.Messages)}
//               <br /><input type="text" value={this.state.message} onChange={this._messageValueChanged.bind(this)} placeholder="Send Message" /> <button onClick={this._sendMessage.bind(this, r.ID)}>Send</button>
    return (
      <div className="admin_view poll_view">
        <h5>Poll answers</h5>
        {results.filter((r) => { return r.Answer }).map((r) => {
          return (
            <li key={r.ID}>
              {r.Answer.Comments} ({r.Answer.Option}) [{r.Answer.Created}]
              {r.Answer.Messages.map((m) => {
                return (
                  <blockquote className={ m.IsAdministrator ? "" : "employee" }>
                      <span className="poll_comment">{m.Comments}</span>
                      <span className="poll_comment_author">{m.AccountID}</span>
                  </blockquote>
                )
              })}
            </li>
          )
        })}
        <h5>Poll suggestions</h5>
        {results.filter((r) => { return r.Suggestion }).map((r) => {
          return (
            <li key={r.ID}>{r.Suggestion.Comments} [{r.Suggestion.Created}]</li>
          )
        })}
      </div>
    )
  }
}

function LoggedInViewState(state) {
  return state
}

export default ReactRedux.connect(LoggedInViewState)(AdminPollResultView)