// reuse back from previous path function
export const goBack = () => {
	const back = () => {
		window.history.back()
	}
	return {
		back,
	}
}
