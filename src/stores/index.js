import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import users from '../reducers/users'
import config from '../reducers/config'

const reducers = combineReducers({
	users,
	config
})

export default createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension(),
	applyMiddleware(logger)
)
