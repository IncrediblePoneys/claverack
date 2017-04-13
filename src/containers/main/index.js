import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { fetchAllTheToots } from '../../utils/api'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import { addToots as addTootsAction } from '../../actions/toots'

import Timeline from '../../components/timeline'
import Styles from './styles'

class Main extends PureComponent {
	async componentDidMount () {
		const { user, addToots } = this.props

		if (user) {
			try {
				const [home, local, federated] = await fetchAllTheToots(user.oauth)
				addToots({
					home,
					local,
					federated
				})
			} catch (e) {
				console.info("Handle error properly", e)
			}
		}
	}

	render () {
		const {
			t,
			tootsHome,
			tootsLocal,
			tootsFederated
		} = this.props

		const isLoading = Boolean(tootsHome.length) === false

		if (isLoading) {
			return <div>
				{t('loading')}
			</div>
		}

		return <main style={Styles.main}>
			<Timeline name="home" toots={tootsHome} />
			<Timeline name="local" toots={tootsLocal} />
			<Timeline name="federated" toots={tootsFederated} />
		</main>
	}
}

Main.propTypes = {
	user : PropTypes.object.isRequired,
	tootsHome : PropTypes.array.isRequired,
	tootsLocal : PropTypes.array.isRequired,
	tootsFederated : PropTypes.array.isRequired,
	addToots : PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	const { selected, accounts } = state.users

	return {
		user : accounts[selected],
		tootsHome : state.timelines.home.items.map(id => state.toots[id]),
		tootsLocal : state.timelines.local.items.map(id => state.toots[id]),
		tootsFederated : state.timelines.federated.items.map(id => state.toots[id])
	}
}

const dispatchToProps = (dispatch) => {
	return {
		addToots : (toots) => {
			return dispatch(addTootsAction(toots))
		}
	}
}

const translated = translate()(Main)
const connected = connect(mapStateToProps, dispatchToProps)(translated)
const routed = withRouter(connected)

export default routed
