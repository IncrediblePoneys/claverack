import { SET_TOKEN } from '../constants/config'

const STORAGE_TOKEN_KEY = 'token'

const token = localStorage.getItem(STORAGE_TOKEN_KEY)

const initialState = {
	token,
	isRegistered : Boolean(token !== null)
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TOKEN:
			localStorage.setItem(STORAGE_TOKEN_KEY, action.token)

			return {
				...state,
				token : action.token,
				isRegistered : true
			}
		default:
			return state
	}
}