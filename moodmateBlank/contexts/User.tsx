import { createContext, useState } from "react";

export const AuthContext = createContext({
  hasUser: false,
  setUser: (input: {
    hasUser: boolean;
    userToken: string;
    userId: string;
  }) => {},
  userToken: null,
  userId: null,
});
