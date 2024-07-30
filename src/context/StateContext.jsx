import { useEffect, useReducer, useState } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import ReducerContext from "./ReducerContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

//este contexto comparte todas las funciones de firebase a la app

const StateContext = ({ children }) => {
  //creamos un estado para observar si esta logeado o no un usuario
  const [userAccess, setUserAccess] = useState(null);
  //creamos un estado de carga
  const [loading, setLoading] = useState(true);

  const initialState = {
    user: false,
    name: "john",
  };

  const [state, dispatch] = useReducer(initialState, ReducerContext);

  //creamos una funcion para el registro de usuarios
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  //ingresamos mediante un email creado
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  //cerramos secion
  const logOut = () => signOut(auth);
  //creamos una funcion para iniciar secion con google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  //creamos la funcion de resetPassword
  const resetPass = (email) => sendPasswordResetEmail(auth, email)

  //creamos un estado donde se muetra un observador para el uaurio
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAccess(currentUser);
      console.log(currentUser);
      setLoading(false);
    });
    return () => unsuscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        initialState,
        state,
        dispatch,
        registerUser,
        signIn,
        userAccess,
        logOut,
        loading,
        signInWithGoogle,
        resetPass,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default StateContext;

StateContext.propTypes = {
  children: PropTypes.object,
};
