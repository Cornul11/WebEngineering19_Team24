import axios from "axios";
const API_URL = "http://localhost:8000";

export default class SongsService {
  getSongs() {
    const url = `${API_URL}/songs`;
    return axios.get(url).then(response => response.data);
  }
}
