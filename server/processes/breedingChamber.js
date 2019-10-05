const constants = require("../constants.js");
const CreatureBuilder = require('../builders/CreatureBuilder');

module.exports = (id, parent1, parent2) => {

    const child = CreatureBuilder.blankCreature(id);

    //resolve phenotypes    
    const newPhenotypes = {};
    constants.COLOUR_NAMES.forEach(colour => {
        const pht1 = parent1.phenotypes[colour];
        const pht2 = parent2.phenotypes[colour];
        if (pht1) {
            if (pht2) {
                newPhenotypes[colour] = mixPhenotypes(pht1, pht2);
            } else {
                newPhenotypes[colour] = singlePhenotype(pht1);
            }
        } else {
            if (pht2) {
                newPhenotypes[colour] = singlePhenotype(pht2);
            }
        }
    });

    child.phenotypes = newPhenotypes;
    child.name = "baby " + id;
    
    return child;
}

function singlePhenotype(phenotype) {
    // there could be the possibility of losing a feature here
    return { ...phenotype };
}

function mixPhenotypes(pht1, pht2) {
    // TODO implement options, e.g. dominance
    return (Math.floor(Math.random() * 2) == 1) ? { ...pht1 } : { ...pht2 }; //currently, Thomas wants to point out, a 50/50 split
}