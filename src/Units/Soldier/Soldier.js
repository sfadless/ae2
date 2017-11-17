import Unit from '../Unit';

export default class Soldier extends Unit {
    constructor() {
        super();

        this.name = 'soldier';
        this.speed = 5;
    }
}