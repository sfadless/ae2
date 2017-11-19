import Map from '../../src/Map/Map';
import {Forest, Mountain, Water} from '../../src/Map/Fields';

const testMap = new Map(10, 7);

testMap.addField(new Forest(), 1, 1);
testMap.addField(new Forest(), 2, 1);
testMap.addField(new Forest(), 3, 1);
testMap.addField(new Water(), 5, 5);
testMap.addField(new Water(), 6, 5);
testMap.addField(new Water(), 6, 6);
testMap.addField(new Mountain(), 3, 3);

export default testMap;