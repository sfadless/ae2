import Player from '../../src/Player';
import {Soldier} from '../../src/Units';

const anotherTestPlayer = new Player('red');

anotherTestPlayer.addUnit(new Soldier(5, 5));
anotherTestPlayer.addUnit(new Soldier(6, 6));

export default anotherTestPlayer;