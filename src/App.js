import React, { Component } from 'react'
import './App.css'

import { registerApp, login, timeline } from './utils/api'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			credentials: null,
			timeline : null
		}

		this._handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		Promise.resolve(localStorage.getItem('credentials'))
			.then(credentials => {
				if (!credentials) {
					return registerApp()
						.then(JSON.stringify)
						.then(credentials => {
							localStorage.setItem('credentials', credentials)
							return credentials
						})
				}
				return credentials
			})
			.then(credentials => {
				this.setState(() => {
					return {
						credentials
					}
				})
			})
	}

	handleSubmit (e) {
		e.preventDefault()

		const { client_id, client_secret } = JSON.parse(this.state.credentials)

		let data = new FormData(e.target)
		data.append('client_id', client_id)
		data.append('client_secret', client_secret)
		data.append('grant_type', 'password')

		login(data)
			.then(timeline)
			.then((timeline) => {
				this.setState(() => ({
					timeline
				}))
			})
	}

	render() {
		const { credentials, timeline } = this.state

		if (!credentials) {
			return <div>
				Loading...
			</div>
		}

		if (!timeline) {
			return <form onSubmit={this._handleSubmit}>
				<p>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" name="username" />
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" name="password" />
				</p>
				<p>
					<label htmlFor="instance">Instance</label>
					<input id="instance" type="text" name="instance" value="https://mastodon.social"/>
				</p>
				<input type="submit" value="Submit" />
			</form>
		}

		return <section>
			{timeline.map((toot, index) => {
				const content = (toot.reblog && toot.reblog.content) || toot.content

				return <div key={index}>
					<div>
						{content}
					</div>
					<hr/>
				</div>
			})}
		</section>
	}
}

export default App
