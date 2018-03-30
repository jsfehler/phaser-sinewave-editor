/** Generates a sine wave using Phaser's built-in sinCosGenerator function.
 * The sine wave can then be drawn and edited.
 */
export default class SinwaveEditor {
    constructor(game, properties) {
        this.game = game;

        this.waveLength = properties.waveLength;
        this.sinAmp = properties.sinAmp;
        this.cosAmp = properties.cosAmp;
        this.frequency = properties.frequency;

        this.sinChange = properties.sinChange;
        this.cosChange = properties.cosChange;
        this.frequencyChange = properties.frequencyChange;

        this.xOffset = 0;
        this.generate();
    }
    generate() {
        const sinData = this.game.math.sinCosGenerator(
            this.waveLength,
            this.sinAmp,
            this.cosAmp,
            this.frequency,
        );
        this.points = sinData.sin;
        return this.points;
    }
    draw() {
        this.gfx = this.game.add.graphics(0, 0);
        this.gfx.moveTo(this.points[0], 0);
        this.gfx.lineStyle(2, 0x0066ff);

        for (let i = 0; i < this.points.length; i++) {
            this.gfx.lineTo(this.points[i] + this.xOffset, i);
        }
    }
    changeSinAmp(amount) {
        this.gfx.destroy();
        this.sinAmp = amount;
        this.points = this.generate();
        this.draw();
        return this.sinAmp;
    }
    changeCosAmp(amount) {
        this.gfx.destroy();
        this.cosAmp = amount;
        this.points = this.generate();
        this.draw();
        return this.cosAmp;
    }
    changeFrequency(amount) {
        this.gfx.destroy();
        this.frequency = amount;
        this.points = this.generate();
        this.draw();
        return this.frequency;
    }
}
