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

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    hasUser: false,
    userToken: null,
    userId: null,
  });

  const setUser = ({ hasUser, userToken, userId }) => {
    setAuthState({ hasUser, userToken, userId });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthProvider;
