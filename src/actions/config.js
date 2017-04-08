import { SET_TOKEN } from '../constants/config'

export const registerApp = (token) => {
	token = JSON.stringify(token)

	return {
		type : SET_TOKEN,
		token
	}
}