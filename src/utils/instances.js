async function getIt() {
	const API = "https://instances.mastodon.xyz/instances.json"
	return fetch(API)
		.then(response => response.json())
}

export async function getInstances() {
	const instances = await getIt()

	return instances
		.slice(0, 30)
		.map(instance => `https://${instance.name}`)
}
