import { SET_APPKEYS } from '../constants/config'

export const registerApp = (appKeys) => {
	appKeys = JSON.stringify(appKeys)

	return {
		type : SET_APPKEYS,
		appKeys
	}
}