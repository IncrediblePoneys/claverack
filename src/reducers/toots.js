import { ADD_TOOTS } from '../constants/toots'

const initialState = {}


/**
 * @description Update state with new toots
 * @param {Object} state the current state
 * @param {Object} toots An object with items by timelines like follows:
 * { home : [], local : [], federated : []}
 */
function addToots(state, { home = [], local = [], federated = [] }) {

	const toots = [...home, ...local, ...federated]
	const newState = toots.reduce((collection, toot) => {
		collection[toot.id] = toot

		return collection
	}, {})

	return {
		...state,
		...newState
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return addToots(state, action.toots)
		default:
			return state
	}
}
