import axios from 'axios';

/**
 * Creates a new instance of axios with a custom config for this API service.
 * This one is going to be used on the sagas and components
 */
export const readableDataService = axios.create({
    baseURL: 'http://localhost:3001/'
})