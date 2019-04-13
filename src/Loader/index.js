import React from 'react';
import './loader.css';

export class Loader extends React.Component {

    render() {
        return <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    }
}