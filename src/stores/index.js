import { createStore, combineReducers } from 'redux'

const reducers = combineReducers({
})


export default createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension()
)
