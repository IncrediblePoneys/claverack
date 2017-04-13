import { SET_APPKEYS } from '../constants/config'

export const registerApp = (appKeys, instance) => {

	return {
		type : SET_APPKEYS,
		appKeys,
		instance
	}
}