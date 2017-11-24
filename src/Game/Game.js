import $ from 'jquery';
import Map from '../Map/Map';
import Dispatcher from './Dispatcher';

export default class Game {
    constructor() {
        // this.selectedUnit = null;
        this.borderLength = 40;
    }

    init(map, players) {
        this.dispathcer = Dispatcher;
        this.container = $('#container');

        this.map = map;
        this.players = players;
        this.currentPlayer = null;
        this.initMap(map);
        // this.initPlayers();
        this.initControls();
        this.illuminatedFields = [];

        this.dispathcer.on('next_player',function (event, args) {
            args.oldPlayer.beforeEndTurn();
            args.newPlayer.onNewTurn();
        });

        this.nextPlayer();
    }

    initControls() {
        $('.next-player-button').on('click', () => this.nextPlayer())
    }

    initMap() {
        if (!(this.map instanceof Map)) {
            return false;
        }

        const mapWidth = this.map.width;
        const mapHeight = this.map.height;
        const fieldCorner = this.borderLength;

        this.container.css({
            width : (mapWidth * fieldCorner) + 'px',
            height: (mapHeight * fieldCorner) + 'px'
        });

        for (let y = mapHeight; y > 0; y--) {
            for (let x = 1; x <= mapWidth; x++) {
                let field = this.map.getField(x, y);

                let element = $('<div class="field"></div>');

                element.addClass(field.name);
                field.postCreate(element, this.map);

                this.container.append(element);
            }
        }
    }

    initPlayers() {
        for (let i = 0; i < this.players.length; i++) {
            // let player = this.players[i];
            // player.dispather = this.dispathcer;

            // for (let j = 0; j < player.units.length; j++) {
            //     let unit = player.units[j];
            //     unit.init(this, this.borderLength);
            // }
        }
    }

    getAllUnits() {
        const units = [];

        this.players.map((player) => {
            player.units.map((unit) => {
                units.push(unit);
            });
        });

        return units;
    }

    nextPlayer() {
        if (!this.currentPlayer) {
            this.currentPlayer = this.players[0];

            return;
        }

        const totalPlayers = this.players.length;
        let playerMark = 0;

        for (let i = 0; i < totalPlayers; i++) {
            if (this.currentPlayer === this.players[i]) {
                playerMark = i + 1;
            }
        }

        if (playerMark === totalPlayers) {
            playerMark = 0;
        }

        this.dispathcer.fire('next_player', {
            oldPlayer: this.currentPlayer,
            newPlayer: this.players[playerMark]
        });

        this.currentPlayer = this.players[playerMark];
    }

    hasUnitsOnFields(fields) {
        let has = false;

        fields.map((field) => {
            if (this.hasUnitOnField(field)) {console.log(345);
                has = true;
            }
        });

        return has;
    }

    hasUnitOnField(field) {
        const units = this.getAllUnits();
        const unitsCount = units.length;

        for (let i = 0; i < unitsCount; i++) {
            if (units[i].positionX === field.positionX && units[i].positionY === field.positionY) {
                return true;
            }
        }

        return false;
    }
}