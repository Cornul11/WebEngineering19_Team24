import React, {Component} from "react";
import SongsService from "./SongsService";

const songsService = new SongsService();

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      nextPageURL: "",
      previousPageURL: "",
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    let self = this;
    songsService.getSongs().then(function(result) {
      console.log(result);
      self.setState({
        songs: result.results,
        nextPageURL: result.next,
        previousPageURL: result.previous,
      });
    });
  }

  nextPage() {
    let self = this;
    songsService.getSongsByURL(this.state.nextPageURL).then(result => {
      self.setState({
        songs: result.results,
        nextPageURL: result.next,
        previousPageURL: result.previous,
      });
    });
  }

  previousPage() {
    let self = this;
    songsService.getSongsByURL(this.state.previousPageURL).then(result => {
      self.setState({
        songs: result.results,
        nextPageURL: result.next,
        previousPageURL: result.previous,
      });
    });
  }

  render() {
    let previousButtonState = this.state.previousPageURL === null;
    return (
      <div className="customers--list">
        <h1 className="font-weight-light">Songs list</h1>
        <div className="d-flex justify-content-center">
          <button
            className="mr-2 btn btn-primary"
            onClick={this.previousPage}
            disabled={previousButtonState}
          >
            Previous
          </button>

          <button className="btn btn-primary" onClick={this.nextPage}>
            Next
          </button>
        </div>
        <br></br>
        <table className="table">
          <thead className="thead-dark" key="thead">
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {this.state.songs.map(a => (
              <tr key={a.song_id}>
                <td>{a.song_id} </td>
                <td>{a.song_title}</td>
                <td>{a.artist_terms}</td>
                {/*<td>*/}
                {/*    <button onClick={(e) => this.handleDelete(e, a.pk)}> Delete</button>*/}
                {/*    <a href={"/customer/" + a.pk}> Update</a>*/}
                {/*</td>*/}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <button
            className="mr-2 btn btn-primary"
            onClick={this.previousPage}
            disabled={previousButtonState}
          >
            Previous
          </button>

          <button className="btn btn-primary" onClick={this.nextPage}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default SongsList;
