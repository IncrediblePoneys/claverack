import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Toot extends Component {
	render() {
		const { account, reblog, content } = this.props
		const tootContent = (reblog && reblog.content) || content

		return <section className="cl-toot">
			<p className="cl-toot__user">
				{account.acct}
			</p>
			<div dangerouslySetInnerHTML={{ __html: tootContent }}>
			</div>
		</section>
	}
}

const toot = {
	id : PropTypes.number.isRequired,
	account : PropTypes.object,
	content : PropTypes.string,
	visibility : PropTypes.string,
	application : PropTypes.object,
	spoiler_text : PropTypes.string.isRequired
}

Toot.propTypes = {
	...toot,
	reblog : PropTypes.shape(toot),
}

export default Toot
