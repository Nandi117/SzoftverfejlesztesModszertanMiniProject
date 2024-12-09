import axios from "axios";
import {BASE_API_URL, TRANSLATOR_API_URL} from "./globals.ts";

/**
 * API Instance Configuration
 *
 * This module provides pre-configured Axios instances for making HTTP requests to different API endpoints in the application.
 *
 * Features:
 * - Centralized API configuration.
 * - Separate instances for general API and translator API.
 * - Default headers and configurations applied to all requests.
 * - Reusability across the application by exporting factory functions for Axios instances.
 *
 * Dependencies:
 * - `axios`: A promise-based HTTP client for making API requests.
 * - `globals.ts`: Contains global constants like `BASE_API_URL` and `TRANSLATOR_API_URL`.
 *
 * Instances:
 * 1. **apiInstance**:
 *    - Base URL: `BASE_API_URL`.
 *    - Headers: Sets `Content-Type` to `application/json`.
 *    - `withCredentials`: Enables sending cookies with requests for authentication.
 *
 *    - Usage:
 *      ```javascript
 *      import { getApi } from './apiInstance';
 *      const api = getApi();
 *      api.get('/some-endpoint').then(response => console.log(response.data));
 *      ```
 *
 * 2. **translatorApiInstance**:
 *    - Base URL: `TRANSLATOR_API_URL`.
 *    - Headers: Sets `Content-Type` to `application/json`.
 *
 *    - Usage:
 *      ```javascript
 *      import { getTranslatorApi } from './apiInstance';
 *      const translatorApi = getTranslatorApi();
 *      translatorApi.post('/translate', { text: 'Hello' }).then(response => console.log(response.data));
 *      ```
 *
 * Functions:
 * - `getApi()`: Returns the general API instance (`apiInstance`).
 * - `getTranslatorApi()`: Returns the translator API instance (`translatorApiInstance`).
 *
 * Customization:
 * - Modify `BASE_API_URL` and `TRANSLATOR_API_URL` in `globals.ts` to adjust the API endpoints.
 * - Add or modify headers and configurations to meet specific project requirements.
 *
 * Notes:
 * - Ensure `globals.ts` exports `BASE_API_URL` and `TRANSLATOR_API_URL`.
 * - Proper error handling should be implemented where these instances are used.
 */

export const apiInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials:true

});

export const getApi = () =>{
    return apiInstance;
}



const translatorApiInstance = axios.create({
    baseURL:TRANSLATOR_API_URL,
    headers:{
        "Content-Type" : "application/json"
    }
})

export const getTranslatorApi = () =>{
    return translatorApiInstance;
}