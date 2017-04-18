import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { avatarUrl } from '../../utils/parser'
import './styles.css'

class Toot extends Component {
	render() {
		const { account, reblog, content, created_at } = this.props
		const tootContent = (reblog && reblog.content) || content

		const avatar = avatarUrl(account)

		return <section className="toot">
			<div className="toot-avatar">
				<img src={avatar} alt={account.acct} /> 
			</div>

			<div>
				<div className="toot-information">
					<a href="#" className="toot-author">{account.acct}</a> 
					<span className="toot-date">{created_at}</span>
				</div>
				<div className="toot-content" dangerouslySetInnerHTML={{ __html: tootContent }}></div>
			</div>
		</section>
	}
}

const toot = {
	id: PropTypes.number.isRequired,
	account: PropTypes.object,
	content: PropTypes.string,
	visibility: PropTypes.string,
	application: PropTypes.object,
	spoiler_text: PropTypes.string.isRequired,
	created_at: PropTypes.string.isRequired
}

Toot.propTypes = {
	...toot,
	reblog: PropTypes.shape(toot),
}

export default Toot
