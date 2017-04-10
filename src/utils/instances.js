// Word of ⚠️
// If you are underage or don't like seeing ugly things, please don't read this file.
// thanks, ❤️

// but really though, there's no API for that right now so I decided to go the dirty way.

async function getIt () {
	// 😂
	const API = "https://instances.mastodon.xyz/"
	return fetch(API)
		.then(response => response.text())
}

	// This is where the 💩 happens
export async function getInstances() {
	// Can you see it coming?
	const node = document.createElement('div')
	// oh yeah 💃
	node.innerHTML = await getIt()
	// I just did that 😎
	const links = [...node.querySelectorAll('a')]

	// sometimes, dirty way is the good way 🍆
	return links.reduce((accumulator, link) => {
		if (!/localhost/.test(link)) {
			accumulator.push(link.href)
		}

		return accumulator
	}, [])
}
