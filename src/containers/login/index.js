import React, { Component } from 'react'
import Login from '../../components/login'

class LoginContainer extends Component {
	constructor (props) {
		super(props)

		this._handleLogin = this.handleLogin.bind(this)
	}

	handleLogin(credentials) {
		console.log(credentials)
	}

	render () {
		return <Login onLogin={this._handleLogin} />
	}
}

export default LoginContainer