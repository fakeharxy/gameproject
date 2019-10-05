import React from 'react';

export default class Board extends React.Component {

    render() {
       
        return (
            <div style={{margin: "auto", width: "800px", height: "500px"}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 500">
                    <rect x="0" y="0" width="800" height="500" stroke="blue" fill="#fafafa" />
                    {this.props.children}
                </svg>
            </div>
        )
    }
}