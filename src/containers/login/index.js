import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Login from '../../components/login'

import { connect } from 'react-redux'
import { login } from '../../actions/users'
import { login as apiLogin } from '../../utils/api'
import { withRouter } from 'react-router'

class LoginContainer extends Component {
	constructor (props) {
		super(props)

		this.handleLogin = this.handleLogin.bind(this)
	}

	handleLogin(credentials) {
		const { login, token, history } = this.props
		const { client_id, client_secret } = token

		credentials.append('client_id', client_id)
		credentials.append('client_secret', client_secret)
		credentials.append('grant_type', 'password')

		apiLogin(credentials)
			.then(login)
			.then(() => {
				history.push('/')
			})
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