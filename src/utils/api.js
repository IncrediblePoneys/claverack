// Documentation : https://github.com/tootsuite/mastodon/blob/master/docs/Using-the-API/Testing-with-cURL.md

// This has to be a param
const INSTANCE = 'https://mastodon.social'

export function registerApp () {
	const endpoint = 'api/v1/apps'
	const payload = new FormData()
	payload.append('client_name', 'Claverack')
	payload.append('redirect_uris', 'urn:ietf:wg:oauth:2.0:oob')
	payload.append('scopes', 'read write follow')
	payload.append('website', 'https://github.com/IncrediblePoneys/claverack')

	return fetch(`${INSTANCE}/${endpoint}`, {
		method : 'POST',
		body : payload
	})
		.then(response => response.json())
}

export function login (payload) {
	const endpoint = 'oauth/token'
	const instance = payload.get('instance')

	return fetch(`${instance}/${endpoint}`, {
		method : 'POST',
		body : payload
	})
		.then(response => response.json())
}

export function timeline(user) {
	const endpoint = 'api/v1/timelines/home'

	const headers = new Headers()
	headers.append('Authorization', `Bearer ${user.access_token}`)

	return fetch(`${INSTANCE}/${endpoint}`, {
		method : 'GET',
		headers
	})
		.then(response => response.json())
}