import React, {Component} from 'react';
import axios from 'axios';
import SongInfo from "./SongInfo";

function ErrorMessage(props) {
    let message = '';
    if (!props.givenError) {
        return null;
    }

    if (props.givenError.response.status === 404) {
        message = 'Song not found in the database!'
    }

    return (
        <div className="container-fluid mt-3 mb-4">
            <p>{message}</p>
        </div>
    );
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendid: '',
            fetchUser: {
                inputid: '',
                title: '',
                duration: ''
            },
            error: '',
            gotData: 'false'
        };
        this.fetchUser = this.fetchUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({sendid: e.target.value});
    };


    fetchUser = (e) => {
        const url = `http://localhost:8000/song/${this.state.sendid}/`;
        axios.get(url)
            .then((response) => {
                console.log("response", response);
                this.setState({
                    fetchUser: response.data,
                    gotData: 'true'
                });
                this.render();
                console.log("fetchUser", this.state.fetchUser);
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
        if (this.state.gotData === 'true') {
            output = <SongInfo id={this.state.fetchUser.song_id} title={this.state.fetchUser.song_title}
                               duration={this.state.fetchUser.song_duration}/>;
        } else {
            output = <ErrorMessage givenError={this.state.error}/>
        }
        return (
            <div className="container-fluid">
                <div className="form-inline">
                    <div className="form-group mx-sm-3 my-2">
                        <input autoComplete="on" className="form-control" type="text"
                               placeholder="Enter song ID" name="inputid" onChange={this.onChange}/>
                    </div>
                    <button className="btn btn-primary my-2" onClick={this.fetchUser}>Search</button>
                </div>
                {output}
            </div>
        );
    }
}

export default SearchBar;