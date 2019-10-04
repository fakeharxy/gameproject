const CreatureBuilder = require('../builders/CreatureBuilder');
const mate = require('../processes/breedingChamber');

class Game {
    constructor() {
        this.creaturesById = {};
    }

    createRandomCreature() {
        const id = this.generateId();
        console.log("creating creature with id " + id);
        let creature = CreatureBuilder.randomCreature(id);
        this.creaturesById[creature.id] = creature;
        return creature;
    }

    breedCreatures(id1, id2) {
        const creature1 = this.creaturesById[id1];
        const creature2 = this.creaturesById[id2];
        if (!(creature1 && creature2)) {
            console.log("error!");
            throw "breeding error"; //TODO
        }
        const newId = this.generateId();
        const newCreature = mate(newId, creature1, creature2);
        this.creaturesById[newCreature.id] = newCreature;
        return newCreature;
    }

    generateId() {
        // TODO this should somehow also account for objects being removed
        return Object.keys(this.creaturesById).length;
    }
}

module.exports = Game;
