import { createStore, combineReducers } from 'redux'
import users from '../reducers/users'
import config from '../reducers/config'
import timeline from '../reducers/timeline'

const reducers = combineReducers({
	users,
	config,
	timeline
})

export default createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension()
)
