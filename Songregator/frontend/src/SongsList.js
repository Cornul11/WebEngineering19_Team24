import React, {Component} from "react";
import SongsService from "./SongsService";

const songsService = new SongsService();

class SongsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    let self = this;
    songsService.getSongs().then(function(result) {
      console.log(result);
      self.setState({songs: result.results});
    });
  }

  render() {
    return (
      <div className="customers--list">
        <h1 className="font-weight-light">Songs list</h1>
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
        {/*<button className="btn btn-primary" onClick={this.nextPage}>Next</button>*/}
      </div>
    );
  }
}

export default SongsList;
