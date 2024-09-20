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

const getArtisanJobs = async () => {
    try {
        const response = await makeApiRequest.get("/artisans/jobs")
        return response.data
    } catch (error) {
        processError(error)
    } 
}

const requestArtisanService = async (data) => {
    try {
        const response = await makeApiRequest.post(`/artisans/request-service/${data.id}`, {
            service_type: data.service_type,
            price_offer: data.price_offer,
            description: data.description
        })
        return response.data
    } catch (error) {
        processError(error)
    } 
}


const filterArtisans = async (data) => {
    try {
        const response = await makeApiRequest.get("/artisans/filter", {
            params: {
                artisan_rating: data.artisan_rating,
                location: data.location,
                proximity: data.proximity,
                limit: data.limit,
            }
        })
        return response.data

    } catch (error) {
        processError(error)
    } 
}

const rateArtisan = async (data) => {
    try {
        const response = await makeApiRequest.get(`/artisans/review/${data.id}`, {
            rating: data.rating,
            comment: data.comment
        })
        return response.data

    } catch (error) {
        processError(error)
    } 
}

const artisanApi = {
    recommendArtisans,
    getArtisanProfile,
    getArtisanJobs,
    requestArtisanService,
    filterArtisans,
    rateArtisan
}

export default artisanApi