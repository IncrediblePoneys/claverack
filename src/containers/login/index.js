import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Login from '../../components/login'

import { connect } from 'react-redux'
import { login } from '../../actions/users'
import {
	verify,
	login as apiLogin
} from '../../utils/api'
import { withRouter } from 'react-router'

class LoginContainer extends Component {
	constructor (props) {
		super(props)

		this.handleLogin = this.handleLogin.bind(this)
	}

	async handleLogin(credentials) {
		const { login, token, history } = this.props
		const { client_id, client_secret } = token

		try {
			const oauth = await apiLogin(credentials, { client_id, client_secret })
			const user = await verify(oauth, credentials.get('instance'))

			login({ oauth, user })
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
	token : PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		token : JSON.parse(state.config.token)
	}
}

const dispatchToProps = (dispatch) => {
	return {
		login : (user) => {
			dispatch(login(user))
		}
	}
}

const connected = connect(
	mapStateToProps,
	dispatchToProps
)(LoginContainer)

export default withRouter(connected)
