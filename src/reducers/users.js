import {
	SELECT,
	LOGIN
} from '../constants/users'

const initialState = {
	selected: null,
	accounts: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT:
			return {
				...state,
				selected : action.user
			}
		case LOGIN:
			let accounts = state.accounts.concat(action.user)
			return {
				...state,
				accounts,
				selected : accounts.length - 1
			}
		default:
			return state
	}
} 