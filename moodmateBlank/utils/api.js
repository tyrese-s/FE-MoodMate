import axios from "axios";
import { AuthContext } from "../contexts/User";
// BASE URLS
const moodmateApi = axios.create({
  baseURL: "https://moodmate-api.onrender.com/api/v1",
});

const zenQuotesAPI = axios.create({
  // baseURL: "https://zenquotes.io/api/random/"
  baseURL: "https://zenquotes.io/api/today",
  // baseURL: "https://zenquotes.io/api/quotes"
});

const emotionsApi = axios.create({
  baseURL: "https://emotions-api-w230.onrender.com/api",
});

// ZEN QUOTES
export const getRandomZenQuote = () => {
  return zenQuotesAPI.get().then((response) => {
    const responseBody = response.data[0];
    return { quote: responseBody.q, author: responseBody.a };
  });
};

// EMOTIONS API
export const getEmotions = () => {
  return emotionsApi.get("/v1/emotions").then(({ data }) => {
    return data.emotions;
  });
};

export const getSingleEmotion = (emotion) => {
  return emotionsApi.get(`/v1/emotions/${emotion}`).then(({ data }) => {
    return data.emotion;
  });
};

// GOOGLE VISION API
export const getGoogleVisionURL = () => {
  return moodmateApi.get("/api-url").then((response) => {
    const url = response.data.data.apiURL.substring(
      response.data.data.apiURL.indexOf("=") + 1
    );
    return url;
  });
};

// BACKEND API

export const signupUser = (data) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    return response.data;
  });
};

export const loginUser = (data) => {
  return moodmateApi.post("/users/login", data).then((response) => {
    console.log(AuthContext);
    return response.data;
  });
};

export const saveQuote = (quoteData, userToken) => {
  console.log(AuthContext);
  return moodmateApi.post("/quotes/addQuote", quoteData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
