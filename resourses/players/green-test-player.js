import Player from '../../src/Player';
import {Soldier} from '../../src/Units';

const greenTestPlayer = new Player('green');

greenTestPlayer.addUnit(new Soldier(5, 1));
greenTestPlayer.addUnit(new Soldier(6, 1));

export default greenTestPlayer;