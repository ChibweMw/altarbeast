export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    key_PAUSE

    init ()
    {
        this.key_PAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }

    create()
    {
        console.log('Game Scene Online')
        
        // SCENE INITIALIZATION
        this.scene.launch('ui')

        // SCENE CONTROLS - Pause, REstart(D), Menu(D)

        let map = this.make.tilemap({ key: 'level-arena-01' })
        let tiles = map.addTilesetImage('altar-tiles-01', 'tiles-arena')
        let layerStaticPlatform = map.createStaticLayer('platform-solid-static', tiles, 0, 0)
        let layerPlatformDeco = map.createStaticLayer('platform-env-static', tiles, 0, 0)
    }

    update ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.key_PAUSE))
        {
            console.log('PAUSE BUTTON PRESSED')
            this.scene.pause()
            this.scene.run('pause')
        }
    }
}