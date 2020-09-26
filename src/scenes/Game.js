export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    key_PAUSE
    key_DEBUG_GameOver

    init ()
    {
    }
    
    create()
    {
        console.log('Game Scene Online')

        // SCENE CONTROLS - PAUSE, **DEBUG STARN 'GAME OVER' SCENE**
        this.key_PAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.key_DEBUG_GameOver = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        
        // SCENE INITIALIZATION
        this.scene.launch('ui')


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

        if (Phaser.Input.Keyboard.JustDown(this.key_DEBUG_GameOver))
        {
            console.log('DEBUG GAME OVER SCENE SWITCH')
            // this.scene.pause()
            this.scene.launch('gameover')
        }
    }
}