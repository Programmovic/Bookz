import axios from "axios";

const baseURL = axios.create({
    baseURL: "https://bookz-91j9.onrender.com/"
})

export default baseURL