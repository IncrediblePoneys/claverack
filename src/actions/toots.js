import { ADD_TOOTS } from '../constants/toots'

export function addToots (toots, timeline, accountUrl) {
	return {
		type : ADD_TOOTS,
		toots,
		timeline,
    accountUrl
	}
}