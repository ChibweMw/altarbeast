export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game-world')
    }

    create ()
    {
        this.scene.launch('menu-main')
    }
}