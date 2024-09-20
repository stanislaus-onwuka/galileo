import { makeApiRequest } from ".";
import { processError } from "../../utils/functions";


const getAllCustomers = async () => {
    try {
        const response = await makeApiRequest.get("/admins/customers")
        return response.data

    } catch (error) {
        processError(error)
    }
}

const getAllArtisans = async () => {
    try {
        const response = await makeApiRequest.get("/admins/artisans")
        return response.data

    } catch (error) {
        processError(error)
    }
}

const getAllSuppliers = async () => {
    try {
        const response = await makeApiRequest.get("/admins/suppliers")
        return response.data

    } catch (error) {
        processError(error)
    }
}

const updateArtisanProfile = async (data) => {
    try {
        const response = await makeApiRequest.patch(`/admins/artisans/${data.id}`, data.body)
        return response.data

    } catch (error) {
        processError(error)
    }
}

// getServiceRequests

const getPendingServiceRequests = async () => {
    try {
        const response = await makeApiRequest.get("/admins/requests/pending")
        return response.data

    } catch (error) {
        processError(error)
    }
}

const respondToServiceRequest = async (data) => {
    try {
        const response = await makeApiRequest.patch(`/admins/requests/${data.id}/respond`, {
            action: data.action,
            reason: data.reason
        })
        return response.data

    } catch (error) {
        processError(error)
    }
}



const adminApi = {
    getAllCustomers,
    getAllArtisans,
    getAllSuppliers,
    updateArtisanProfile,
    getPendingServiceRequests,
    respondToServiceRequest
}

export default adminApi