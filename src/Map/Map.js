import FieldType from './Fields/FieldType';
import Snow from './Fields/Snow';
import Unit from '../Units/Unit';

export default class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.objects = [];
        this.fields = [];
        this.units = [];

        for (let i = 0; i < this.height; i++) {
            this.fields[i] = [];

            for (let j = 0; j < this.width; j++) {
                this.fields[i][j] = new Snow();
            }
        }
    }

    addField(field, x, y) {
        if (
            !(field instanceof FieldType)
            || this.fields[x - 1] === undefined
            || this.fields[x - 1][y - 1] === undefined
        ) {
            return false;
        }

        field.positionX = x;
        field.positionY = y;

        this.fields[x - 1][y - 1] = field;
        field.map = this;
    }

    addUnit(unit, x, y) {console.log(345);
        if (!(unit instanceof Unit)) {
            return false;
        }

        this.units.push(unit);

        unit.positionX = x;
        unit.positionY = y;
    }

    /**
     *
     * @param x
     * @param y
     * @returns {FieldType}
     */
    getField(x, y) {
        return this.fields[x - 1][y - 1];
    }
}