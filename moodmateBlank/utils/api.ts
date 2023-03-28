import axios from "axios";

const emotionsApi = axios.create({
    baseURL: 'https://emotions-api-w230.onrender.com/api'
})

export const getEmotions = () => {
    return emotionsApi.get('/v1/emotions').then(({data}) => {
        console.log(data.emotions);
        return data
    })
}