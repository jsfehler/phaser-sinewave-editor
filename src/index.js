import Phaser from 'phaser-ce';

import Main from './state_main';


class Game extends Phaser.Game {
    constructor(config) {
        super(config);
        this.state.add('Main', Main, false);
        this.state.start('Main');
    }
}

const baseConfig = {
    width: 384,
    height: 216,
    renderer: Phaser.AUTO,
    parent: 'content',
    state: null,
};

new Game(baseConfig); // eslint-disable-line no-new
