import React, { useState } from 'react';
import { COLOUR_NAMES } from '../client_constants';

const WIDTH = 160;
const HEIGHT = 75;

function Creature({ creature, layout, dragging, draggedTo, startDragging }) {
    //const [dragging, setDragging] = useState(false);
    //const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [origin, setOrigin] = useState({ x: 0, y: 0 });

    // Add our new coordinates to the X and Y position values.
    //const X = layout.x + coordinates.x;
    //const Y = layout.y + coordinates.y;

    return (
        <svg x={layout.x}
            y={layout.y}
            width={WIDTH}
            height={HEIGHT}
            style={dragging ? { 'opacity': 0.6, 'pointerEvents': 'none' } : {}}
            onMouseDown={e => {
                // We have clicked the element, starting the drag.
                startDragging(creature.id, { layoutx: layout.x, clickx: e.clientX, layouty: layout.y, clicky: e.clientY });
                //setOrigin({ x: e.clientX, y: e.clientY });
                //setDragging(true);
            }}
            onMouseUp={() => {
                // We let go of the mouse, ending our drag on *this* creature.
                draggedTo(creature);
            }}

            onMouseMove={(e) => {
                //console.log("mouseMove " + creature.id);
                //console.log(e);
            }}

            onMouseEnter={(e) => {
                console.log("mouseEnter " + creature.id);
                //console.log(e);
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
            <text x="10%" y="10%" textAnchor="right" dominantBaseline="central">Name: {creature.name}</text>
            <text x="10%" y="30%" textAnchor="right" dominantBaseline="central">Health: {creature.health}</text>
            {COLOUR_NAMES.map((colour, index) => {
                return phenotype(creature, colour, index);
            })}

        </svg>
    )
    function phenotype(creature, colour, index) {
        if (colour in creature.phenotypes) {
            return (
                <React.Fragment key={"frg"+index}>
                    <circle cx={(index + 1) * traitSpacingUnit()} cy="75%" r="10" fill={colour} />
                    <text x={(index + 1) * traitSpacingUnit()} y="75%" textAnchor="middle" dominantBaseline="central">{creature.phenotypes[colour].trait.substring(0,1).toUpperCase()}</text>
                </React.Fragment>
            )
        } else {
            //console.log(" no phenotype for colour " + colour);
        }
    }

    function traitSpacingUnit() {
        return WIDTH / (COLOUR_NAMES.length + 1);
    }

}

export default Creature;
