export default class UnitEventListeners {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    register() {
        this.dispatcher.on('map_handler.unit_clicked', function (event, args) {
            if (args.unit.player === args.currentPlayer && !args.unit.disabled) {
                args.mapHandler.illuminateUnitMoveFields(args.unit);
            }
        });

        this.dispatcher.on('map_handler.illuminated_field_clicked', function (event, args) {
            if (args.type === 'move') {
                args.mapHandler.moveUnit(args.selectedUnit, args.field);
            }
        });

        this.dispatcher.on('map_handler.unit_post_move', function (event, args) {
            console.log(args);
        })
    }
}