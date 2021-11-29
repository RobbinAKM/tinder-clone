import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { View, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext({});

const config = {
  iosClientId:
    "345898666160-goc4ugef2eth8kr5et93vnv0bk77rs2t.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [initiaLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //this is the listener that returns unscribe object
    const unsub = onAuthStateChanged(auth, (user) => {
      //onAuthStateChange is used to track the state of auth (sigin , signout)
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setInitialLoading(false);
    });
    return unsub;
  }, []);

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const googleSignin = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;

          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const memoValue = useMemo(
    () => ({
      user,
      googleSignin,
      loading,
      error,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!initiaLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
