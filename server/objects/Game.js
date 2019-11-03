const CreatureBuilder = require('../builders/CreatureBuilder');
const breedingChamber = require('../processes/breedingChamber');
const Updates = require('./Updates');

class Game {
    constructor() {
        this.creaturesById = {};
    }

    createRandomCreature() {
        const updates = new Updates();

        const id = this.generateId();
        console.log("creating creature with id " + id);
        let creature = CreatureBuilder.randomCreature(id);
        console.log(JSON.stringify(creature));
        this.creaturesById[creature.id] = creature;
        updates.addCreature(creature);

        return updates;
    }

    breedCreatures(id1, id2) {
        const updates = new Updates();
        const creature1 = this.creaturesById[id1];
        const creature2 = this.creaturesById[id2];
        const newId = this.generateId();
        const newCreature = breedingChamber(newId, creature1, creature2);
        if (newCreature) {
            this.creaturesById[newCreature.id] = newCreature;
            updates.addCreature(newCreature);
        }
        updates.addCreature(creature1);
        updates.addCreature(creature2);
        
        return updates;
    }

    generateId() {
        // TODO this should somehow also account for objects being removed
        return Object.keys(this.creaturesById).length;
    }
}

module.exports = Game;
