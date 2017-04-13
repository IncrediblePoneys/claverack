import { SET_APPKEYS } from '../constants/config'

const STORAGE_APPKEYS_KEY = 'appkeys'

const appKeys = JSON.parse(localStorage.getItem(STORAGE_APPKEYS_KEY)) || {}

const initialState = {
	appKeys
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_APPKEYS:
			const concat = {
				...state.appKeys,
				[action.instance]: action.appKeys
			}
			// save it
			localStorage.setItem(STORAGE_APPKEYS_KEY, JSON.stringify(concat))

			return {
				...state,
				appKeys: concat
			}
		default:
			return state
	}
}
