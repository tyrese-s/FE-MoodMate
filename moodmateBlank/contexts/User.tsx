import { createContext } from "react";

export const AuthContext = createContext({
  hasUser: false,
  setUser: (input: boolean) => {},
  userToken: null,
  userId: null,
});
