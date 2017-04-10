import React, { Component } from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import logo from '../../img/logo.png'
import './index.css'

class Login extends Component {
	constructor (props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()

		const { onLogin } = this.props
		onLogin(new FormData(e.target))
	}

	render () {
		const { t } = this.props

		return 	<div className="login">
					<div className="login-wrapper">
						<h3 className="login-title">Claverack</h3>
						<img className="login-logo" src={logo} alt="Logo" />
						<form onSubmit={this.handleSubmit}>
							<p>
								<label htmlFor="email">
									{t('email', 'capitalize')}
								</label>
								<input id="email" type="text" name="email" />
							</p>
							<p>
								<label htmlFor="password">
									{t('password')}
								</label>
								<input id="password" type="password" name="password" />
							</p>
							<p>
								<label htmlFor="instance">
									{t('instance')}
								</label>
								<input disabled id="instance" type="text" name="instance" value="https://mastodon.social" />
							</p>
							<p className="login-submit">
								<button type="submit">
									{t('submit')}
								</button>
							</p>
						</form>
					</div>
				</div>
	}
}

Login.propTypes = {
	onLogin : PropTypes.func.isRequired
}

export default translate()(Login)
