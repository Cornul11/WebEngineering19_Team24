import axios from "axios";
const API_URL = "http://localhost:8000";

export default class ArtistsService {
  getArtists() {
      const url = `${API_URL}/artists?timestamp=${new Date().getTime()}`;
      return axios.get(url).then(response => response.data);
  }

  getArtistsByURL(link) {
    const url = `${link}`;
    console.log('opening', url);
    return axios.get(url).then(response => response.data);
  }

  deleteArtist(artist) {
    const url = `${API_URL}/songs/delete/${artist.artist_name}/`;
    return axios.delete(url);
  }
}
