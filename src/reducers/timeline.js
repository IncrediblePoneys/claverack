import { ADD_TOOTS } from '../constants/timeline'

const initialState = {}

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return {
				...state,
				[action.accountUrl]: action.toots.concat(state[action.accountUrl] || [])
			}
		default:
			return state
	}
}
