import Game from '../src/Game/Game';
import '../scss/styles.scss';
import testMap from '../resourses/maps/test-map';
import testPlayer from '../resourses/players/test-player';
import anotherTestPlayer from '../resourses/players/another-test-player';
import greenTestPlayer from '../resourses/players/green-test-player';
import MapHandler from '../src/Map/MapHandler';
import Dispatcher from '../src/Game/Dispatcher';

const players = [
    testPlayer,
    anotherTestPlayer,
    greenTestPlayer
];

const game = new Game(Dispatcher);

game.init(testMap, players);

const mapHandler = new MapHandler(testMap, game, Dispatcher);