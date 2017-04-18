import { ADD_TOOTS } from '../constants/toots'

const initialState = {}

function normalizeToots(newtoots, oldToots) {
	return newtoots.map(toot => toot.id).concat(oldToots)
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
	const accounTimelines = state[accountUrl] || {}
	return {
		...state,
		[accountUrl]: {
			...accounTimelines,
			[timeline]: normalizeToots(toots, accounTimelines[timeline] || [])
		}
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return addTootsToTimeline(state, action.toots, action.timeline, action.accountUrl)
		default:
			return state
	}
}
