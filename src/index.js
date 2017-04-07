import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'

import i18n from './utils/i18n'
import Store from './stores'
import { Provider } from "react-redux"
import './index.css'

import App from './containers/app'

ReactDOM.render(
	<Provider store={Store}>
		<I18nextProvider i18n={i18n}>
			<App />
		</I18nextProvider>
	</Provider>,
	document.getElementById('root')
)