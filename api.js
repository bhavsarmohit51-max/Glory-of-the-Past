// Centralized API configuration & Fetch helper (Universal: Localhost, Network IP, Mobile & Cloudflare Tunnel)
const API_BASE_URL = (!window.location.port || window.location.port === '5203')
    ? `${window.location.origin}/api`
    : `${window.location.protocol}//${window.location.hostname}:5203/api`;

const api = {
    // GET request
    async get(endpoint) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: headers
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error(`API GET error on ${endpoint}:`, error);
            throw error;
        }
    },

    // POST request
    async post(endpoint, data) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error(`API POST error on ${endpoint}:`, error);
            throw error;
        }
    },

    // PUT request
    async put(endpoint, data) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error(`API PUT error on ${endpoint}:`, error);
            throw error;
        }
    },

    // DELETE request
    async delete(endpoint) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: headers
            });
            return await this.handleResponse(response);
        } catch (error) {
            console.error(`API DELETE error on ${endpoint}:`, error);
            throw error;
        }
    },

    // Handle common HTTP responses
    async handleResponse(response) {
        if (response.status === 204) {
            return { success: true };
        }

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMsg = data?.message || `HTTP Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMsg);
        }

        return data;
    }
};
