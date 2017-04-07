import {
	SELECT_USER
} from '../constants/users'

const initialState = {
	selected: null,
	accounts: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT_USER:
			return {
				...state,
				selected : action.user
			}
		default:
			return state
	}
} 