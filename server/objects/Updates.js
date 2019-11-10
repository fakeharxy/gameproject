class Updates {
    constructor() {
        this.creatures = {};
    }

    addCreature(creature) {
        if (creature) {
            this.creatures[creature.id] = creature;
        }
    }
}

module.exports = Updates;