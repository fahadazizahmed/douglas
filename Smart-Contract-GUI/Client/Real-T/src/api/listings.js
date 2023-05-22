const axios = require('axios');

export const getListings = () => {
    return axios.get(`/listing`, { withCredentials: true });
}

export const getListingsByUser = () => {
    return axios.get(`/listing/listByUser/getAll`, { withCredentials: true });
}
export const payRent = (data) => {
    return axios.post(`/listing/user/payRent`, data, { withCredentials: true });
}
export const updateRent = (data) => {
    return axios.post(`/listing/user/updateRent`, data, { withCredentials: true });
}

export const getMyListings = () => {
    const id = localStorage.getItem('id');
    return axios.get(`/listing/user/${id}`, { withCredentials: true });
}

export const getUserListings = (username) => {
    return axios.get(`/listing/personal/${username}`, { withCredentials: true });
}

export const addListing = (data) => {
    return axios.post(`/listing`, data, { withCredentials: true });
}
export const editListing = (data) => {
    return axios.post(`/edit-listing`, data, { withCredentials: true });
}
export const getUserForUpdate = (id) => {
   
    return axios.get(`/listing/edit/${id}`, { withCredentials: true });
}


export const updateListing = (itemId, data) => {
    return axios.patch(`/listing/${itemId}`, data, { withCredentials: true });
}

export const getListingDetails = (itemId) => {
    return axios.get(`/listing/${itemId}`, { withCredentials: true });
}

export const deleteListing = (itemId) => {
    return axios.delete(`/listing/${itemId}`, { withCredentials: true });
}


export const addPdf = (data) => {
    return axios.post(`/listing/save-pdf`, data, { withCredentials: true }, { 'Content-Type': 'multipart/form-data' });
}

export const getListByID = () => {
    const id = localStorage.getItem('id');
    return axios.get(`/listing/myList/${id}`, { withCredentials: true });
}



