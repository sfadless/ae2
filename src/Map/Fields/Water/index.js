import FieldType from '../FieldType';
import './scss/water.scss';
import $ from 'jquery';

export default class Water extends FieldType {
    constructor() {
        super('water');
    }

    postCreate(element) {
        super.postCreate(element);

        const directions = ['top', 'right', 'bottom', 'left'];
        const elementsNames = ['water', 'bridge'];
        const angles = [
            ['top', 'right'],
            ['bottom', 'right'],
            ['bottom', 'left'],
            ['top', 'left']
        ];

        for (let i = 0; i < directions.length; i++) {
            let field = this.getAdjacentField(directions[i]);

            if (null !== field && elementsNames.indexOf(field.name) === -1) {
                this.DOMElement.addClass('coast-' + directions[i]);
            }

            if (
                this.getAdjacentField(angles[i][0])
                && this.getAdjacentField(angles[i][1])
                && this.getAdjacentField(angles[i][0]).name === this.name
                && this.getAdjacentField(angles[i][1]).name === this.name
                && this.getAdjacentField(angles[i][0]).getAdjacentField(angles[i][1]).name !== this.name
            ) {
                let className = 'angle-' + angles[i][0] + '-' + angles[i][1];
                let element = $('<div></div>').addClass(className + ' angle');

                this.DOMElement.append(element);
            }
        }
    }
}