/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions'
import Component from './karma.component'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<MessageView> {
  dispatch: any
  loggedInUser: any
  thread: any
  poll: any
}

interface IComponentState {
  showReply?: boolean
  message?: string
}

class MessageView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { showReply: false, message: '' }
  }

  _messageChanged(ev) {
    //
  }

  _sendMessage(ev) {
    if (!this.state.showReply) {
      this.setState({ showReply: true })
      document.getElementById('message_reply').focus()
    } else {
      // Send the message
    }
  }

  render() {
    var thread = this.props.thread
    var loggedInUser = this.props.loggedInUser
    var replyStyle = this.state.showReply ?
      { height : '', visibility: 'visible' } :
      { height: 0, overflow: 'hidden', visibility: 'hidden' }

    return (
      <div className="message_view">
        { thread.map((m, index) => {
          return (
            <blockquote key={index} className={ m.IsAdministrator ? "" : "employee" }>
                <span className="poll_comment">{m.Comments}</span>
                <span className="poll_comment_author">{m.AccountID}</span>
            </blockquote>
          )
        }) }
        <div className="message_send">
          <div className="columns twelve" style={replyStyle}>
            <textarea id="message_reply" onChange={this._messageChanged.bind(this)} value={this.state.message} placeholder="Optional comments for your teammate..."></textarea>
          </div>
          <div className="columns twelve">
            <button className="button-primary" onClick={this._sendMessage.bind(this)}>Reply</button>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageView