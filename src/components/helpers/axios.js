import Axios from "axios"


export const axiosDb = Axios.create({
    // local
    baseURL: `http://localhost:8000/api/`
})