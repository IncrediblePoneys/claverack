import React, { Component } from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

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

		return <form onSubmit={this.handleSubmit}>
			<p>
				<label htmlFor="username">
					{t('username')}
				</label>
				<input id="username" type="text" name="username" />
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
				<input id="instance" type="text" name="instance" value="https://mastodon.social" />
			</p>
			<button type="submit">
				{t('submit')}
			</button>
		</form>
	}
}

Login.propTypes = {
	onLogin : PropTypes.func.isRequired
}

export default translate()(Login)