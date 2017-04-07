import React from 'react'
import ReactDOM from 'react-dom'
import Store from './stores'
import { Provider } from "react-redux"

import './index.css'

import App from './containers/app'

ReactDOM.render(
	<Provider store={Store}>
		<App />
	</Provider>,
	document.getElementById('root')
)