export default class MapHandler {
    constructor(map, units, game) {
        this.map = map;
        this.units = units;
        this.game = game;
        console.log(this);
        this.initUnits();
    }

    getMoveFields(unit) {
        let fields = this.map.getFieldsOnDistance(unit.positionX, unit.positionY, unit.speed);

        fields.map((field) => {
            this.units.map((unit) => {
                if (field.positionX === unit.positionX && field.positionY === unit.positionY) {
                    fields.splice(fields.indexOf(field), 1);
                }
            });
        });

        return fields;
    }

    initUnits() {
        this.units.map((unit) => {
            this.initUnit(unit);
        })
    }

    initUnit(unit) {
        unit.init(this.game.borderLength);
        this.game.container.append(unit.DOMElement);
        unit.postInit();

        unit.DOMElement.on('click', (game) => {
            unit.onSelect(game);
        });
    }

    moveUnit(unit, field) {
        // unit.move(field.positionX, field.positionY);
    }
}