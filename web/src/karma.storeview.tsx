/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import LoadingOverlay from './karma.loadingoverlay.tsx'
import Component from './karma.component.tsx'
import TeamView from './karma.teamview.tsx'
import ProductView from './karma.productview.tsx'
import DonateView from './karma.donateview.tsx'
import InviteView from './karma.inviteview.tsx'
import { Router, Route, Link } from 'react-router'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<HomeView> {
  dispatch: any
  companyInfo: any
  userInfo?: any
  userInterface?: any
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
  
  render() {
console.log(this.props.companyInfo.isLoadingTeams)
console.log(this.props.companyInfo.isLoadingCompany)
console.log(this.props.userInfo.isLoadingUser)
    if (!this.props.userInfo.loggedInUser) return (<div />)
    var modal = this._prepareModal(this.props.userInterface.activeModal)


    if (this.props.companyInfo.isLoadingTeams || this.props.companyInfo.isLoadingCompany || this.props.userInfo.isLoadingUser) {
        return (
            <div className="logged_in_view">
                <LoadingOverlay />
            </div>
        )
    }

    return (
      <div className="logged_in_view">
        <ProductView loggedInUser={this.props.userInfo.loggedInUser} companyInfo={this.props.companyInfo} createProduct={this._createProduct.bind(this)} purchaseProduct={this._purchaseProduct.bind(this)} />
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