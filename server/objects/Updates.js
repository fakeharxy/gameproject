class Updates {
    constructor() {
        this.creatures = {};
    }

    addCreature(creature) {
        if (creature && creature.id) {
            this.creatures[creature.id] = creature;
        }
    }
}

module.exports = Updates;