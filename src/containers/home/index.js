import React, { Component } from 'react'
import { translate } from 'react-i18next'

class Home extends Component {
	render() {
		const { t } = this.props

		return <div>
            {t('welcome')}
		</div>
	}
}

export default translate()(Home)
