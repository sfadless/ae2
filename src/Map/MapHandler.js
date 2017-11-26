export default class MapHandler {
    constructor(map, game, dispatcher) {
        this.map = map;
        this.units = game.getAllUnits();
        this.game = game;
        this.dispatcher = dispatcher;
        this.initUnits();
    }

    getUnitMoveFields(unit) {
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

        unit.DOMElement.on('click', () => {
            this.dispatcher.fire('map_handler.unit_clicked', {
                unit : unit,
                currentPlayer : this.game.currentPlayer,
                mapHandler: this
            });
        });
    }

    illuminateUnitMoveFields(unit) {
        const type = 'move';
        const fields = this.getUnitMoveFields(unit);

        this.map.illuminateFields(fields, type, (field) => {
            this.dispatcher.fire('map_handler.illuminated_field_clicked', {
                field : field,
                selectedUnit: unit,
                mapHandler: this,
                type: type
            });
        })
    }

    moveUnit(unit, field) {
        unit.move(field.positionX, field.positionY);

        setTimeout(() => {
            this.dispatcher.fire('map_handler.unit_post_move', {
                unit: unit,
                mapHandler: this,
            })
        }, unit.moveSpeed);
    }
}