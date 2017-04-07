import {
	SELECT_USER
} from '../constants/users'

export function selectUser(user) {
	return {
		type: SELECT_USER,
		user
	}
}