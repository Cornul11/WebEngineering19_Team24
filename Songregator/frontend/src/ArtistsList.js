import React, {Component} from "react";
import ArtistsService from "./ArtistsService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const artistsService = new ArtistsService();

class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      nextPageURL: "",
      previousPageURL: "",
      showPopup: false,
      artistToEdit: "",
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    artistsService.getArtists().then(function(result) {
      console.log(result);
      self.setState({
        artists: result.results,
        nextPageURL: result.next,
        previousPageURL: result.previous,
      });
    });
  }

  handleDelete(e, artist_name) {
    let self = this;
    artistsService.deleteArtist({artist_name: artist_name}).then(() => {
      const newArr = self.state.artists.filter(function(obj) {
        return obj.artist_name !== artist_name;
      });
      self.setState({artists: newArr});
    });
  }

  nextPage() {
    let self = this;
    artistsService.getArtistsByURL(this.state.nextPageURL).then(result => {
      self.setState({
        artists: result.results,
        nextPageURL: result.next,
        previousPageURL: result.previous,
      });
    });
  }

  previousPage() {
    let self = this;
    artistsService.getArtistsByURL(this.state.previousPageURL).then(result => {
      self.setState({
        artists: result.results,
        nextPageURL: result.next,
        previousPageURL: result.previous,
      });
    });
  }

  togglePopup(d, e) {
    this.setState(state => ({
      showPopup: !state.showPopup,
      artistToEdit: d,
    }));
    console.log(d);
  }

  handleSubmit(event) {
    const {
      match: {params},
    } = this.props;
    if (params && params.artist_id) {
      this.handleUpdate(params.pk);
    } else {
      this.handleCreate();
    }

    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.name, " = ", event.target.value);
  }

  render() {
    let tdStyle = {width: "15%"};
    let previousButtonState = this.state.previousPageURL === null;
    let nextButtonState = this.state.nextPageURL === null;

    return (
      <div>
        <p>Debug: {this.state.artists.length} items</p>
        <h1 className="font-weight-light">Artists list</h1>
        <div className="d-flex justify-content-center">
          <button
            className="mr-2 btn btn-primary"
            onClick={this.previousPage}
            disabled={previousButtonState}
          >
            Previous
          </button>

          <button
            className="btn btn-primary"
            onClick={this.nextPage}
            disabled={nextButtonState}
          >
            Next
          </button>
        </div>
        <br></br>
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
                      onClick={e => this.handleDelete(e, a.artist_id)}
                    >
                      {" "}
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={e => this.togglePopup(a.artist_id, e)}
                    >
                      Update
                    </button>
                  </div>
                </td>
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

          <button
            className="btn btn-primary"
            onClick={this.nextPage}
            disabled={nextButtonState}
          >
            Next
          </button>
        </div>
        <Modal
          show={this.state.showPopup}
          onHide={this.togglePopup.bind(this)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit artist{" "}
              {this.state.artists
                .filter(artist => {
                  return artist.artist_id === this.artistToEdit;
                })
                .map(a => (
                  <p>{a.artist_name}</p>
                ))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.artists
              .filter(artist => {
                // filter first for friends
                return artist.artist_id === this.state.artistToEdit; // returns a new array
              })
              .map(a => (
                <form
                  className="form-editartist"
                  key={a.artist_name}
                  onChange={this.handleInputChange}
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="artistName"
                      className="form-control"
                      placeholder="Artist Name"
                      required=""
                      autoFocus=""
                      defaultValue={a.artist_name}
                    />
                    <label htmlFor="artistName">Artist name</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="artistId"
                      className="form-control"
                      placeholder="Artist ID"
                      required=""
                      defaultValue={a.artist_id}
                    />
                    <label htmlFor="artistId">Artist ID</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="artistTerms"
                      className="form-control"
                      placeholder="Artist Terms"
                      required=""
                      defaultValue={a.artist_terms}
                    />
                    <label htmlFor="artistTerms">Artist Terms</label>
                  </div>

                  <hr />

                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistFamiliarity"
                      className="form-control"
                      placeholder="Artist familiarity"
                      required=""
                      defaultValue={a.artist_familiarity}
                      onChange={null}
                    />
                    <label htmlFor="artistFamiliarity">Artist familiarity</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistHotttnesss"
                      className="form-control"
                      placeholder="Artist hottnesss"
                      required=""
                      defaultValue={a.artist_hotttnesss}
                    />
                    <label htmlFor="artistHotttnesss">Artist hotttnesss</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistLatitude"
                      className="form-control"
                      placeholder="Arist latitude"
                      required=""
                      defaultValue={a.artist_latitude}
                    />
                    <label htmlFor="artistLatitude">Artist latitude</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistLongitude"
                      className="form-control"
                      placeholder="Arist longitude"
                      required=""
                      defaultValue={a.artist_longitude}
                    />
                    <label htmlFor="artistLongitude">Artist longitude</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistLocation"
                      className="form-control"
                      placeholder="Arist location"
                      required=""
                      defaultValue={a.artist_location}
                    />
                    <label htmlFor="artistLocation">Artist location</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistSimilar"
                      className="form-control"
                      placeholder="Artist similar"
                      required=""
                      defaultValue={a.artist_similar}
                    />
                    <label htmlFor="artistSimilar">Artist similar</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="number"
                      id="artistTermsFreq"
                      className="form-control"
                      placeholder="Artist terms frequency"
                      required=""
                      defaultValue={a.artist_terms_freq}
                    />
                    <label htmlFor="artistTermsFrequency">Artist terms frequency</label>
                  </div>
                  <hr />
                  <Button
                    className="float-right"
                    variant="primary"
                    type="submit"
                    onClick={this.closePopup}
                  >
                    Save changes
                  </Button>
                  <Button
                    className="float-right"
                    variant="secondary"
                    onClick={this.togglePopup.bind(this)}
                  >
                    Close
                  </Button>
                </form>
              ))}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ArtistsList;
