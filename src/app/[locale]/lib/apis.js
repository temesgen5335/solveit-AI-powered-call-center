// This file contains functions to interact with the backend API.

const API_BASE_URL = 'http://localhost:8000'; 

// Generic function to make API requests
const request = async (endpoint, method, options = {}) => {
    try {
        const token = localStorage.getItem('access_token');
        const url = `${API_BASE_URL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(url, {
            method,
            headers,
            ...options,
        });

        if (!response.ok) {
            let errorMessage = `API request failed: ${response.status} - ${response.statusText}`;
            try {
                const errorData = await response.json();
                if (errorData.detail) {
                    errorMessage += ` - ${errorData.detail}`;
                }
            } catch (parseError) {
                console.error("Error parsing error response", parseError);
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};

// --- Authentication Endpoints ---

/**
 * Registers a new company.
 * @param {object} data - The company registration data.
 * @returns {Promise<object>} The API response data.
 */
export const companyRegister = async (data) => {
    try {
        const responseData = await request('/auth/register/company', 'POST', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return responseData;
    } catch (error) {
        throw error;
    }
};

/**
 * Registers a new user.
 * @param {object} data - The user registration data.
 * @returns {Promise<object>} The API response data.
 */
export const userRegister = async (data) => {
    try {
        const responseData = await request('/auth/register/user', 'POST', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return responseData;
    } catch (error) {
        throw error;
    }
};

/**
 * Logs in a user or company.
 * @param {string} username - The username (email).
 * @param {string} password - The password.
 * @returns {Promise<object>} The API response data, including the token.
 */
export const login = async (username, password) => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const responseData = await request('/auth/login', 'POST', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
        });
        return responseData;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves the current user's profile information.
 * @returns {Promise<object>} The API response data.
 */
export const getProfile = async () => {
    try {
        const responseData = await request('/protected/me', 'GET');
        return responseData;
    } catch (error) {
        throw error;
    }
};

// --- Company Dashboard Endpoints ---

/**
 * Registers a service for a company.
 * @param {object} data - The service registration data.
 * @returns {Promise<object>} The API response data.
 */
export const registerService = async (data) => {
    try {
        const responseData = await request('/company-dashboard/register-service', 'POST', {
            body: JSON.stringify(data),
        });
        return responseData;
    } catch (error) {
        throw error;
    }
};

// --- User Dashboard Endpoints ---

/**
 * Gets all registered service topics.
 * @returns {Promise<Array<string>>} List of service topics
 */
export const getServiceTopics = async () => {
    try {
        const responseData = await request('/user-dashboard/get-service-topics', 'GET');
        return responseData;
    } catch (error) {
        throw error;
    }
};
