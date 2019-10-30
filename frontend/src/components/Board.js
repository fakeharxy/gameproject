import React from 'react';

export default class Board extends React.Component {

    render() {
       
        return (
            <div style={{margin: "auto", width: "800px", height: "500px"}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 500"
                    onMouseMove={e => {  
                        // As long as we haven't let go of the mouse button,
                        // we are still dragging.
                        if (this.props.dragging) {
                            e.preventDefault();
                            //setCoordinates({
                            //    x: e.clientX - origin.x,
                            //    y: e.clientY - origin.y,
                            //});
                            this.props.draggingUpdate(e.clientX, e.clientY);
                        }
                    }}
                    onMouseUp={() => {
                        // We let go of the mouse, ending our drag on 'nothing'.
                        this.props.stopDragging();
                        //setDragging(false);
                        //setCoordinates({
                        //    x: 0,
                        //    y: 0,
                        //});
                    }}
                    onMouseLeave={() => {
                        this.props.stopDragging();
                        // We left our element, drag should reset.
                        //setDragging(false);
                        //setCoordinates({
                        //    x: 0,
                        //    y: 0,
                        //});
                    }}
                    >
                    <rect x="0" y="0" width="800" height="500" stroke="blue" fill="#fafafa" />
                    {this.props.children}
                </svg>
            </div>
        )
    }
}