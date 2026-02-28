import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Next.js Dev Server Default
// Ensure the Next.js app is running on Port 3000
const DEV_PORT = 3000;

const getBaseUrl = () => {
    // Always use the production API URL since the web app is already hosted on Firebase
    return 'https://kalasetu.art/api/mobile';
};

export const API_BASE_URL = getBaseUrl();

export const fetchAPI = async (endpoint, options = {}) => {
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log(`[API] Fetching: ${fullUrl}`);
    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API Request Failed');
        }

        return data;
    } catch (error) {
        console.error(`Fetch API Error for ${endpoint}:`, error);
        throw error;
    }
};
