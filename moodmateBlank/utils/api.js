import axios from "axios";

const moodmateApi = axios.create({
  baseURL: "https://moodmate-api.onrender.com/api/v1",
});

const zenQuotesAPI = axios.create({
  // baseURL: "https://zenquotes.io/api/random/"
  baseURL: "https://zenquotes.io/api/today"
  // baseURL: "https://zenquotes.io/api/quotes"
})

export const getRandomZenQuote = () => {
  return zenQuotesAPI.get().then((response) => {
    const responseBody = response.data[0];
    return { quote: responseBody.q, author: responseBody.a };
  })
}

export const signupUser = (data) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    return response.data.user;
  });
};

export const loginUser = (data) => {
  return moodmateApi.post("/users/login", data).then((response) => {
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