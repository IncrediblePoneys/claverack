// Documentation : https://github.com/tootsuite/mastodon/blob/master/docs/Using-the-API/Testing-with-cURL.md

// This has to be a param
const INSTANCE = 'https://mastodon.social'

const authenticatedCall = async (method, endpoint, instance, oauth, body = new FormData()) => {
	const headers = new Headers()
	headers.append('Authorization', `Bearer ${oauth.access_token}`)

	const params = {
		method,
		headers
	}

	if (method === 'POST') {
		params.body = body
	}

	return fetch(`${instance}/${endpoint}`, params)
		.then(response => response.json())
		.then(response => {
			if (response.error) {
				throw new Error(response.error)
			}

			return response
		})
}

const setupPOST = async (endpoint, instance, body = new FormData()) => {
	return fetch(`${INSTANCE}/${endpoint}`, {
		method : 'POST',
		body
	})
		.then(response => response.json())
}

const GET = authenticatedCall.bind(null, 'GET')
// const POST = authenticatedCall.bind(null, 'POST')

export async function registerApp (instance = INSTANCE) {
	const endpoint = 'api/v1/apps'
	const payload = new FormData()
	payload.append('client_name', 'Claverack')
	payload.append('redirect_uris', 'urn:ietf:wg:oauth:2.0:oob')
	payload.append('scopes', 'read write follow')
	payload.append('website', 'https://github.com/IncrediblePoneys/claverack')

	return await setupPOST(
		endpoint,
		instance,
		payload
	)
}

export async function login (payload, { client_id, client_secret }) {
	const endpoint = 'oauth/token'
	const instance = payload.get('instance')

	payload.append('client_id', client_id)
	payload.append('client_secret', client_secret)
	payload.append('grant_type', 'password')

	return await setupPOST(
		endpoint,
		instance,
		payload
	)
}

export async function verify (user, instance = INSTANCE) {
	return await GET(
		'api/v1/accounts/verify_credentials',
		instance,
		user.oauth
	)
}

export async function timeline(user, instance = INSTANCE) {
	return await GET(
		'api/v1/timelines/home',
		instance,
		user.oauth
	)
}
