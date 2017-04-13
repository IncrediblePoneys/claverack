import { ADD_TOOTS } from '../constants/timeline'

export function addToots (toots, accountUrl) {
	return {
		type : ADD_TOOTS,
		toots,
		accountUrl
	}
}
