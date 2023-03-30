import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
    hasUser: false, 
    setUser: (input : boolean) => {},
  });