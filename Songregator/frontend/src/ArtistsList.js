import React, {Component} from 'react';
import ArtistsService from "./ArtistsService";

const artistsService = new ArtistsService();

class ArtistsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        };
    }

    componentDidMount() {
        let self = this;
        artistsService.getArtists().then(function (result) {
            console.log(result);
            self.setState({artists: result})
        });
    }

    handleDelete(e, artist_name) {
        let self = this;
        artistsService.deleteArtist({artist_name: artist_name}).then(() => {
            const newArr = self.state.artists.filter(function (obj) {
                return obj.artist_name !== artist_name;
            });
            self.setState({artists : newArr})
        });
    }
    render() {
        let tdStyle = {width: '15%'};
        return (
            <div>
                <p>Debug: {this.state.artists.length} items</p>
                <h1 className="font-weight-light">Artists list</h1>
                <table className="table table-striped table-hover">
                    <thead className="thead-dark" key="thead">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Terms</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.artists.map(a =>
                        <tr key={a.artist_name}>
                            <td>{a.artist_id}  </td>
                            <td>{a.artist_name}</td>
                            <td>{a.artist_terms}</td>
                            <td style={tdStyle}>
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-danger btn-sm"
                                            onClick={(e) => this.handleDelete(e, a.artist_name)}> Delete
                                    </button>
                                    <a role="button" className="btn btn-secondary btn-sm"
                                       href={"/customer/" + a.pk}> Update</a>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                {/*<button className="btn btn-primary" onClick={this.nextPage}>Next</button>*/}
            </div>
        );
    }
}

export default ArtistsList;