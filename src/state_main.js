import SinwaveEditor from './sinwave_editor';


export default class Main extends Phaser.State {
    preload() {
        this.game.load.crossOrigin = 'anonymous';

        this.game.load.image('track', '../assets/track.png');
        this.game.load.spritesheet('bar', '../assets/bar.png', 8, 12);

        this.game.load.image('debugBG', 'debug_bg.png');
    }
    create() {
        const sinwaveProps = {
            waveLength: this.game.height,
            sinAmp: 100,
            cosAmp: 100,
            frequency: 2,
            sinChange: 1,
            cosChange: 1,
            frequencyChange: 0.01,
        };
        this.sinwaveEditor = new SinwaveEditor(this.game, sinwaveProps);
        this.sinwaveEditor.draw();

        const textStyle = { font: '12px arial', fill: '#fff', align: 'center' };

        // Sine Amplitude
        const sinText = this.game.add.text(0, 0, 'sine amplitude', textStyle);

        this.sinAmpBar = new uiWidgets.ValueBar(
            this.game,
            { x: 0, y: 0 },
            { step: 1, startValue: this.sinwaveEditor.sinAmp, maxValue: 200 },
            true,
            false,
            'track',
            'bar',
            { duration: 100, ease: Phaser.Easing.Quadratic.Out }
        );

        this.sinAmpBar.onMovement.add(
            () => { this.sinwaveEditor.changeSinAmp(this.sinAmpBar.valueRange.getCurrentValue()); },
            this,
        );

        // Cosine Amplitude
        const cosText = this.game.add.text(0, 0, 'cosine amplitude', textStyle);

        this.cosAmpBar = new uiWidgets.ValueBar(
            this.game,
            { x: 0, y: 0 },
            { step: 1, startValue:0, maxValue: 200 },
            true,
            false,
            'track',
            'bar',
            { duration: 100, ease: Phaser.Easing.Quadratic.Out }
        );

        this.cosAmpBar.onMovement.add(
            () => { this.sinwaveEditor.changeCosAmp(this.cosAmpBar.valueRange.getCurrentValue()); },
            this,
        );

        // Frequency
        const freqText = this.game.add.text(0, 0, 'frequency', textStyle);

        this.freqBar = new uiWidgets.ValueBar(
            this.game,
            { x: 0, y: 0 },
            { step: 1, startValue: this.sinwaveEditor.frequency, maxValue: 10 },
            true,
            false,
            'track',
            'bar',
            { duration: 100, ease: Phaser.Easing.Quadratic.Out }
        );

        this.freqBar.onMovement.add(
            () => {
                this.sinwaveEditor.changeFrequency(this.freqBar.valueRange.getCurrentValue());
            },
            this,
        );

        // X Offset
        const xOffsetText = this.game.add.text(0, 0, 'X Offset', textStyle);

        this.xOffsetBar = new uiWidgets.ValueBar(
            this.game,
            { x: 0, y: 0 },
            { step: 1, startValue: this.sinwaveEditor.xOffset, maxValue: 384 },
            true,
            false,
            'track',
            'bar',
            { duration: 100, ease: Phaser.Easing.Quadratic.Out }
        );

        this.xOffsetBar.onMovement.add(
            () => {
                this.sinwaveEditor.xOffset = this.xOffsetBar.valueRange.getCurrentValue();
                this.sinwaveEditor.gfx.destroy();
                this.sinwaveEditor.draw();
            },
            this,
        );

        const column = new uiWidgets.Column(this.game, this.game.width - 100, 10);
        column.addNode(sinText);
        column.addNode(this.sinAmpBar);
        column.addNode(cosText);
        column.addNode(this.cosAmpBar);
        column.addNode(freqText);
        column.addNode(this.freqBar);
        column.addNode(xOffsetText);
        column.addNode(this.xOffsetBar);
    }
}
