import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Toot from '../toot'
import './styles.css'

class Tootlist extends PureComponent {
	componentWillUpdate () {
		this.scrollHeight = this.div.scrollHeight
		this.scrollTop = this.div.scrollTop
	}

	componentDidUpdate () {
		if (this.scrollTop !== 0) {
			this.div.scrollTop = this.scrollTop + (this.div.scrollHeight - this.scrollHeight)
		}
	}

	render () {
		const { toots, name } = this.props

		return <div className="tootlist">
			<h2>{name}</h2>
			<div ref={(div) => {this.div = div}} className="tootlist-toots">
				{toots.map((toot, index) => {
					return <Toot key={index} {...toot} />
				})}
			</div>
		</div>
	}
}

Tootlist.PropTypes = {
	// List of toots
	toots : PropTypes.array.isRequired,
	// Timeline name
	name : PropTypes.string.isRequired
}

export default Tootlist
