import {
	SELECT,
	LOGIN
} from '../constants/users'

const USERS_KEY = 'users'

const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {}

const initialState = {
	selected: users.selected === undefined ? null : users.selected,
	accounts: users.accounts || []
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

			const newState = {
				...state,
				accounts,
				selected : accounts.length - 1
			}

			localStorage.setItem(USERS_KEY, JSON.stringify({
				accounts : newState.accounts,
				selected : newState.selected
			}))

			return newState
		default:
			return state
	}
} 