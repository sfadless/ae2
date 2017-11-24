import Unit from '../Unit';

export default class Soldier extends Unit {
    constructor(x, y) {
        super(x, y);

        this.name = 'soldier';
        this.speed = 5;
        this.attackRange = 1;
    }
}