import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { avatarUrl } from '../../utils/parser'
import './styles.css'

class Toot extends Component {
	handleTootClick (e) {
		const { shell } = window.require('electron')

		e.preventDefault()
		const target = e.target
		const parentElement = e.target.parentElement
		// This is ugly as hell
		// And maybe overprotective but well ... damn you weird format
		const isTootLink = target.tagName === 'SPAN'
			&& (target.classList.value === 'ellipsis' || target.classList.value === 'invisible')
			&& parentElement.tagName === 'A'

		if (isTootLink) {
			shell.openExternal(parentElement.href)
		}
	}

	render() {
		const { t } = this.props
		const isReblog = this.props.reblog && this.props.reblog.content
		const toot = isReblog ? this.props.reblog : this.props
		const avatar = avatarUrl(toot.account)

		return <section className="toot">
			<div className="toot-avatar">
				<img src={avatar} alt={toot.account.acct} />
			</div>

			<div>
				<div className="toot-information">
					{isReblog &&
						<div className="toot-reblogger">
							<a href="#">{this.props.account.acct}</a>
							<span> {t('reblogged')}</span>
						</div>
					}
					<a href="#" className="toot-author">{toot.account.acct}</a>
					<span className="toot-date">{toot.created_at}</span>
				</div>
				<div onClick={this.handleTootClick} className="toot-content" dangerouslySetInnerHTML={{ __html: toot.content }}></div>
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

export default translate()(Toot)
