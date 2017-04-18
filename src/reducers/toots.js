import { ADD_TOOTS } from '../constants/toots'
import { accountUrlToInstanceUrl } from '../utils/parser'

const initialState = {}

/**
 * @description Update state with new toots
 * @param {Object} state the current state
 * @param {Array} toots An array with the toots
 * @param {String} instanceUrl	The instance url toots are from (eg: https://mastodon.social)
 */
function addToots(state, toots, instanceUrl) {
	toots = toots.map(toot => [toot.id, toot])
	const merged = new Map(...state[instanceUrl] || [], toots)
	return {
		...state,
		[instanceUrl]: merged
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return addToots(state, action.toots, accountUrlToInstanceUrl(action.accountUrl))
		default:
			return state
	}
}
