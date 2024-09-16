export const multipleClasses = (...classNames) => classNames.join(" ");

export function processError(error) {
    let responseData = error.response?.data;
    let errorMessage = responseData?.detail ?? responseData?.data ?? error.message ?? error.data;

    const errorWithStatus = new Error(errorMessage);
    errorWithStatus.status = error.response?.status;

    throw errorWithStatus;
}
