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
// AUTH
export const signupUser = (data) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    return response.data;
  });
};

export const loginUser = (data) => {
  return moodmateApi
    .post("/users/login", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const updateUser = (data, userToken) => {
  return moodmateApi
    .patch("/users/updateMe", data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      // return response.data;
    })
    .catch((error) => console.error(error));
};

// QUOTES
export const saveQuote = (quoteData, userToken) => {
  return moodmateApi
    .post("/quotes/addQuote", quoteData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const getAllQuotes = (userToken) => {
  return moodmateApi
    .get("/quotes", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const deleteQuote = (quoteId, userToken) => {
  return moodmateApi
    .delete(`/quotes/${quoteId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

// JOURNAL
export const saveJournalEntry = (journalEntry, userToken) => {
  return moodmateApi
    .post("/journal/entries", journalEntry, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const getJournalEntries = (date, userToken) => {
  return moodmateApi
    .get(`/journal/entries/${date}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      console.log(response.data.data.entries);
      return response.data.data.entries;
    })
    .catch((error) => console.error(error));
};
