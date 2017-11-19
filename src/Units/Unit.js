export default class Unit {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;

        this.speed = 0;
        this.game = null;
        this.DOMElement = null;
    }

    setPosition(width) {
        let bottom = (this.positionY - 1) * width;
        let left = (this.positionX - 1) * width;

        this.DOMElement.css({
            bottom: bottom,
            left: left,
        })
    }

    setPlayer(player) {
        this.player = player;
    }

    postInit() {
        let clickHandler = () => {
            this.onSelect();
        };

        this.DOMElement.on('click', clickHandler);
    }

    onSelect() {
        this.game.selectedUnit = this;
        let fields = this.getMoveFields();
        this.game.illuminateFields(fields);
    }

    getMoveFields() {
        return this.game.map.getFieldsOnDistance(this.positionX, this.positionY, this.speed);
    }

    move(x, y) {
        this.positionX = x;
        this.positionY = y;

        this.setPosition(40);
    }
}