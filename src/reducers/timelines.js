import { ADD_TOOTS } from '../constants/toots'

const initialState = {
	home : {
		// isLoading ?
		items : []
	},
	local : {
		// isLoading ?
		items : []
	},
	federated : {
		// isLoading ?
		items : []
	}
}

function normalizeToots(timeline, state, toots) {
	const currentToots = state[timeline].items

	return {
		items : toots.map(toot => toot.id).concat(currentToots)
	}
}

/**
 * @description Update the state with the new toots.
 * The toots are normalized into ids.
 * The whole toot data is stored under the `toots` key of the store
 * @param {Object} state the current state
 * @param {Object} toots An object with items by timelines like follows:
 * { home : [], local : [], federated : []}
 */
function addTootsToTimeline(state, { home = [], local = [], federated = [] }) {
	return {
		...state,
		home : normalizeToots('home', state, home),
		local : normalizeToots('local', state, local),
		federated : normalizeToots('federated', state, federated)
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return addTootsToTimeline(state, action.toots)
		default:
			return state
	}
}
