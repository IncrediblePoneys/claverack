import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from '../../containers/login'
import Menu from '../../containers/menu'
import Timeline from '../../containers/timeline'

const Error = () => {
	return <div>
		Woupsy woups
	</div>
}

export default () => (
	<BrowserRouter>
		<div className="claverack">
			<Menu />
			<Route path="/login" component={Login} />
			<Route path="/error" component={Error} />
			<Route path="/timeline/:accountUrl" component={Timeline} />
		</div>
	</BrowserRouter>
)
