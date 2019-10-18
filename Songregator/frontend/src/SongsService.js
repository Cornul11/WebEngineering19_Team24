import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class SongsService {
    constructor() {}

    getSong() {
        const url = `${API_URL}/song/SOZZWWW12A58A8146A`; // TODO: to change for name
        return axios.get(url).then(response => response.data);
    }
}