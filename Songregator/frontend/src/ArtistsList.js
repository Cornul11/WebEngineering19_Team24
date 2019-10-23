import React, {Component, useState} from "react";
import ArtistsService from "./ArtistsService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const artistsService = new ArtistsService();

class ArtistsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            nextPageURL: '',
            previousPageURL: '',
            showPopup: false,
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let self = this;
        artistsService.getArtists().then(function (result) {
            console.log(result);
            self.setState({artists: result.results, nextPageURL: result.next, previousPageURL: result.previous});
        });
    }

    handleDelete(e, artist_name) {
        let self = this;
        artistsService.deleteArtist({artist_name: artist_name}).then(() => {
            const newArr = self.state.artists.filter(function (obj) {
                return obj.artist_name !== artist_name;
            });
            self.setState({artists: newArr});
        });
    }

    nextPage() {
        let self = this;
        artistsService.getArtistsByURL(this.state.nextPageURL).then((result) => {
            self.setState({artists: result.results, nextPageURL: result.next, previousPageURL: result.previous});
        })
    }

    previousPage() {
        let self = this;
        artistsService.getArtistsByURL(this.state.previousPageURL).then((result) => {
            self.setState({artists: result.results, nextPageURL: result.next, previousPageURL: result.previous});
        })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        let tdStyle = {width: "15%"};
        let previousButtonState = this.state.previousPageURL === null;


        return (
            <div>
                <button onClick={this.togglePopup.bind(this)}> Click To Launch Popup</button>
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
                    {this.state.artists.map(a => (
                        <tr key={a.artist_name}>
                            <td>{a.artist_id} </td>
                            <td>{a.artist_name}</td>
                            <td>{a.artist_terms}</td>
                            <td style={tdStyle}>
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={e => this.handleDelete(e, a.artist_name)}
                                    >
                                        {" "}
                                        Delete
                                    </button>
                                    <a
                                        role="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={null}
                                    >
                                        {" "}
                                        Update
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <button className="mr-2 btn btn-primary" onClick={this.previousPage}
                            disabled={previousButtonState}>Previous
                    </button>

                    <button className="btn btn-primary" onClick={this.nextPage}>Next</button>
                </div>
                {/*<Button variant="primary" onClick={handleShow}>*/}
                {/*    Open testing popup*/}
                {/*</Button>*/}
                <Modal
                    show={this.state.showPopup}
                    onHide={this.togglePopup.bind(this)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Edit artist?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.artists.map(a => (
                            <p key={a.artist_id}>{a.artist_name}</p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.togglePopup.bind(this)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.closePopup}>
                            Save changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ArtistsList;
