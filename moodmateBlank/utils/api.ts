import axios from "axios";

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
export const getRandomZenQuote = (input: never) => {
  return zenQuotesAPI.get(input).then((response) => {
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

export const getSingleEmotion = (emotion: {}) => {
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
export const signupUser = (data: {}) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    return response.data;
  });
};

export const loginUser = (data: {}) => {
  return moodmateApi
    .post("/users/login", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const updateUser = (data: {}, userToken: string) => {
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

export const requestResetCode = (data: {}) => {
  return moodmateApi
    .post("/users/forgotPassword", data)
    .then((response) => {
      console.log(response.data);
      // return response.data.data.user;
    })
    .catch((error) => console.error(error));
};

export const resetPassword = (data: {}) => {
  return moodmateApi
    .patch("/users/resetPassword", data)
    .then((response) => {
      return response.data.data.user;
    })
    .catch((error) => console.error(error));
};

// QUOTES
export const saveQuote = (quoteData: {}, userToken: string) => {
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

export const getAllQuotes = (userToken: string) => {
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

export const deleteQuote = (quoteId: string, userToken: string) => {
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
export const saveJournalEntry = (journalEntry: {}, userToken: string) => {
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

export const getJournalEntries = (date: string, userToken: string) => {
  return moodmateApi
    .get(`/journal/entries/${date}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    .then((response) => {
      return response.data.data.entries;
    })
    .catch((error) => console.error(error));
};
