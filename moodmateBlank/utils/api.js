import axios from "axios";

const moodmateApi = axios.create({
  baseURL: "https://moodmate-api.onrender.com/api/v1",
});

export const signupUser = (data) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    return response.data.user;
  });
};

 const emotionsApi = axios.create({
  baseURL: 'https://emotions-api-w230.onrender.com/api'
})

export const getEmotions = () => {
  return emotionsApi.get('/v1/emotions').then(({data}) => {
      return data.emotions
  })
}

export const getSingleEmotion = (emotion) => {
  return emotionsApi.get(`/v1/emotions/${emotion}`).then(({data}) => {
    return data.emotion 
})
}