import { SET_TOKEN } from '../constants/config'

export const registerApp = (token) => {
	return {
		type : SET_TOKEN,
		token
	}
}