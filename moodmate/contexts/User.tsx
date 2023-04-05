import { createContext } from "react";

export const AuthContext = createContext({
  user: {
    hasUser: false,
    userToken: "",
    userId: "",
    firstName: "",
  },
  setUser: (input: {
    hasUser: boolean;
    userToken: string;
    userId: string;
    firstName: string;
  }) => {},
});
