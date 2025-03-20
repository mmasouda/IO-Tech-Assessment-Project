import axios from "axios";

export const axiosReq = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});
