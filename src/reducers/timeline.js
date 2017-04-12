import { ADD_TOOTS } from '../constants/timeline'

const initialState = []

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TOOTS:
			return action.toots.concat(state)
		default:
			return state
	}
}
