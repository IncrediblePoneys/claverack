import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router'

import './index.css'

class Menu extends Component {

	componentDidMount() {
		const { users, history } = this.props
		if (!users.accounts) {
			history.push('/login')
		}
	}

	render () {
		const { t, currentAccount } = this.props
		return <nav className="menu">
			<img className="menu-avatar" alt={currentAccount.user.display_name} src={currentAccount.user.avatar} />
				<Link to="/main/home">
					<i className="material-icons">reorder</i>
				</Link>
				<Link to="/main/public">
					<i className="material-icons">people</i>
				</Link>
				<Link to="/main/federated">
					<i className="material-icons">public</i>
				</Link>
				<Link to="/login">
					<i className="material-icons">add_box</i>
				</Link>
		</nav>
	}
}

const mapStateToProps = (state) => {
	return {
		currentAccount: state.users.accounts[state.users.selected],
		users: state.users
	}
}

export default translate()(withRouter(connect(mapStateToProps)(Menu)))
