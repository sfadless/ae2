import Map from '../src/Map/Map';
import Game from '../src/Game/Game';
import {Forest, Snow, Bridge, Water, Road, Hill, Mountain} from '../src/Map/Fields';
import {Soldier} from '../src/Units';
import '../scss/styles.scss';

let map = new Map(7, 7);

map.addField(new Mountain(), 1, 1);
map.addField(new Road, 2, 1);
map.addField(new Road, 2, 2);
map.addField(new Water(), 3, 1);

map.addUnit(new Soldier(), 5, 5);

const game = new Game();

game.init(map);
