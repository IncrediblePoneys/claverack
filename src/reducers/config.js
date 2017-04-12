import { SET_APPKEYS } from '../constants/config'

const STORAGE_APPKEYS_KEY = 'appkeys'

const appKeys = localStorage.getItem(STORAGE_APPKEYS_KEY)

const initialState = {
	appKeys
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_APPKEYS:
			// save it
			localStorage.setItem(STORAGE_APPKEYS_KEY, action.appKeys)

			return {
				...state,
				appKeys : action.appKeys
			}
		default:
			return state
	}
}
