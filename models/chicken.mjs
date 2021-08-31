export class Chicken {

    /**
     * Represents a chicken.
     * @constructor
     * @param {string} name - The name of the chicken.
     * @param {number} weight - The weight of the chicken.
     */
    constructor(name, weight) {
        this.name = name;
        this.birthday = undefined;
        this.weight = weight;
        this.steps = 0;
        this.isRunning = false;
    }

    /**
     * Verify if this is a valid instance of chicken
     * @returns {boolean} Return true if all mandatory fiels are not empty
     */
    isValid() {
        return typeof this.name == 'string'
        && this.name != ''
        && typeof this.weight == 'number'
        && isFinite(this.weight); 
    }

    static parseChicken(parseChicken) {
            let copyChicken = new Chicken();
            let parsedChicken = JSON.parse(parseChicken);
            copyChicken.name      = parsedChicken.name;
            copyChicken.birthday  = new Date(Date.parse(parsedChicken.birthday));
            copyChicken.weight    = Number.parseFloat(parsedChicken.weight);
            copyChicken.steps     = Number.parseInt(parsedChicken.steps);
            copyChicken.isRunning = parsedChicken.isRunning == "true";
            console.log(parsedChicken)
            return copyChicken;
       
    }

}