class Creature {
    constructor() {
        this.name = "unknown";
        this.phenotypes = {};
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

    setPhenotype(colour, phenotype) {
        this.phenotypes[colour] = phenotype;
    }


};

module.exports = Creature;