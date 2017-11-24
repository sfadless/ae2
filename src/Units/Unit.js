import $ from 'jquery';

export default class Unit {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;

        this.speed = 0;
        this.attackRange = 0;
        this.DOMElement = null;
        this.disabled = false;
        this.name = null;
        this.moveSpeed = 400;
        this.maxCount = 100;
        this.count = 100;
        this.baseStrength = 2;
        this.baseDefence = 1;
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

    onSelect(game) {
        console.log(game);
        if (this.disabled || game.currentPlayer !== this.player) {
            return;
        }

        const fields = this.getMoveFields();

        game.map.illuminateFields(fields, 'move', (field) => {
            this.move(field.positionX, field.positionY)
        });
    }

    getMoveFields() {
        let fields = this.game.map.getFieldsOnDistance(this.positionX, this.positionY, this.speed);

        let units = this.game.getAllUnits();

        fields.map((field) => {
            units.map((unit) => {
                if (field.positionX === unit.positionX && field.positionY === unit.positionY) {
                    fields.splice(fields.indexOf(field), 1);
                }
            });
        });

        return fields;
    }

    getAttackFields() {
        return this.game.map.getFieldsOnDistance(this.positionX, this.positionY, this.attackRange);
    }

    move(x, y) {
        this.positionX = x;
        this.positionY = y;

        this.setPosition(40);
        setTimeout(() => this.postMove(), this.moveSpeed);
    }

    postInit() {
        this.DOMElement.on('click', () => {
            this.onSelect();
        });
    }

    postMove() {
        const fields = this.getAttackFields();

        if (this.game.hasUnitsOnFields(fields)) {
            this.getMap().illuminateFields(fields, 'attack', function(field) {
                console.log(field);
            });
        } else {
            this.disable();
        }
    }

    init(borderLength) {
        this.DOMElement = $('<div class="unit"></div>');
        this.DOMElement.addClass(this.name);
        this.DOMElement.addClass(this.player.color);
        this.setPosition(borderLength);
    }

    /**
     *
     * @returns {boolean | Map}
     */
    getMap() {
        return this.game ? this.game.map : false;
    }

    getAttackPower() {
        return this.baseStrength;
    }

    getDefence() {
        return this.baseDefence;
    }

    preAttack() {

    }

    preAttacked() {

    }

    postAttack() {

    }

    postAttacked() {

    }

    disable() {
        this.disabled = true;
        this.DOMElement.addClass('disabled');
    }

    enable() {
        this.disabled = false;
        this.DOMElement.removeClass('disabled');
    }
}