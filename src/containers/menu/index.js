import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router'

class Menu extends Component {

	componentDidMount() {
		const { users, history } = this.props
		if (!users.accounts) {
			history.push('/login')
		}
	}

	render () {
		const { t, users } = this.props

		let usersLinks = []
		for(let url in users.accounts) {
			let user = users.accounts[url].user
			usersLinks.push(
				<li key={url}>
					<Link to="/">
						<img width="40" height="40" alt={url} src={user.avatar} />
					</Link>
				</li>
			);
		}

		return <nav>
			<ul>
				{usersLinks}
				<li>
					<Link to="/login">
						{t('login')}
					</Link>
				</li>
			</ul>
		</nav>
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

export default translate()(withRouter(connect(mapStateToProps)(Menu)))
