import { makeApiRequest } from ".";
import { processError } from "../../utils/functions";

const updateProfile = async (details) => {
    try {
        const response = await makeApiRequest.patch('users/profile/update', details)
        return response.data
    } catch (error) {
      processError(error)   
    }
}

const userApi = { 
    updateProfile
}

export default userApi