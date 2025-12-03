import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';


const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = ( auth ,email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const LoginUser = (auth, email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
}

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, []) // auth is stable; empty deps ok

    const authinfo = {
        loading,
        user,
        createUser,
        LoginUser,
        logOutUser,
    };


    return (
        // changed: use Provider component
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;