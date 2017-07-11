/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import Component from './karma.component.tsx'
import MessageView from './karma.messageview.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<PollResultView> {
  dispatch: any
  loggedInUser: any
  thread: any
  poll: any
}

interface IComponentState {
  showReply?: boolean
  message?: string
}

class PollResultView extends Component<IComponentProps, IComponentState> {

  render() {
    var poll = this.props.poll
    var loggedInUser = this.props.loggedInUser

    var responseForm = (<textarea placeholder="Your response..."></textarea>)
    var response = poll.Answer.Option ? poll.Answer.Option : poll.Answer.Comments
    var suggestion, messageView

    if (poll.Suggestion && poll.Suggestion.Comments && poll.Suggestion.Comments.length) {
      suggestion = (
        <div>
          <h5>Your suggestion</h5>
          <blockquote className="employee">
            <span className="poll_comment">{poll.Suggestion.Comments}</span>
            <span className="poll_comment_author">you</span>
          </blockquote>
        </div>
      )
    }

    if (poll.Answer.Messages && poll.Answer.Messages.length) {
      messageView = (
        <MessageView loggedInUser={loggedInUser} thread={poll.Answer.Messages} />
      )
    }

    return (
      <div className="poll_result_view">
        <h5>Your shared feedback</h5>
        <div>DoubleDutch asked:</div>
        <blockquote className="poll_title">
            <span className="poll_comment">{poll.Title}</span>
        </blockquote>
        <div>You answered:</div>
        <blockquote className="employee">
            <span className="poll_comment">{response}</span>
            <span className="poll_comment_author">you</span>
        </blockquote>
        {messageView}
        {suggestion}
      </div>
    )
  }

}

export default PollResultView