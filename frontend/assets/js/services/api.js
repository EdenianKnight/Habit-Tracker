const BASE_URL = 'http://localhost:5000/api';

export default {
    async request(endpoint, method = 'GET', body = null) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, config);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Request failed');
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error: ${error.message}`);
            throw error;
        }
    },

    // User-related methods
    async register(userData) {
        return this.request('/users/register', 'POST', userData);
    },

    async login(credentials) {
        return this.request('/users/login', 'POST', credentials);
    },

    // Guest habits methods
    async saveHabit(habitData) {
        return this.request('/guest/habits', 'POST', habitData);
    },

    async updateHabit(habitId, data) {
        return this.request(`/guest/habits/${habitId}`, 'PUT', data);
    }
};