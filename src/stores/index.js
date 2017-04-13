import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import users from '../reducers/users'
import config from '../reducers/config'
import timelines from '../reducers/timelines'
import toots from '../reducers/toots'

const reducers = combineReducers({
	users,
	config,
	timelines,
	toots
})

export default createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension(),
	applyMiddleware(logger)
)
