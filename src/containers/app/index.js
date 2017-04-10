import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { registerApp } from '../../utils/api'
import { registerApp as registerAppAction } from '../../actions/config'
import Routes from '../../components/routes'
import { translate } from 'react-i18next'

class App extends Component {
	componentDidMount () {
		const { setAppKeys, isRegistered } = this.props

		if (!isRegistered) {
			registerApp()
				.catch(e => {
					// How to handle this?
					// Just display a failed page and don't do anything?
					// Suggest to relaunch the app?
					console.error(e)
					throw e
				})
				.then(setAppKeys)
		}
	}

	render () {
		const { t, isRegistered } = this.props

		if (!isRegistered) {
			return <div>
				{t('loading')}
			</div>
		}

		return <Routes />
	}
}

App.propTypes = {
	isRegistered : PropTypes.bool.isRequired,
	setAppKeys : PropTypes.func.isRequired
}

const stateToProps = (state) => {
	return {
		isRegistered: Boolean(state.config.appKeys !== null)
	}
}

const dispatchToProps = (dispatch) => {
	return {
		setAppKeys: (appKeys) => {
			dispatch(registerAppAction(appKeys))
		}
	}
}

export default connect(
	stateToProps,
	dispatchToProps
)(translate()(App))
