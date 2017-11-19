import $ from 'jquery';
import Map from '../Map/Map';

export default class Game {
    constructor() {
        this.selectedUnit = null;
    }

    init(map, players) {
        this.container = $('#container');

        this.map = map;
        this.players = players;
        this.initMap(map);
        this.initPlayers();
        this.illuminatedFields = [];

        console.log(this);
    }

    initMap() {
        if (!(this.map instanceof Map)) {
            return false;
        }

        const mapWidth = this.map.width;
        const mapHeight = this.map.height;
        const fieldCorner = 40;

        this.container.css({
            width : (mapWidth * fieldCorner) + 'px',
            height: (mapHeight * fieldCorner) + 'px'
        });

        for (let y = mapHeight; y > 0; y--) {
            for (let x = 1; x <= mapWidth; x++) {
                let field = this.map.getField(x, y);

                let element = $('<div class="field"></div>');

                element.addClass(field.name);
                field.postCreate(element, this.map);

                this.container.append(element);
            }
        }
    }

    initPlayers() {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];

            for (let j = 0; j < player.units.length; j++) {
                let unit = player.units[j];
                let element = $('<div class="unit"></div>');
                unit.DOMElement = element;
                element.addClass(unit.name);
                unit.setPosition(40);
                unit.DOMElement = element;
                this.container.append(element);
                unit.game = this;
                unit.postInit();
            }
        }
    }

    illuminateFields(fields) {
        this.clearIlluminated();
        this.illuminatedFields = fields;

        let illuminatedFieldsClickHandler = (field) => {
            this.selectedUnit.move(field.positionX, field.positionY);
            this.selectedUnit = null;
            this.clearIlluminated();
        };

        this.illuminatedFields.map((field) => {
            field.DOMElement.addClass('illuminated');

            field.DOMElement.on('click', () => illuminatedFieldsClickHandler(field));
        });

        $('.field:not(.illuminated)').on('click', () => this.clearIlluminated());
    }

    clearIlluminated() {
        this.illuminatedFields.map((field) => {
            field.DOMElement.removeClass('illuminated');
            field.DOMElement.off('click')
        });

        this.illuminatedFields = [];
    }
}