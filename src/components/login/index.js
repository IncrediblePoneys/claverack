import React, { Component } from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { getInstances } from '../../utils/instances'

import logo from '../../img/logo.png'
import './index.css'

class Login extends Component {
	constructor (props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInstanceChange = this.handleInstanceChange.bind(this)
		this.state = {
			loading: true,
			instances: [],
			canLogin: false
		}
	}

	async componentDidMount () {
		const instances = await getInstances()
		this.setState({
			loading: false,
			instances
		})
	}

	async handleInstanceChange (event) {
		const { registerAppForInstance } = this.props
		const instance = event.target.value

		this.setState({ canLogin: false })
		if (instance) {
			await registerAppForInstance(event.target.value)
			this.setState({ canLogin: true })
		}
	}

	handleSubmit (e) {
		e.preventDefault()
		if (!this.state.canLogin) {
			return
		}

		const { onLogin } = this.props
		onLogin(new FormData(e.target))
	}

	render () {
		const { t } = this.props
		const { loading, instances } = this.state

		if (loading) {
			return <div>
				Loading...
			</div>
		}

		return 	<div className="login">
					<div className="login-wrapper">
						<h3 className="login-title">Claverack</h3>
						<img className="login-logo" src={logo} alt="Logo" />
						<form onSubmit={this.handleSubmit}>
							<p>
								<label htmlFor="instance">
									{t('instance')}
								</label>
								<select onChange={this.handleInstanceChange} name="instance" id="instances">
									<option value="">{t('pickone')}</option>
									{instances.map((instance, index) => {
										return <option key={index}>
											{instance}
										</option>
									})}
								</select>
							</p>
							{this.state.canLogin && <div>
									<p>
										<label htmlFor="email">
											{t('Email')}
										</label>
										<input id="email" type="text" name="username" />
									</p>
									<p>
										<label htmlFor="password">
											{t('password')}
										</label>
										<input id="password" type="password" name="password" />
									</p>
									<p className="login-submit">
										<button type="submit">
											{t('submit')}
										</button>
									</p>
								</div>
							}
						</form>
					</div>
				</div>
	}
}

Login.propTypes = {
	onLogin: PropTypes.func.isRequired,
	registerAppForInstance: PropTypes.func.isRequired
}

export default translate()(Login)
