import { makeApiRequest } from ".";
import { processError } from "../../utils/functions";

const recommendArtisans = async (data) => {
    try {
        const response = await makeApiRequest.get("/artisans/recommend", {
            params: {
                limit: data.limit,
                max_distance: data.max_distance
            }
        })
        return response.data

    } catch (error) {
        processError(error)
    } 
} 

const getArtisanProfile = async (id) => {
    try {
        const response = await makeApiRequest.get(`/artisans/profile/${id}`)
        return response.data
    } catch (error) {
        processError(error)
    }
}


const artisanApi = {
    recommendArtisans,
    getArtisanProfile
}

export default artisanApi