const initialState = {
	token : localStorage.getItem('token')
}

export default (state = initialState, action) => {
	switch (action.type) {

		default:
			return state
	}
}