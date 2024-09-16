import { makeApiRequest } from "..";
import { processError } from "../../../utils/functions";


const registerUser = async (details) => {
    try {
        const response = await makeApiRequest.post('/auth/signup', details)
        return response.data
    } catch (error) {
        processError(error)
    }
}


const loginUser = async (details) => {

    try {
        const response = await makeApiRequest.post('/auth/login', details)
        return response.data
    } catch (error) {
        processError(error)
    }
}

const forgotPassword = async (email) => {

    try {
        const response = await makeApiRequest.post('/auth/forgot-password', email)
        return response.data
    } catch (error) {
        processError(error)
    }
}

const verifyOTP = async (details) => {

    try {
        const response = await makeApiRequest.post('/auth/verify-otp', details)
        return response.data
    } catch (error) {
        processError(error)
    }
}



const authApi = {
    registerUser,
    loginUser,
    forgotPassword,
    verifyOTP
}

export default authApi