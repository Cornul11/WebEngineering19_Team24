import React, {Component} from 'react';

class ArtistStatInfo extends Component {
    render() {
        return (
            <div className="container-fluid">
                <ul className="list-unstyled mt-3 mb-4">
                    <li>Name: {this.props.name}</li>
                    <li>Mean: {this.props.mean}</li>
                    <li>Median: {this.props.median}</li>
                    <li>STD: {this.props.std}</li>
                </ul>
            </div>
        );
    }
}

export default ArtistStatInfo;