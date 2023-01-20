import axios from "axios";
import Globals from "../Globals";

const baseURL = Globals.API_URL;

const getResource = (path, options) => {
    console.log(`[GET] Calling API on ${baseURL}${path}`);

    return axios.get(`${baseURL}${path}`, options);
}

const postResource = (path, data) => {
    console.log(`[POST] Calling API on ${baseURL}${path} with params ${JSON.stringify(data)}`);

    return axios.post(`${baseURL}${path}`, data);
}

const putResource = (path, json) => {
    console.log(`[PUT] Calling API on ${baseURL}${path} with params ${JSON.stringify(json)}`);

    return axios.put(`${baseURL}${path}`, json);
}

const patchResource = (path, json) => {
    console.log(`[PATCH] Calling API on ${baseURL}${path} with params ${JSON.stringify(json)}`);

    return axios.patch(`${baseURL}${path}`, json);
}

const deleteResource = (path) => {
    console.log(`[DELETE] Calling API on ${baseURL}${path}`);

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
    return getResource(`/api/user/info/${userId}`, {
        validateStatus: function (status) {
            return status < 500; // If status < 500 do now go on catch
        }
    })
}

const searchUser = (searchTerm, excludedUserId) => {
    return getResource(`/rest/users/search/findUsersForFriendList?userId=${excludedUserId}&searchTerm=${searchTerm.toLowerCase()}`)
}

const getFriendsList = (userId) => {
    return getResource(`/api/user/get-friends/${userId}`)
}

const getFriendRequestsList = (userId) => {
    return getResource(`/rest/friendRelationships/search/findAllFriendRequestsByUserId?userId=${userId}`)
}

const getFriendship = (loggedUserId, friendUserId) => {
    return getResource(
        `/rest/friendRelationships/search/findFirstByUserIdAndFriendUserId?userId=${loggedUserId}&friendUserId=${friendUserId}`,
        {
            validateStatus: function (status) {
                return status < 500; // If status < 500 do now go on catch
            }
        }
    )
}


const sendFriendRequest = (loggedUserId, friendUserId) => {
    return getResource(`/api/user/sendFriendRequest/${loggedUserId}/${friendUserId}`);
}

const acceptFriendRequest = (relationshipId) => {
    const data = {
        status: 2
    }

    return patchResource(`/rest/friendRelationships/${relationshipId}`, data);
}

export {
    registerUser,
    getUserByEmail,
    getUserById,
    searchUser,
    getFriendsList,
    getFriendship,
    sendFriendRequest,
    getFriendRequestsList,
    acceptFriendRequest
};