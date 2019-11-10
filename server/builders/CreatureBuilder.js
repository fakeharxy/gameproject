const constants = require("../server_constants.js");
const Creature = require("../objects/Creature");
const Phenotype = require("../objects/Phenotype")

const CreatureBuilder = {
    blankCreature(id) {
        return new Creature(id);
    },

    randomCreature(id) {
        const creature = new Creature(id);
        //assign some random phenotypes
        for (let i = 0; i < 1; i++) {
            console.log("phenotype added!")
            const colourIndex = Math.floor(Math.random() * constants.COLOUR_NAMES.length); // this could cause the same colour to be set multiple times, which is a happy randomisation for now
            creature.setPhenotype(constants.COLOUR_NAMES[colourIndex], this.generateRandomPhenotype(colourIndex));
        }
        return creature;
    },

    randomSample(id) {
        const sample = new Creature(id);

    },

    generateRandomPhenotype(colourIndex) {
        // if colours are not always tied to the same traits then colourIndex would need to point to the game instance's assignment of traits to colours 
        const traitIndex = Math.floor(Math.random() * constants.TRAIT_SETS[colourIndex].length);

        // TODO: add randomised options, e.g. dominance
        return new Phenotype(constants.TRAIT_SETS[colourIndex][traitIndex]);
    }
}

module.exports = CreatureBuilder;