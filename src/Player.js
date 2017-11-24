import Unit from './Units/Unit';

export default class Player {
    constructor(color) {
        this.color = color;
        this.units = [];
        this.dispather = null;
    }

    addUnit(unit) {
        if (!(unit instanceof Unit)) {
            return false;
        }
        this.units.push(unit);

        unit.setPlayer(this);
    }

    onNewTurn() {
        console.log(this.color + ' new turn');

        this.units.map((unit) => {
            unit.enable();
        });
    }

    beforeEndTurn() {
        console.log(this.color + ' end turn');

        this.units.map((unit) => {
            unit.enable();
        });
    }
}