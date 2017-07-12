/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions'
import LoadingOverlay from './karma.loadingoverlay'
import Component from './karma.component'
import TeamView from './karma.teamview'
import ProductView from './karma.productview'
import DonateView from './karma.donateview'
import InviteView from './karma.inviteview'
import PollView from './karma.pollview'
import TransactionsView from './karma.transactionsview'
import { Router, Route, Link } from 'react-router'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<HomeView> {
  dispatch: any
  userInfo: any
  companyInfo: any
}

interface IComponentState {
  newTeamName?: any
}

class HomeView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { newTeamName: '' }
  }
  
  componentWillMount () {
  }

  _newTeamNameChanged(ev) {
    this.setState({ newTeamName: ev.currentTarget.value })
  }
  
  _createTeam(ev) {
    if (this.state.newTeamName && this.state.newTeamName.length > 2) {
      this.props.dispatch(Actions.createTeam(this.state.newTeamName))
    }
  }
  
  _createProduct(name, description, price, quantity) {
    if (name && name.length && description && description.length && price > 0) {
      this.props.dispatch(Actions.createProduct(name, description, price, quantity))
    }
  }
  
  _purchaseProduct(productID, price) {
    this.props.dispatch(Actions.purchaseProduct(productID, price))
  }
  
  _sendInvite(data) {
    if (data.email.length > 0) {
      this.props.dispatch(Actions.sendInvite(data.email, data.firstName, data.lastName, data.role, data.teamID))
    }
  }
  
  _donateKarma(toAccountID, amount, message) {
    this.props.dispatch(Actions.donateKarma(toAccountID, amount, message))
  }

  _submitPollResponse(pollID, option, response, suggestion) {
    debugger
    this.props.dispatch(Actions.submitPollResponse(pollID, option, response, suggestion))
  }
  
  render() {

    var poll = this.props.userInfo.poll
    var components = [
        <PollView key="poll" poll={poll} submitResponse={this._submitPollResponse} />,
        <DonateView key="donate" loggedInUser={this.props.userInfo.loggedInUser} companyInfo={this.props.companyInfo} donateKarma={this._donateKarma.bind(this)} />
      ]

    if (poll && poll.Answer) {
      // We want to reverse if they have already answered
      var p = components[0]
      components[0] = components[1]
      components[1] = p
    }

    return (
      <div className="logged_in_view">
      
        <div className="columns eight">
          {components}
        </div>

        <div className="columns four transaction_view">
          <TransactionsView loggedInUser={this.props.userInfo.loggedInUser} />
        </div>
      </div>
    )
  }
  
  _prepareModal(modalName) {
    switch (modalName) {
    //   case 'create_room_modal' :
    //     return <CreateRoomModal onDismiss={this._toggleModal.bind(this, null)} onCreateRoom={this._createRoom} roomInfo={this.props.roomInfo} attendeeInfo={this.props.attendeeInfo} />
    //   case 'select_room_modal' :
    //     return <SelectRoomModal onDismiss={this._toggleModal.bind(this, null)} onSelectRoom={this._selectRoom} roomInfo={this.props.roomInfo} />
    //   case 'select_attendee_modal' :
    //     return <SelectAttendeeModal onDismiss={this._toggleModal.bind(this, null)} onSelectAttendees={this._selectAttendees} roomInfo={this.props.roomInfo} attendeeInfo={this.props.attendeeInfo} />
      default :
        return null
    }
  }
}

function LoggedInViewState(state) {
  return state
}

export default ReactRedux.connect(LoggedInViewState)(HomeView)