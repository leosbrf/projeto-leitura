import axios from 'axios';

/**
 * Creates a new instance of axios with a custom config for this API service.
 * This one is going to be used on the sagas and components
 */
const readableDataService = axios.create({
    baseURL: 'http://localhost:3001/'
})

readableDataService.interceptors.request.use(req => {
    req.headers = { 'Authorization': '"Bearer 12345667fgd5ge5ggdgdrkkl"' }
    return req
})

readableDataService.interceptors.response.use(
    res => {
        return res.data
    },
    (error) => {
        console.log(error);
    }
)

export default readableDataService