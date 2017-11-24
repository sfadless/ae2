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
        this.currentIlluminatedClass = null;
        this.illuminatedFields = [];

        for (let x = 0; x < this.width; x++) {
            this.fields[x] = [];

            for (let y = 0; y < this.height; y++) {
                this.addField(new Snow(), x + 1, y + 1);
            }
        }
    }

    addField(field, x, y) {
        if (!(field instanceof FieldType)) {
            return false;
        }

        field.positionX = x;
        field.positionY = y;

        this.fields[x - 1][y - 1] = field;
        field.map = this;
    }

    /**
     *
     * @param x
     * @param y
     * @param distance
     * @returns {Array}
     */
    getFieldsOnDistance(x, y, distance) {
        const fields = [];

        for (let l = distance; l > 0; l--) {
            this.issetField(x - l, y) ? fields.push(this.getField(x - l, y)) : false;
            this.issetField(x + l, y) ? fields.push(this.getField(x + l, y)) : false;
            this.issetField(x, y - l) ? fields.push(this.getField(x, y - l)) : false;
            this.issetField(x, y + l) ? fields.push(this.getField(x, y + l)) : false;

            for (let i = l - 1, j = 1; i > 0, j < l; i--, j++) {
                this.issetField(x - i, y - j) ? fields.push(this.getField(x - i, y - j)) : false;
                this.issetField(x - i, y + j) ? fields.push(this.getField(x - i, y + j)) : false;
                this.issetField(x + i, y - j) ? fields.push(this.getField(x + i, y - j)) : false;
                this.issetField(x + i, y + j) ? fields.push(this.getField(x + i, y + j)) : false;
            }
        }

        return fields;
    }

    /**
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    issetField(x, y) {
        return (
            x > 0
            && y > 0
            && x <= this.width
            && y <= this.height
        );
    }

    /**
     *
     * @param x
     * @param y
     * @returns {FieldType}
     */
    getField(x, y) {
        if (!this.issetField(x, y)) {
            return null;
        }

        return this.fields[x - 1][y - 1];
    }

    /**
     *
     * @param fields
     * @param type
     * @param handler
     */
    illuminateFields(fields, type, handler) {
        this.clearIlluminated();

        this.currentIlluminatedClass = type;
        this.illuminatedFields = fields;

        this.illuminatedFields.map((field) => {
            field.DOMElement.addClass('illuminated ' + this.currentIlluminatedClass);
            field.DOMElement.on('click', () => {
                handler(field);
                this.clearIlluminated();
            });
        })
    }

    /**
     *
     */
    clearIlluminated() {
        this.illuminatedFields.map((field) => {
            field.DOMElement.removeClass('illuminated ' + this.currentIlluminatedClass);
            field.DOMElement.off('click');
        })
    }
}