import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import {
	timeline
} from '../../utils/api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

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
				const timeline = await timeline(user)
			} catch (e) {
				console.info("Handle error properly")
			}

			timeline(user)
				.then(timeline => {
					this.setState(() => {
						return {
							loading : false,
							timeline
						}
					})
				})
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
				const content = (toot.reblog && toot.reblog.content) || toot.content

				return <div key={index}>
					<div>
						{toot.account.acct}
					</div>
					<div dangerouslySetInnerHTML={{ __html : content}}>
					</div>
					<hr/>
				</div>
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
