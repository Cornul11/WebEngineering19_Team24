import React, {Component} from 'react';
import SongsService from "./SongsService";

const songsService = new SongsService();

class SongsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        };
    }

    componentDidMount() {
        var self = this;
        songsService.getSong().then(function (result) {
            console.log(result);
            self.setState({songs: result})
        });
    }

    render() {
        return (
            <div className="customers--list">
                <table className="table">
                    <thead key="thead">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Duration</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{this.state.songs.map(a =>*/}
                        <tr key={this.state.songs.pk}>
                            <td>{this.state.songs.song_id}  </td>
                            <td>{this.state.songs.song_title}</td>
                            <td>{this.state.songs.song_duration}</td>
                            {/*<td>*/}
                            {/*    <button onClick={(e) => this.handleDelete(e, a.pk)}> Delete</button>*/}
                            {/*    <a href={"/customer/" + a.pk}> Update</a>*/}
                            {/*</td>*/}
                        </tr>{/*)*/}
                    </tbody>
                </table>
                {/*<button className="btn btn-primary" onClick={this.nextPage}>Next</button>*/}
            </div>
        );
    }
}

export default SongsList;