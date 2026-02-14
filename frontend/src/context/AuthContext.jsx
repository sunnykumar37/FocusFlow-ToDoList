import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decoded);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                logout();
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [token]);

    const register = async (name, email, password) => {
        await axios.post('/api/auth/register', { name, email, password });
        // Do not auto-login
    };

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data);
    };

    const googleLogin = async (credential) => {
        const res = await axios.post('/api/auth/google', { credential });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, googleLogin, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
