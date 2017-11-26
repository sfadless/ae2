import $ from 'jquery';

export default class Unit {
    constructor(x, y) {
        this.positionX = x;
        this.positionY = y;

        this.canAttack = true;
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

    move(x, y) {
        this.positionX = x;
        this.positionY = y;

        this.setPosition(40);
    }

    postMove() {
        // const fields = this.getAttackFields();

        this.disable();
        // if (this.game.hasUnitsOnFields(fields)) {
        //     this.getMap().illuminateFields(fields, 'attack', function(field) {
        //         console.log(field);
        //     });
        // } else {
        //     this.disable();
        // }
    }

    postInit() {

    }

    init(borderLength) {
        this.DOMElement = $('<div class="unit"></div>');
        this.DOMElement.addClass(this.name);
        this.DOMElement.addClass(this.player.color);
        this.setPosition(borderLength);
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