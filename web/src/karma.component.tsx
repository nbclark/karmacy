/// <reference path="../typings/index.d.ts" />
import * as React from 'react'

class Component<Props, State> extends React.Component<Props, State> {
	constructor() {
		super()
		var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))

		methods.filter((n) => {
			this[n] = this[n].bind(this)
			return n.substring(0,1) === '_'
		})
	}
}

export default Component