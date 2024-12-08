import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // Track token refresh status
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            setToken(storedToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
        }

        const loadUser = async () => {
            if (storedToken) {
                try {
                    await fetchCurrentUser();
                } catch (error) {
                    console.error('Error loading user:', error);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const refreshToken = async () => {
        if (isRefreshing) return; // Prevent multiple refresh attempts
        setIsRefreshing(true);
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            try {
                const response = await api.post('token/refresh/', { refresh: refreshToken });
                localStorage.setItem('access_token', response.data.access);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                setToken(response.data.access);
                setIsRefreshing(false);
                return true;
            } catch (error) {
                console.error('Error refreshing token:', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                setCurrentUser(null);
                setIsRefreshing(false);
                return false;
            }
        }
        setIsRefreshing(false);
        return false;
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await api.get('current-user/');
            console.log(response.data)
            
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user:', error);
            if (error.response && error.response.status === 401) {
                const refreshed = await refreshToken();
                if (refreshed) {
                    await fetchCurrentUser();
                }
            }
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('login/', { email, password });
            if (response.data && response.data.access && response.data.refresh) {
                setToken(response.data.access);
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                setCurrentUser(response.data.user);
                navigate('/dashboard');
                return { success: true, message: 'Logged in successfully' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.response?.data?.detail || 'An error occurred during login' 
            };
        }
    };

    const logout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setCurrentUser(null);
        delete api.defaults.headers.common['Authorization'];
        navigate('/');
    };

    const register = async (formData) => {
        try {
            const response = await api.post('register/', formData);
            if (response.data && response.data.access && response.data.refresh) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                setCurrentUser(response.data.user);
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const value = {
        currentUser,
        login,
        logout,
        register,
        loading,
        fetchCurrentUser,
        refreshToken,
        token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
