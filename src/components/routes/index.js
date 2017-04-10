import React from 'react'
import Home from '../../containers/home'
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
		<div className="claverack">
			<Route path="/" component={Menu} />
			<Route path="/login" component={LoginContainer} />
			<Route exact path="/" component={Home} />
			<Route path="/error" component={Error} />
		</div>
	</Router>
)
