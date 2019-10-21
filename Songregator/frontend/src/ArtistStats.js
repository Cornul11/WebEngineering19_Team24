import React, {Component} from 'react';
import axios from 'axios';
import ArtistStatInfo from "./ArtistStatInfo";

function ErrorMessage(props) {
    let message = '';
    if (!props.givenError) {
        return null;
    }

    if (props.givenError.response.status === 404) {
        message = 'Artist not found in the database!'
    }

    return (
        <div className="container-fluid mt-3 mb-4">
            <p>{message}</p>
        </div>
    );
}

/**
 * Checks whether the given object is empty, for example
 * a json object like {}.
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendName: '',
            fetchArtistStat: {
                name: '',
                mean: '',
                median: '',
                std: ''
            },
            error: '',
            gotData: 'false'
        };
        this.fetchArtistStat = this.fetchArtistStat.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({sendName: e.target.value});
    };


    fetchArtistStat = (e) => {
        const url = `http://localhost:8000/popularity/?artist=${this.state.sendName}`;
        axios.get(url)
            .then((response) => {
                console.log("response", response);
                this.setState({
                    fetchArtistStat: response.data,
                    gotData: 'true'
                });
                this.render();
                console.log("fetchArtistStat", this.state.fetchArtistStat);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    gotData: 'false',
                    error: error
                });
                this.render();
            });
    };


    render() {
        let output;
        if (this.state.gotData === 'true' && !isEmpty(this.state.fetchArtistStat)) {
            output = <ArtistStatInfo name={this.state.sendName} mean={this.state.fetchArtistStat.mean} median={this.state.fetchArtistStat.median}
                               std={this.state.fetchArtistStat.std}/>;
        } else {
            output = <ErrorMessage givenError={this.state.error}/>
        }
        return (
            <div className="container-fluid">
                <div className="form-inline">
                    <div className="form-group mx-sm-3 my-2">
                        <input autoComplete="on" className="form-control" type="text"
                               placeholder="Enter artist name" name="sendName" onChange={this.onChange}/>
                    </div>
                    <button className="btn btn-primary my-2" onClick={this.fetchArtistStat}>Search</button>
                </div>
                {output}
            </div>
        );
    }
}

export default Artist;