import React, {Component} from 'react';
import axios from 'axios';
import SongInfo from "./SongInfo";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendid: '',
            fetchUser: {
                inputid: '',
                title: '',
                duration: ''
            }
        };
        this.fetchUser = this.fetchUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({sendid: e.target.value})
    };


    fetchUser = (e) => {
        const url = `http://localhost:8000/song/${this.state.sendid}/`;
        axios.get(url)
            .then((response) => {
                console.log("response", response);
                this.setState({
                    fetchUser: response.data
                });
                console.log("fetchUser", this.state.fetchUser);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="form-inline">
                    <div className="form-group mx-sm-3 my-2">
                        <input className="form-control" placeholder="Enter song ID" name="inputid"
                               onChange={this.onChange}/>
                    </div>
                    <button className="btn btn-primary my-2" onClick={this.fetchUser}>Search</button>
                </div>
                <SongInfo id={this.state.fetchUser.song_id} title={this.state.fetchUser.song_title}
                         duration={this.state.fetchUser.song_duration}/>
            </div>
        );
    }
}

export default SearchBar;