import { callApiService } from "../../dataSource/apiService"
import { SERVER_BASE_URL } from "../../lib/config/config";

export const BookService = {

    getBooksForHomePage: (query) => {

        console.log("query", query);
        return callApiService.get(`${SERVER_BASE_URL}/api/search${query}`)

    },

    getBookDetails: (id) => {

        return callApiService.get(`${SERVER_BASE_URL}/api/books/${id}`)

    },

    createBook: (data) => {

        return callApiService.post(`${SERVER_BASE_URL}/api/books`, data, { "Content-Type": "application/json" })

    },

    updateBook: (id, data) => {
        return callApiService.patch(`${SERVER_BASE_URL}/api/books/${id}`, data)
    },

    deleteBook: (id) => {
        return callApiService.delete(`${SERVER_BASE_URL}/api/books/${id}`)
    },

    uploadCsvFile: (formData) => {
        return callApiService.post(`${SERVER_BASE_URL}/api/bulk-upload`, formData, { "Content-Type": "multipart/form-data" })
    },

    getCSVUploads: (query) => {

        return callApiService.get(`${SERVER_BASE_URL}/api/bulk-uploads-list${query}`)

    },

    getCSVUploadErrors: (id) => {

        return callApiService.get(`${SERVER_BASE_URL}/api/bulk-uploads-errors/${id}`)

    },

    userLogin: (data) => {
        return callApiService.post(`${SERVER_BASE_URL}/users/login`, data, { "Content-Type": "application/json" })
    }

}

// https://www.flipkart.com/account/login?ret=/