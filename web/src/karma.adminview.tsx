/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import LoadingOverlay from './karma.loadingoverlay.tsx'
import Component from './karma.component.tsx'
import TeamView from './karma.teamview.tsx'
import ProductView from './karma.productview.tsx'
import QuestionView from './karma.questionview.tsx'
import DonateView from './karma.donateview.tsx'
import InviteView from './karma.inviteview.tsx'
import AdminPollView from './karma.adminpollview.tsx'
import { Router, Route, Link } from 'react-router'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<HomeView> {
  dispatch: any
  loggedInUser: any
  companyInfo: any
  userInfo: any
  userInterface: any
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
  
  _createQuestion(title, options, type, position) {
    if (title && title.length) {
      this.props.dispatch(Actions.createQuestion(title, options, type, position))
    }
  }
  
  _setQuestionPosition(questionID, position) {
    this.props.dispatch(Actions.setQuestionPosition(questionID, position))
  }
  
  render() {

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
      <div className="admin_view">
        <div className="columns eight">
          <InviteView sendInvite={this._sendInvite.bind(this)} company={this.props.companyInfo.company} teams={this.props.companyInfo.teams} />
          <h5>Team Settings</h5>
          <div className="form">
            <div className="columns four">
              <select>
                  <option>All Teams</option>
                  { this.props.companyInfo.teams.map((team) => {
                      return <option key={team.ID}>{team.Name}</option>
                  })}
              </select> 
            </div>
            <div className="columns four">
              <input type="text" placeholder="Team Name..." value={this.state.newTeamName} onChange={this._newTeamNameChanged.bind(this)} /> 
            </div>
            <div className="columns four">
              <button className="button-primary" onClick={this._createTeam.bind(this)}>Create Team</button>
            </div>
          </div>
          <TeamView />
          <QuestionView loggedInUser={this.props.userInfo.loggedInUser} companyInfo={this.props.companyInfo} createQuestion={this._createQuestion.bind(this)} setQuestionPosition={this._setQuestionPosition.bind(this)} />
          <AdminPollView companyInfo={this.props.companyInfo} />
        </div>
        <div className="columns four transaction_view">
          <h5>TODOs for Admin</h5>
          ...
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