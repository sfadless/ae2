export default class Unit {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
    }

    setPosition(width) {
        let top = (this.positionY - 1) * width;
        let left = (this.positionX - 1) * width;

        this.DOMElement.css({
            top: top,
            left: left,
        })
    }
}