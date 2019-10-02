import React from 'react';

export default class Creature extends React.Component {
    render() {
        return (
            <p>{"hello I am a creature my name is " + this.props.creature.name}</p>
        ) 
    }
}