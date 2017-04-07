import { createStore, combineReducers } from 'redux'
import users from '../reducers/users'
import config from '../reducers/config'

const reducers = combineReducers({
	users,
	config
})

export default createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension()
)
