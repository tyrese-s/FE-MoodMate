import { createContext} from 'react';

export const AuthContext = createContext({
    hasUser: true, 
    setUser: (input : boolean) => {},
  });