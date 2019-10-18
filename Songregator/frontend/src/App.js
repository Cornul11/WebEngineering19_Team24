import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Link} from 'react-router-dom';
import ArtistsList from "./ArtistsList";
import SongsList from "./SongsList";
// import logo from './logo.svg';
import './App.css';
import SearchBar from "./SongForm";


const BaseLayout = () => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top mb-5 shadow">
            <div className="container">
                <a className="navbar-brand" href="/">Songregator</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a class="nav-link" href="/">Artists</a>
                        </li>
                        <li className="nav-item active">
                            <a class="nav-link" href="/songs">Songs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
            <div className="card border-0 shadow my-5">
                <div className="card-body p-5">
                    <Route path="/" exact component={ArtistsList}/>
                    <Route path="/songs" exact component={SearchBar}/>
                </div>
            </div>
        </div>
    </div>
);

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <BaseLayout/>
            </BrowserRouter>
        );
    }
}

export default App;
