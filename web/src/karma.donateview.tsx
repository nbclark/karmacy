/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import Component from './karma.component.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<DonateView> {
  dispatch: any
  loggedInUser: any
  companyInfo: any
  donateKarma: Function
}

interface IComponentState {
  toAccountID?: any
  message?: any
  amount?: number
}

class DonateView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { toAccountID: '', message: '', amount: 0 }
  }
  
  componentWillMount () {
  }

  _toAccountIDChanged(ev) {
    this.setState({ toAccountID: ev.currentTarget.value })
  }

  _messageChanged(ev) {
    this.setState({ message: ev.currentTarget.value })
  }

  _amountChanged(ev) {
    this.setState({ amount: parseInt(ev.currentTarget.value) })
  }
  
  _donateKarma(ev) {
    ev.stopPropagation()
    var karmaBalance = this.props.loggedInUser.Grant.Balance

    if (this.state.toAccountID.length && this.state.amount > 0 && this.state.amount <= karmaBalance) {
      if (confirm('Are you sure?')) {
        this.props.donateKarma(this.state.toAccountID, this.state.amount, this.state.message)
      }
    }
  }
  
  render() {
    var products = this.props.companyInfo.products
    var currentUserID = this.props.loggedInUser.ID

    return (
      <div className="donate_view">
        <h5>Praise a Teammate</h5>
        <form onSubmit={ (ev) => ev.preventDefault() }>
          <div className="columns five">
            <label htmlFor="exampleEmailInput">Praise a teammate</label>
            <select value={this.state.toAccountID} onChange={this._toAccountIDChanged.bind(this)}>
              <option value="">Choose a Recipient</option>
              {
                this.props.companyInfo.members.sort((m1, m2) => {
                  return m1.LastName < m2.LastName ? -1 : 1
                }).filter((m) => {
                  return m.ID != currentUserID
                }).map((m) => {
                  return <option key={m.ID} value={m.ID}>{m.FirstName} {m.LastName}</option>
                })
            }
            </select>
          </div>
          <div className="columns seven">
            <label htmlFor="exampleEmailInput">Donation amount</label>
            <input type="text" placeholder="Amount of karma to donate..." value={this.state.amount} onChange={this._amountChanged.bind(this)} />
          </div>

          <div className="columns twelve">
            <label htmlFor="exampleEmailInput">Praise feedback</label>
            <textarea onChange={this._messageChanged.bind(this)} value={this.state.message} placeholder="Optional comments for your teammate..."></textarea>
          </div>
          <div className="columns twelve">
            <button className="button-primary" onClick={this._donateKarma.bind(this)}>Donate Karma</button>
          </div>
        </form>
      </div>
    )
  }
}

export default DonateView