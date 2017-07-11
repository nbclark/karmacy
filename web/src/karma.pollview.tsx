/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import Component from './karma.component.tsx'
import PollResultView from './karma.pollresultview.tsx'
import PollTakeView from './karma.polltakeview.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<PollView> {
  dispatch: any
  loggedInUser: any
  thread: any
  poll: any
  submitResponse: Function
}

interface IComponentState {
}

class PollView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
  }
  
  componentWillMount () {
  }
  
  submitResponse(pollID, option, response, suggestion) {
    this.props.submitResponse(pollID, option, response, suggestion)
  }
  
  render() {
    var poll = this.props.poll
    var loggedInUser = this.props.loggedInUser

    if (!poll) return (<div />)
      
    var view = poll.Answer ?
      <PollResultView loggedInUser={loggedInUser} poll={poll} /> :
      <PollTakeView loggedInUser={loggedInUser} poll={poll} submitResponse={this.submitResponse} />

    return (
      <div className="poll_view">
        {view}
      </div>
    )
  }
}

export default PollView