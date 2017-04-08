import React from 'react'
import Home from '../../containers/home'
import LoginContainer from '../../containers/login'
import Menu from '../menu'

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'

export default () => (
	<Router>
		<section>
			<Menu />
			<main>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={LoginContainer} />
			</main>
		</section>
	</Router>
)
