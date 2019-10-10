import React, { useState } from 'react';
import { COLOUR_NAMES } from '../constants';

const WIDTH = 160;
const HEIGHT = 75;

function Creature({ creature, layout }) {
    const [dragging, setDragging] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [origin, setOrigin] = useState({ x: 0, y: 0 });

    // Add our new coordinates to the X and Y position values.
    const X = layout.x + coordinates.x;
    const Y = layout.y + coordinates.y;

    return (
        <svg x={X}
            y={Y}
            width={WIDTH}
            height={HEIGHT}
            style={dragging ? { 'opacity': 0.6 } : {}}
            z={dragging ? 9000 : 1}
            onMouseDown={e => {
                // We have clicked the element, starting the drag.
                setOrigin({ x: e.clientX, y: e.clientY });
                setDragging(true);
            }}
            onMouseMove={e => {
                // As long as we haven't let go of the mouse button,
                // we are still dragging.
                if (dragging) {
                    e.preventDefault();
                    setCoordinates({
                        x: e.clientX - origin.x,
                        y: e.clientY - origin.y,
                    });
                }
            }}
            onMouseUp={() => {
                // We let go of the mouse, ending our drag.
                setDragging(false);
                setCoordinates({
                    x: 0,
                    y: 0,
                });
            }}
            onMouseLeave={() => {
                // We left our element, drag should reset.
                setDragging(false);
                setCoordinates({
                    x: 0,
                    y: 0,
                });
            }}
        >
            <rect
                width="100%"
                height="100%"
                rx="10"
                ry="10"
                fill="#779eff"
                stroke="black"
            />
            {COLOUR_NAMES.map((colour, index) => {
                return phenotype(creature, colour, index);
            })}

        </svg>
    )
    function phenotype(creature, colour, index) {
        if (colour in creature.phenotypes) {
            return <circle cx={(index + 1) * traitSpacingUnit()} cy="75%" r="10" fill={colour} />
        } else {
            //console.log(" no phenotype for colour " + colour);
        }
    }

    function traitSpacingUnit() {
        return WIDTH / (COLOUR_NAMES.length + 1);
    }

}

export default Creature;
