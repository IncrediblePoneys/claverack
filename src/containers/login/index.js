import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Login from '../../components/login'

import { connect } from 'react-redux'
import { login as loginAction } from '../../actions/users'
import {
	verify,
	login as loginApi
} from '../../utils/api'
import { withRouter } from 'react-router'

class LoginContainer extends Component {
	constructor (props) {
		super(props)

		this.handleLogin = this.handleLogin.bind(this)
	}

	async handleLogin(credentials) {
		const { loginDispatch, appKeys, history } = this.props
		const { client_id, client_secret } = appKeys

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

	render () {
		return <Login onLogin={this.handleLogin} />
	}
}

LoginContainer.propTypes = {
	history : PropTypes.object.isRequired,
	appKeys : PropTypes.object.isRequired,
	loginDispatch : PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		appKeys : JSON.parse(state.config.appKeys)
	}
}

const dispatchToProps = (dispatch) => {
	return {
		loginDispatch : (user) => {
			dispatch(loginAction(user))
		}
	}
}

const connected = connect(
	mapStateToProps,
	dispatchToProps
)(LoginContainer)

export default withRouter(connected)
