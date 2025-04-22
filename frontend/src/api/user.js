import { makeApiRequest } from ".";
import { processError } from "../../utils/functions";

const updateProfile = async (details) => {
    try {
        const response = await makeApiRequest.patch('users/profile/update', details, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        })
        
        return response.data
    } catch (error) {
      processError(error)   
    }
}

const fetchUserProfile = async () => {
    try {
        const response = await makeApiRequest.get('/users/profile')
        return response.data
    } catch (error) {
        processError(error)
    }
}

const getWalletInfo = async () => {
    try {
        const response = await makeApiRequest.get("/users/wallet")
        return response
    } catch (error) {
        processError(error)
    }
}

const userApi = { 
    updateProfile,
    fetchUserProfile,
    getWalletInfo
}

export default userApi