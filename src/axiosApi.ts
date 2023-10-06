import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://js-course-2b554-default-rtdb.europe-west1.firebasedatabase.app/',
});

export  default axiosApi;