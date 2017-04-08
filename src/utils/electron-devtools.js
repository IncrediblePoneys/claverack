const ElectronDevtoolsInstaller = require('electron-devtools-installer')
const installExtension = ElectronDevtoolsInstaller.default
const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = ElectronDevtoolsInstaller

const promises = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map(tool => {
	return installExtension(tool)
})

module.exports = Promise.all(promises)
	.then((names) => {
		names.forEach(name => {
			console.log(`Installed extension ${name}`)
		})
	})
	.catch((err) => console.log('An error occurred: ', err))