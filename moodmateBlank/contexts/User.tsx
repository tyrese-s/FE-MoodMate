import { createContext, useState } from "react";

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
  journalEntries: [],
  setJournalEntries: (entries: any[]) => {},
});
