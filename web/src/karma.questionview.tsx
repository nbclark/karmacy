/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import Component from './karma.component.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<QuestionView> {
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

class QuestionView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { title: '', options: '', questionType: 1, position: 0 }
  }

  componentWillMount () {
  }

  _titleChanged(ev) {
    this.setState({ title: ev.currentTarget.value })
  }

  _optionsChanged(ev) {
    this.setState({ options: ev.currentTarget.value })
  }

  _typeChanged(ev) {
    switch(ev.currentTarget.value) {
      case "free":
        this.setState({ questionType: 1})
        break
      case "multiple":
        this.setState({ questionType: 2})
        break
      case "ten":
        this.setState({ questionType: 3})
        break
    }
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
    var questions = this.props.companyInfo.questions.sort((q1, q2) => {
      return q1.Position < q2.Position ? -1 : 1
    })

    return (
      <div className="question_view">
        <h5>Questions</h5>
        <div className="table">
          <div className="columns three"></div>
          <div className="columns six">Title</div>
          <div className="columns three">Options</div>
        </div>
        { questions.map((question) => {
          return (
            <div className="table" key={question.ID}>
              <div className="columns three">
                <button className="button-primary" onClick={this._moveToTop.bind(this, question)}>Top</button>
              </div>
              <div className="columns six">{question.Title}</div>
              <div className="columns three">{question.Options}</div>
            </div>
          )
        })}
        <h5>Create Question</h5>
        <div>
          <div className="row form">
            <div className="columns six">
              <input type="text" placeholder="Question name..." value={this.state.title} onChange={this._titleChanged.bind(this)} />
            </div>
            <div className="columns six">
              <select onChange={this._typeChanged.bind(this)}>
                <option value="free">Free-text Response</option>
                <option value="multiple">Multiple Choice</option>
                <option value="ten">One to Ten</option>
              </select>
            </div>
          </div>
          <div className="row form">
            <div className="columns twelve">
              <input type="text" placeholder="Question options..." value={this.state.options} onChange={this._optionsChanged.bind(this)} />
            </div>
          </div>
          <div className="row form">
            <div className="columns twelve">
              <button className="button-primary" onClick={this._createQuestion.bind(this)}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionView
