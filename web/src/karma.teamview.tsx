/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions'
import Component from './karma.component'
import { Router, Route, Link } from 'react-router'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<TeamView> {
  dispatch: any
  companyInfo: any
}

interface IComponentState {
}

class TeamView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { newTeamName: '' }
  }
  
  componentWillMount () {
  }
  
  _assignMember(member, ev) {
    if (confirm('Are you sure?')) {
      this.props.dispatch(Actions.assignMember(member.ID, ev.target.value))
    }
  }
  
  render() {
    var groupedMembers = { }
    var teamMap = { "" : { Name: "Un-assigned" } }
    this.props.companyInfo.teams.forEach((t) => {
      groupedMembers[t.ID] = []
      teamMap[t.ID] = t
    })
    this.props.companyInfo.members.forEach((m) => {
      if (!groupedMembers[m.TeamID]) {
        groupedMembers[m.TeamID] = []
      }
      groupedMembers[m.TeamID].push(m)
    })

    return (
      <div className="team_view">
        <h5>Teams</h5>
        { Object.keys(groupedMembers).sort((a, b) => {
            if (groupedMembers[a].length == groupedMembers[b].length) {
              return teamMap[a].Name < teamMap[b].Name ? 1 : -1
            } else {
              return groupedMembers[a].length > groupedMembers[b].length ? -1 : 1
            }
          }).map((t) => {
            return (
              <div key={t} className="form table">
              <h6>{teamMap[t].Name}</h6>
              { groupedMembers[t].map((member) => {
                return (
                  <div key={member.ID}>
                    <div className="columns four">
                      {member.FirstName} {member.LastName}
                    </div>
                    <div className="columns four">
                      {member.EmailAddress}
                    </div>

                    <div className="columns four">
                      <select value={member.TeamID} onChange={this._assignMember.bind(this, member)}>
                          <option value="">Un-assigned</option>
                          { this.props.companyInfo.teams.map((team) => {
                              return <option key={team.ID} value={team.ID}>{team.Name}</option>
                          })}
                      </select> 
                    </div>
                  </div>
                )
              })}
              </div>
            )
        })}
      </div>
    )
  }
}

function TeamViewState(state) {
  return state
}

export default ReactRedux.connect(TeamViewState)(TeamView)