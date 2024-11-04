import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/', 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);


const axiosUtil = {
    get: async (url, params = {}, config = {}) => {
        try {
            const response = await axiosInstance.get(url, {
                ...config,
                params
            });
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    post: async (url, data = {}, config = {}) => {
        try {
            const response = await axiosInstance.post(url, data, config);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    put: async (url, data = {}, config = {}) => {
        try {
            const response = await axiosInstance.put(url, data, config);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    delete: async (url, config = {}) => {
        try {
            const response = await axiosInstance.delete(url, config);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};

export default axiosUtil;