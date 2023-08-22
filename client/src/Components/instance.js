import axios from "axios";

const instance = axios.create({
    baseURL: "https://bookz-91j9.onrender.com/"
})

export default instance