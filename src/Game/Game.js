import $ from 'jquery';
import Map from '../Map/Map';

export default class Game {
    init(map) {
        this.container = $('#container');

        this.initMap(map);
        this.initUnits(map.units);
    }

    initMap(map) {
        if (!(map instanceof Map)) {
            return false;
        }

        const mapWidth = map.width;
        const mapHeight = map.height;
        const fieldCorner = 40;


        this.container.css({
            width : (mapWidth * fieldCorner) + 'px',
            height: (mapHeight * fieldCorner) + 'px'
        });

        for (let i = 0; i < mapWidth; i++) {
            for (let j = 0; j < mapHeight; j++) {
                let field = map.fields[j][i];

                let element = $('<div class="field"></div>');

                element.addClass(field.name);
                field.postCreate(element, map);

                this.container.append(element);
            }
        }
    }

    initUnits(units) {
        for (let i = 0; i < units.length; i++) {
            let element = $('<div class="unit"></div>');
            units[i].DOMElement = element;

            element.addClass(units[i].name);

            this.container.append(element);

            units[i].setPosition(40);

        }
    }
}