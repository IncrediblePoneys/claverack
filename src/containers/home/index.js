import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import {
	timeline
} from '../../utils/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Toot from '../../components/toot'

class Home extends Component {
	constructor (props) {
		super(props)
		this.state = {
			loading: true,
			timeline : null
		}
	}

	async componentDidMount() {
		const { user } = this.props

		if (user) {
			try {
				const toots = await timeline(user.oauth)
				this.setState(() => {
					return {
						loading: false,
						timeline: toots
					}
				})
			} catch (e) {
				console.info("Handle error properly", e)
			}
		}
	}

	render() {
		const { t } = this.props
		const { loading, timeline } = this.state

		if (loading) {
			return <div>
				{t('loading')}
			</div>
		}

		return <div>
			{timeline.map((toot, index) => {
				return <Toot {...toot} key={index} />
			})}
		</div>
	}
}

Home.propTypes = {
	user : PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	const { selected, accounts } = state.users

	return {
		user : accounts[selected]
	}
}

const translated = translate()(Home)
const connected = connect(mapStateToProps)(translated)
const routed = withRouter(connected)

export default routed
