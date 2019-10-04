class Creature {

    constructor(id) {
        this.id = id;
        this.name = "unknown " + this.id;
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