import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import {
	timeline
} from '../../utils/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Toot from '../../components/toot'

import { addToots as addTootsAction } from '../../actions/timeline'

class Home extends Component {
	async componentDidMount() {
		const { user, addToots } = this.props

		if (user) {
			try {
				addToots(await timeline(user.oauth))
			} catch (e) {
				console.info("Handle error properly", e)
			}
		}
	}

	render() {
		const { t, toots } = this.props
		const isLoading = Boolean(toots.length) === false

		if (isLoading) {
			return <div>
				{t('loading')}
			</div>
		}

		return <div>
			{toots.map((toot, index) => {
				return <Toot {...toot} key={index} />
			})}
		</div>
	}
}

Home.propTypes = {
	user : PropTypes.object.isRequired,
	toots : PropTypes.array.isRequired,
	addToots : PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	const { selected, accounts } = state.users

	return {
		user : accounts[selected],
		toots : state.timeline
	}
}

const dispatchToProps = (dispatch) => {
	return {
		addToots : (toots) => {
			return dispatch(addTootsAction(toots))
		}
	}
}

const translated = translate()(Home)
const connected = connect(mapStateToProps, dispatchToProps)(translated)
const routed = withRouter(connected)

export default routed
