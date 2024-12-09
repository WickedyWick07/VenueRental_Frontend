import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor for requests to add Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor for responses to handle expired access tokens
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired access token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;  // Prevent infinite loop

            try {
                // Get refresh token from localStorage
                const refreshToken = localStorage.getItem('refresh_token');

                // Request new access token using refresh token
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, { 
                    refresh: refreshToken 
                });

                // Save new access token to localStorage
                localStorage.setItem('access_token', data.access);

                // Update the authorization header and retry the original request
                api.defaults.headers['Authorization'] = `Bearer ${data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                
                return api(originalRequest);  // Retry the original request with new token
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Optionally, log out the user or redirect to the login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
