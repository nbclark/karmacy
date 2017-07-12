/// <reference path="../typings/index.d.ts" />
import Component from './karma.component'
import * as React from 'react'

interface IComponentProps extends React.Props<LoadingOverlay> {
}

interface IComponentState {
}

class LoadingOverlay extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="loading_overlay" />
    )
  }
}

export default LoadingOverlay