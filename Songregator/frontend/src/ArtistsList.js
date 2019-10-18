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
        var self = this;
        artistsService.getArtists().then(function (result) {
            console.log(result);
            self.setState({artists: result})
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
                        <th>Terms</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.artists.map(a =>
                        <tr key={a.pk}>
                            <td>{a.artist_id}  </td>
                            <td>{a.artist_name}</td>
                            <td>{a.artist_terms}</td>
                            {/*<td>*/}
                            {/*    <button onClick={(e) => this.handleDelete(e, a.pk)}> Delete</button>*/}
                            {/*    <a href={"/customer/" + a.pk}> Update</a>*/}
                            {/*</td>*/}
                        </tr>)}
                    </tbody>
                </table>
                {/*<button className="btn btn-primary" onClick={this.nextPage}>Next</button>*/}
            </div>
        );
    }
}

export default ArtistsList;