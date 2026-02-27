import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Next.js Dev Server Default
// Ensure the Next.js app is running on Port 3000
const DEV_PORT = 3000;

// Dynamically target the host computer through Expo's debugger host IP
const getBaseUrl = () => {
    if (__DEV__) {
        let hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost || Constants.manifest2?.extra?.expoGo?.debuggerHost;

        if (hostUri) {
            // e.g hostUri might be "192.168.1.10:8081". We extract the IP and inject 3000.
            const localIp = hostUri.split(':')[0];
            return `http://${localIp}:${DEV_PORT}/api/mobile`;
        }

        if (Platform.OS === 'android') {
            return `http://10.0.2.2:${DEV_PORT}/api/mobile`;
        }
        // iOS Simulator or Physical Device Fallback (hardcoded to your current Mac IP)
        return `http://192.168.1.13:${DEV_PORT}/api/mobile`;
    }
    // Production API URL
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
