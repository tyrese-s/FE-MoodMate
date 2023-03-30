import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// BACKEND API
export const signupUser = (data) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    const {
      token,
      data: { user },
    } = response.data;

    AsyncStorage.setItem("userToken", token);
    AsyncStorage.setItem("userId", user._id);

    return user;
  });
};

export const loginUser = (data) => {
  return moodmateApi.post("/users/login", data).then((response) => {
    const {
      token,
      data: { user },
    } = response.data;

    AsyncStorage.setItem("userToken", token);
    AsyncStorage.setItem("userId", user._id);

    return user;
  });
};

export const saveQuote = (data, userToken) => {
  return AsyncStorage.getItem("userId")
    .then((userId) => {
      return moodmateApi.post(
        "/quotes/addQuote",
        { ...data, user: userId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    })
    .then((response) => {
      return response.data.quoteBody;
    });
};
