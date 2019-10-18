import React, {Component} from 'react';

class SongInfo extends Component {
    render() {
        return (
            <div className="container-fluid">
                <ul className="list-unstyled mt-3 mb-4">
                    <li>ID: {this.props.id}</li>
                    <li>Name: {this.props.title}</li>
                    <li>Duration: {this.props.duration}</li>
                </ul>
            </div>
        );
    }
}

export default SongInfo;