import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Timeline from '../timeline'
import { saveLayout as saveLayoutAction } from '../../actions/config'

import './index.css'

const components = {
	timeline: Timeline
}

class Main extends Component {

	render () {
		const { layout, currentAccount, match } = this.props
		const columns = [
			<Timeline type={match.params.component} accountUrl={currentAccount.user.url} />,
			...layout.map((column) => {
				const Component = components[column.component]
				return <Component {...column} />
			})
		]

		return <main className="main">
			{columns}
		</main>
	}
}

Main.propTypes = {
	currentAccount: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	const { selected, accounts } = state.users

	return {
		layout: state.config.layout,
		currentAccount: accounts[selected]
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveLayout : (layout) => {
			return dispatch(saveLayoutAction(layout))
		}
	}
}

const translated = translate()(Main)
const connected = connect(mapStateToProps, mapDispatchToProps)(translated)
const routed = withRouter(connected)

export default routed
