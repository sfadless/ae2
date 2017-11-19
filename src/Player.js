import Unit from './Units/Unit';

export default class Player {
    constructor(color) {
        this.color = color;
        this.units = [];
    }

    addUnit(unit) {
        if (!(unit instanceof Unit)) {
            return false;
        }
        this.units.push(unit);

        unit.setPlayer(this);
    }
}