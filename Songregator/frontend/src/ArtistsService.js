import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class ArtistsService {
    constructor() {}

    getArtists() {
        const url = `${API_URL}/artists/`;
        return axios.get(url).then(response => response.data);
    }
}