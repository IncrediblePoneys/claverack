import { SET_APPKEYS, SAVE_LAYOUT } from '../constants/config'

const STORAGE_APPKEYS_KEY = 'appkeys'
const STORAGE_LAYOUT_KEY = 'layout'

const appKeys = JSON.parse(localStorage.getItem(STORAGE_APPKEYS_KEY)) || {}
const layout = JSON.parse(localStorage.getItem(STORAGE_LAYOUT_KEY)) || []

const initialState = {
	appKeys,
	layout
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
		// Main window layout
		case SAVE_LAYOUT:
			localStorage.setItem(STORAGE_LAYOUT_KEY, JSON.stringify(action.layout))
			return {
				...state,
				layout
			}

		default:
			return state
	}
}
