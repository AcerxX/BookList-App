import axios from "axios";
import Globals from "../Globals";

const baseURL = Globals.API_URL;

const getResource = (path, options) => {
    return axios.get(`${baseURL}${path}`, options);
}

const postResource = (path, data) => {
    return axios.post(`${baseURL}${path}`, data);
}

const putResource = (path, json) => {
    return axios.put(`${baseURL}${path}`, json);
}

const patchResource = (path, json) => {
    return axios.patch(`${baseURL}${path}`, json);
}

const deleteResource = (path) => {
    return axios.delete(`${baseURL}${path}`);
}

const registerUser = (nickname, email, passwordHash) => {
    return postResource(
        '/rest/users',
        {
            nickname: nickname,
            email: email,
            password: passwordHash,
            status: true
        }
    )
}

const getUserByEmail = (email) => {
    return getResource(`/rest/users/search/findByEmail?email=${encodeURIComponent(email)}`, {
        validateStatus: function (status) {
            return status < 500; // If status < 500 do now go on catch
        }
    })
}

const getUserById = (userId) => {
    return getResource(`/rest/users/${userId}`, {
        validateStatus: function (status) {
            return status < 500; // If status < 500 do now go on catch
        }
    })
}

const searchUser = (searchTerm, excludedUserId) => {
    return getResource(`/rest/users/search/findUsersForFriendList?userId=${excludedUserId}&searchTerm=${searchTerm.toLowerCase()}`)
}

const getFriendsList = (userId) => {
    return getResource(`/rest/friendRelationships/search/findAllFriendsByUserId?userId=${userId}`)
}

export {
    registerUser,
    getUserByEmail,
    getUserById,
    searchUser,
    getFriendsList
};