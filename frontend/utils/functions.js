export const multipleClasses = (...classNames) => classNames.join(" ");

export function processError(error) {
	let responseData = error.response?.data;
	let errorMessage = responseData?.detail ?? responseData?.data ?? error.message ?? error.data;

	const errorWithStatus = new Error(errorMessage);
	errorWithStatus.status = error.response?.status;

	throw errorWithStatus;
}

export function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
