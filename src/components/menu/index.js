import React from 'react'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'

const Menu = (props) => {
	const { t } = props

	return <nav>
		<ul>
			<li>
				<Link to="/">
					{t('home')}
				</Link>
			</li>
			<li>
				<Link to="/login">
					{t('login')}
				</Link>
			</li>
		</ul>
	</nav>
}

export default translate()(Menu)