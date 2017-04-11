import {
	SELECT,
	LOGIN
} from '../constants/users'

export function selectUser(user) {
	return {
		type: SELECT,
		user
	}
}

export function login({ user, oauth }) {
	return {
		type : LOGIN,
		user,
		oauth
	}
}