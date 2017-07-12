/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions'
import Component from './karma.component'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<AdminPollView> {
  dispatch: any
  companyInfo: any
  createQuestion: Function
  setQuestionPosition: Function
}

interface IComponentState {
  title?: any
  options?: any
  questionType?: number
  position?: number
}

class AdminPollView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { title: '', options: 'a,b,c', questionType: 1, position: 0 }
  }

  componentWillMount () {
  }

  _titleChanged(ev) {
    this.setState({ title: ev.currentTarget.value })
  }

  _optionsChanged(ev) {
    this.setState({ options: ev.currentTarget.value })
  }

  _createQuestion(member, ev) {
    if (confirm('Are you sure?')) {
      this.props.createQuestion(this.state.title, this.state.options.split(','), this.state.questionType, this.state.position)
    }
  }

  _moveToTop(question) {
    if (confirm('Are you sure?')) {
      this.props.setQuestionPosition(question.ID, 0)
    }
  }

  render() {
    var pollInstances = this.props.companyInfo.company.QuestionSet
    var questions = this.props.companyInfo.questions

    var msg
    if(this.props.companyInfo.company.QuestionSet.length) {
      msg = <div>Next question will go out at <span>{new Date(this.props.companyInfo.company.QuestionSet[0].Expires).toDateString()}</span></div>
    }

    return (
      <div className="admin_poll_view">
        <h5>Polling Results</h5>
        {msg}
        { pollInstances.map((p) => {
          var question = questions.filter((q) => {
            return q.ID == p.QuestionID
          })[0]

          if (!question) return null

          return (
            <div className="table" key={p.InstanceID}>
              <div className="columns five">
                <Link to={"/admin/polls/" + p.InstanceID}>{question.Title}</Link>
              </div>
              <div className="columns three">
                2 responses
              </div>
              <div className="columns four">
                {new Date(p.Expires).toDateString()}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default AdminPollView
