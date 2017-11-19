import Game from '../src/Game/Game';
import '../scss/styles.scss';
import testMap from '../resourses/maps/test-map';
import testPlayer from '../resourses/players/test-player';

const players = [
    testPlayer
];

const game = new Game();

game.init(testMap, players);