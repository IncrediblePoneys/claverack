import React, { Component } from 'react'
import { translate } from 'react-i18next'

import logo from './logo.svg'
import './App.css'

class App extends Component {
	render() {
		const { t } = this.props
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>{t('welcome')}</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		)
	}
}

export default translate()(App)
