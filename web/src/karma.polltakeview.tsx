/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import Component from './karma.component.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<PollTakeView> {
  dispatch: any
  loggedInUser: any
  thread: any
  poll: any
  submitResponse: Function
}

interface IComponentState {
  option?: string
  response?: string
  suggestion?: string
}

class PollTakeView extends Component<IComponentProps, IComponentState> {
  
  constructor() {
    super()
    this.state = { option: '', response: '', suggestion: '' }
  }

  _optionChanged(value, ev) {
    this.setState({ option: value })
  }

  _responseChanged(ev) {
    this.setState({ response: ev.currentTarget.value })
  }

  _suggestionChanged(ev) {
    this.setState({ suggestion: ev.currentTarget.value })
  }

  _submitResponse() {
    debugger
    this.props.submitResponse(this.props.poll.ID, this.state.option, this.state.response, this.state.suggestion)
  }

  render() {
    var poll = this.props.poll

    var responseForm

    if (poll.QuestionType == 1) {
      responseForm = (
        <div className="poll_options poll_custom">
          {poll.Options.map((o, index) => {
            var className = this.state.option === o ? "button-primary" : ""
            return (<button className={className} key={index} onClick={this._optionChanged.bind(this, o)}>{o}</button>)
          })}
        </div>
      )
    } else if (poll.QuestionType == 2) {
      responseForm = (
        <div className="poll_options poll_ten">
          {[1,2,3,4,5,6,7,8,9,10].map((o, index) => {
            return (<button className="columns one" key={index} onClick={this._optionChanged.bind(this, o)}>{o}</button>)
          })}
        </div>
      )
    } else if (poll.QuestionType == 3) {
      responseForm = (
        <textarea placeholder="Please respond to the question in your own words..." value={this.state.response} onChange={this._responseChanged.bind(this)}></textarea>
      )
    }

    return (
      <div className="poll_take_view">
        <h5>Share some feedback</h5>
        <blockquote className="poll_title">
            <span className="poll_comment">{poll.Title}</span>
        </blockquote>
        {responseForm}
        <h5>Have a suggestion?</h5>
        <div className="columns twelve">
          <textarea placeholder="Have any other suggestions? We'd love to hear them..." value={this.state.suggestion} onChange={this._suggestionChanged.bind(this)}></textarea>
        </div>
        <div className="columns twelve">
          <button className="button-primary" onClick={this._submitResponse}>Submit Response(s)</button>
        </div>
      </div>
    )
  }

}

export default PollTakeView