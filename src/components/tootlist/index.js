import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Toot from '../toot'

class Tootlist extends Component {
	render() {
		const { toots } = this.props

		return <div>
			{toots.map((toot, index) => {
				return <Toot {...toot} key={index} />
			})}
		</div>
	}
}

Tootlist.propTypes = {
	toots: PropTypes.array.isRequired
}

export default Tootlist
