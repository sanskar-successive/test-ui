import axios from "./axiosConfig";
// export const callApiService = async (method, url) => {

//     if (method === 'GET') {
// const response = await axios({
//     method: method,
//     url: url,
// })

// return response;
//     }
//     if(method === 'POST'){


//     }



//     return response;

// }

export const callApiService = {

    get: async (url) => {
        const response = await axios({
            method: 'GET',
            url: url,
        })

        return response;
    },


    post: async (url, data, headers) => {
        const response = await axios({
            method: 'POST',
            url: url,
            data: data,
            headers : headers
        })

        return response;
    },


    patch: async (url, data) => {
        const response = await axios({
            method: 'PATCH',
            url: url,
            data: data
        })

        return response;
    },

    delete : async(url)=>{
        const response = await axios({
            method : 'DELETE',
            url : url
        })

        return response;
    }

}


