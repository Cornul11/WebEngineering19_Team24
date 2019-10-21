import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class SongsService {
    constructor() {}

    getSongs() {
        const url = `${API_URL}/songs`; // TODO: to change for name
        return axios.get(url).then(response => response.data);
    }
}