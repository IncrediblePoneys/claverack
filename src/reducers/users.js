import {
	SELECT,
	LOGIN
} from '../constants/users'

const USERS_KEY = 'users'

const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {}

const initialState = {
	selected: users.selected === undefined ? null : users.selected,
	accounts: users.accounts || {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SELECT:
			return {
				...state,
				selected : action.user
			}
		case LOGIN:
			// Receives user, oauth
			if (state.accounts[action.user.url]) {
				return {
					...state,
					selected : action.user.url
				}
			}

			const newState = {
				...state,
				accounts: {
					...state.accounts,
					[action.user.url]: {
						user: action.user,
						oauth: action.oauth
					}, },
				selected : action.user.url
			}

			localStorage.setItem(USERS_KEY, JSON.stringify(newState))

			return newState
		default:
			return state
	}
} 