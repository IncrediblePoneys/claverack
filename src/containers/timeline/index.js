import React, { Component } from 'react'
import { connect } from 'react-redux'

import { timeline } from '../../utils/api'
import Tootlist from '../../components/tootlist'
import { addToots as addTootsAction } from '../../actions/timeline'

class Timeline extends Component {
	async componentDidMount() {
		const { account, addToots } = this.props
		addToots(await timeline(account.oauth), account.user.url)
	}

	render () {
		return <div>
			<Tootlist toots={this.props.toots} />
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	const accountUrl = decodeURIComponent(ownProps.match.params.accountUrl)
	return {
		account: state.users.accounts[accountUrl],
		toots: state.timeline[accountUrl] || []
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToots : (toots, accountUrl) => {
			return dispatch(addTootsAction(toots, accountUrl))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)