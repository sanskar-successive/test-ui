// import { callApiService } from "../../dataSource/apiService"

// export const UserService = {



//     userRegister: (data) => {
//         return callApiService.post("http://localhost:5000/users", data, { "Content-Type": "application/json" })
//     },


//     getAllUsers: (query) => {
//         return callApiService.get("http://localhost:5000/users");
//     },

//     getUserAccount: () => {
//         return callApiService.get("http://localhost:5000/users/account/home")
//     },

//     getUserDetails: (id) => {
//         return callApiService.get(`http://localhost:5000/users/${id}`)
//     },

//     updateUserDetails: (id, data) => {
//         return callApiService.patch(`http://localhost:5000/users/${id}`, data);
//     },

//     deleteUser: (id) => {
//         return callApiService.delete(`http://localhost:5000/users/${id}`);
//     },

//     userLogin: (data) => {
//         return callApiService.post("http://localhost:5000/users/login", data, { "Content-Type": "application/json" })
//     },


// }


import { callApiService } from "../../dataSource/apiService"
import { SERVER_BASE_URL } from "../../lib/config/config";

export const UserService = {


    userLogin: (data) => {
        return callApiService.post(`${SERVER_BASE_URL}/users/login`, data, { "Content-Type": "application/json" })
    },

    userRegister: (data) => {
        return callApiService.post(`${SERVER_BASE_URL}/users`, data, { "Content-Type": "application/json" })
    },

    getAllUsers: (query) => {
        // return callApiService.get("${SERVER_BASE_URL}/users");
        return callApiService.get(`${SERVER_BASE_URL}/users/search${query}`);
    },

    getUserAccount : ()=>{
        return callApiService.get(`${SERVER_BASE_URL}/users/account/home`)
    },

    getUserDetails: (id) => {
        return callApiService.get(`${SERVER_BASE_URL}/users/${id}`)
    },

    updateUserDetails: (id, data) => {
        return callApiService.patch(`${SERVER_BASE_URL}/users/${id}`, data);
    },

    deleteUser: (id) => {
        return callApiService.delete(`${SERVER_BASE_URL}/users/${id}`);
    }

}