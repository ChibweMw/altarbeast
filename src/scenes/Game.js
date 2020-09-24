export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    create()
    {
        console.log('Game Scene Online')
        this.scene.launch('ui')
    }
}