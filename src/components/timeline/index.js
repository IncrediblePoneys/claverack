import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Toot from '../toot'

class Timeline extends PureComponent {
	render () {
		const { toots, name } = this.props

		return <div className="cl-timeline" data-name={name}>
			{toots.map((toot, index) => {
				return <Toot key={index} {...toot} />
			})}
		</div>
	}
}

Timeline.PropTypes = {
	// List of toots
	toots : PropTypes.array.isRequired,
	// Timeline name
	name : PropTypes.string.isRequired
}

export default Timeline
