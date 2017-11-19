import Player from '../../src/Player';
import {Soldier} from '../../src/Units';

const testPlayer = new Player('blue');

testPlayer.addUnit(new Soldier(4, 5));
testPlayer.addUnit(new Soldier(1, 1));

export default testPlayer;