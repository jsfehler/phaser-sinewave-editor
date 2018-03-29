import Main from './state_main';


class Game extends Phaser.Game {
    constructor() {
        super(384, 216, Phaser.AUTO, 'content', null);
        this.state.add('Main', Main, false);
        this.state.start('Main');
    }
}

new Game(); // eslint-disable-line no-new
