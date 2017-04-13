import { ADD_TOOTS } from '../constants/toots'

export function addToots (toots, timeline) {
	return {
		type : ADD_TOOTS,
		toots,
		timeline
	}
}