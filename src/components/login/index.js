import React, { PropTypes, Component } from 'react'

class Login extends Component {
	constructor (props) {
		super(props)
		this._handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit (e) {
		e.preventDefault()

		const { onLogin } = this.props	
		onLogin(new FormData(e.target))
	}

	render () {
		return <form onSubmit={this._handleSubmit}>
			<p>
				<label htmlFor="username">
					Username
				</label>
				<input id="username" type="text" name="username" />
			</p>
			<p>
				<label htmlFor="password">
					Password
				</label>
				<input id="password" type="password" name="password" />
			</p>
			<p>
				<label htmlFor="instance">
					Instance
				</label>
				<input id="instance" type="text" name="instance" value="https://mastodon.social" />
			</p>
			<button type="submit">
				Submit
			</button>
		</form>
	}
}

Login.propTypes = {
	onLogin : PropTypes.func.isRequired
}

export default Login