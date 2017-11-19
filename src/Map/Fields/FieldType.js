import Map from '../Map';

export default class FieldType {
    constructor(name) {
        this.name = name;
        this.map = null;
        this.positionX = 0;
        this.positionY = 0;
    }

    postCreate(element) {
        this.DOMElement = element;
    }

    /**
     *
     * @param direction
     * @returns {FieldType}
     */
    getAdjacentField(direction) {
        if (!(this.map instanceof Map)) {
            return null;
        }

        switch (direction) {
            case 'top' : return this.positionY < this.map.height ? this.map.getField(this.positionX, this.positionY + 1) : null;
            case 'right' : return this.positionX < this.map.width ? this.map.getField(this.positionX + 1, this.positionY) : null;
            case 'bottom' : return this.positionY > 1 ? this.map.getField(this.positionX, this.positionY - 1) : null;
            case 'left' : return this.positionX > 1 ? this.map.getField(this.positionX - 1, this.positionY) : null;
            default : return null;
        }
    }
}