import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Login from '../../components/login'
import { login as loginAction } from '../../actions/users'
import { verify, login as loginApi } from '../../utils/api'
import { registerApp as registerAppApi } from '../../utils/api'
import { registerApp as registerAppAction } from '../../actions/config'

class LoginContainer extends Component {
	constructor (props) {
		super(props)

		this.handleLogin = this.handleLogin.bind(this)
		this.registerAppForInstance = this.registerAppForInstance.bind(this)
	}


	async handleLogin(credentials) {
		const { loginDispatch, appKeys, history } = this.props
		const instance = credentials.get('instance')
		const { client_id, client_secret } = appKeys[instance]

		try {
			const oauth = await loginApi(credentials, { client_id, client_secret })
			const user = await verify(oauth, credentials.get('instance'))

			loginDispatch({ oauth, user })
			history.push('/')
		} catch (e) {
			// What to do with this?
			console.info("Proper error handling to be done here sir 🎩")
			console.error(e)
			history.push('/error') // ?
		}
	}

	// Register claverack to selected instance
	// Or use already created keys
	async registerAppForInstance(instance) {
		const { setAppKeys, appKeys } = this.props

		if (appKeys[instance]) {
			return appKeys[instance]
		} else {
			let newAppKeys = await registerAppApi(instance)
			setAppKeys(newAppKeys, instance)
			return newAppKeys
		}
	}

	render () {
		return <Login onLogin={this.handleLogin} registerAppForInstance={this.registerAppForInstance} />
	}
}

LoginContainer.propTypes = {
	history : PropTypes.object.isRequired,
	appKeys : PropTypes.object.isRequired,
	loginDispatch : PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		appKeys: state.config.appKeys
	}
}

const dispatchToProps = (dispatch) => {
	return {
		loginDispatch : (user) => {
			dispatch(loginAction(user))
		},

		setAppKeys: (appKeys, instance) => {
			dispatch(registerAppAction(appKeys, instance))
		}
	}
}

const connected = connect(
	mapStateToProps,
	dispatchToProps
)(LoginContainer)

export default withRouter(connected)
