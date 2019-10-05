import React from 'react';
import {COLOUR_NAMES} from '../constants';

const WIDTH = 160;
const HEIGHT = 75;

export default class Creature extends React.Component {
    
    render() {
        console.log("rendering creature " + JSON.stringify(this.props.creature));
        return (
            <svg x={this.props.layout.x} y={this.props.layout.y} width={WIDTH} height={HEIGHT}>
                <rect width="100%" height="100%" rx="10" ry="10" fill="#779eff" stroke="black" />
                {COLOUR_NAMES.map((colour, index) => {
                    return this.phenotype(this.props.creature, colour, index);
                })}
                
            </svg>
        ) 
    }

    phenotype(creature, colour, index) {
        if (colour in creature.phenotypes) {
          return <circle cx={(index + 1) * this.traitSpacingUnit()} cy="75%" r="10" fill={colour}/>
        } else {
            console.log(" no phenotype for colour " + colour);
        }
    }

    traitSpacingUnit() {
        return WIDTH / (COLOUR_NAMES.length + 1);
    }
}