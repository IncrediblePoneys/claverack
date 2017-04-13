import React from 'react'
import Main from '../../containers/main'
import LoginContainer from '../../containers/login'
import Menu from '../menu'

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'

const Error = () => {
	return <div>
		Woupsy woups
	</div>
}

export default () => (
	<Router>
		<section>
			<Menu />
			<Route exact path="/" component={Main} />
			<Route path="/login" component={LoginContainer} />
			<Route path="/error" component={Error} />
		</section>
	</Router>
)
