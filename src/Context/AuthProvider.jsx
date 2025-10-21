import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);


    const createUser = (auth, email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const LoginUser = (auth, email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const authinfo = {
        loading,
        createUser,
        LoginUser
    };


    return (
        <AuthContext value={authinfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;
