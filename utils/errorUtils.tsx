const setUpErrorMessage = (error:string) => {
	let errorMessage = ''

	switch (error) {
		case 'Firebase: Error(auth/network-request-failed)':
			errorMessage = 'There was a problem with the network connection when trying to sign in,'
			break
		case 'Firebase: Error (auth/email-already-in-use).':
			errorMessage = 'A user with that email already exists.'
			break
		default:
			errorMessage = 'There was an error, we are sorry.'
			break
	}

	return errorMessage
}

export default setUpErrorMessage
