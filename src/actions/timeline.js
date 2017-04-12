import { ADD_TOOTS } from '../constants/timeline'

export function addToots (toots) {
	return {
		type : ADD_TOOTS,
		toots
	}
}
