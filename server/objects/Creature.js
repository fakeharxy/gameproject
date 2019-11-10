const constants = require("../server_constants");

class Creature {

    constructor(id) {
        this.id = id;
        this.name = "unknown " + this.id;
        this.phenotypes = {};
        this.health = constants.HEALTH;
        /*
        {
            red: Phenotype,
            blue: Phenotype,
            ...
        }
        */
    }

    setName(name) {
        this.name = name;
    }

    decreaseHealth() {
        this.health--;
    }

    isDead() {
        return this.health <= 0;
    }

    setPhenotype(colour, phenotype) {
        this.phenotypes[colour] = phenotype;
    }


};

module.exports = Creature;