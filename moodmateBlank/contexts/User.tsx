import { createContext, useState } from "react";

export const AuthContext = createContext({
  hasUser: false,
  setUser: (input: boolean) => { },
  profilePhoto: '',
  setProfilePhoto: (input: any) => { },
  firstName: '',
  setFirstName: (input: any) => { },
  // userToken: null,
  // userId: null,
});
