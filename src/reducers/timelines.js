import { ADD_TOOTS } from '../constants/toots'

const initialState = {}

function normalizeToots(newtoots, oldToots) {
	// TODO / FIXME this is ugly.
	return [...new Set(newtoots.map(toot => toot.id).concat(oldToots))]
}

/**
 * @description Update the state with the new toots.
 * The toots are normalized into ids.
 * The whole toot data is stored under the `toots` key of the store
 * @param {Object} state the current state
 * @param {Array} toots An array with the toots
 * @param {String} timeline The type of timeline we're dealing with (home/local/federated)
 * @param {String} accountUrl	The account we're using
 */
function addTootsToTimeline(state, toots, timeline, accountUrl) {
	const oldTimelines = state[accountUrl] || {}
	const newTimelines = Object.assign(
		{},
		oldTimelines,
		{[timeline]: normalizeToots(toots, oldTimelines[timeline] || [])}
	)
	return Object.assign({}, state, {[accountUrl]: newTimelines})
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return addTootsToTimeline(state, action.toots, action.timeline, action.accountUrl)
		default:
			return state
	}
}
