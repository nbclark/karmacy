/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions'
import Component from './karma.component'
import { pushPath } from 'redux-simple-router'
import { Link } from 'react-router'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

interface IComponentProps extends React.Props<MainPage> {
  dispatch: any
  content: any
  companyInfo: any
  userInfo: any
}

interface IComponentState {
  isLoaded?: boolean,
  isLoading?: boolean
}

class MainPage extends Component<IComponentProps, IComponentState> {

  constructor() {
    super()
    this.state = { isLoaded: false }
  }

  componentWillMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoading) {
      this.checkAuth(nextProps)
    }
  }

  checkAuth(nextProps) {
    this.props.dispatch(Actions.loadInitialState('asd'))
    this.setState({ isLoading: true })
    return
    // TODO - remove this
    if (nextProps.userInfo.isHydrated && !nextProps.userInfo.loggedInUser) {
      console.log('logging out')
      this.props.dispatch(pushPath('/login.html', {}))
    } else if (nextProps.userInfo.isHydrated) {
      // first load --
      if (!this.state.isLoaded) {
        this.props.dispatch(Actions.loadInitialState())
        this.setState({ isLoaded: true })
      }
    }
  }

  render() {
    const { content } = this.props

    if (this.props.companyInfo.isLoadingTeams || this.props.companyInfo.isLoadingCompany || this.props.userInfo.isLoadingUser) {
      return (
        <div className="loading_view">
          <div>Loading Karmacy...</div>
        </div>
      )
    }

    var adminLink = this.props.userInfo.loggedInUser.Role === 'Administrator' ?
      <Link to="/admin"><button className="button-primary">Admin</button></Link> : null

    return (
      <div>
        <div id="header">
          <div className="container">
            <span>karmacy</span>
            <span>{this.props.companyInfo.company.Name}</span>
          </div>
        </div>
        <div className="container main_view">
          <div className="menu columns two">
            <Link to="/"><button className="button-primary">Home</button></Link>
            <Link to="/store"><button className="button-primary">Store</button></Link>
            {adminLink}
            <div>{this.props.userInfo.loggedInUser.Balance}₭ balance</div>
          </div>
          <div className="columns ten">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

/*
MainPage.propTypes = {
  userInfo: React.PropTypes.shape({
    isLoggingIn: React.PropTypes.bool.isRequired,
    isHydrated: React.PropTypes.bool.isRequired,
    loggedInUser: React.PropTypes.shape({
      FirstName: React.PropTypes.string
    })
  })
}
*/

function MainPageState(state) {
  return state
}

export default ReactRedux.connect(MainPageState)(MainPage)