import axios from "axios";

const moodmateApi = axios.create({
  baseURL: "https://moodmate-api.onrender.com/api/v1",
});

export const signupUser = (data) => {
  return moodmateApi.post("/users/signup", data).then((response) => {
    return response.data.user;
  });
};
