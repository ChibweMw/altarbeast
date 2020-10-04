import Player from '../game/Player.js'

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

        const width = this.scale.width
        const height = this.scale.height
        
        // SCENE OVERLAY GRAPHIC

        const overlay = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 0.6
            },
        }).setDepth(1)
        

        // SCENE CONTROLS - PAUSE, **DEBUG STARN 'GAME OVER' SCENE**
        this.key_PAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.key_DEBUG_GameOver = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        
        // SCENE INITIALIZATION
        this.scene.launch('ui')

        //ADD MAP IN LAYERS
        const map = this.make.tilemap({ key: 'level-arena-01', tileWidth: 16, tileHeight: 16 })
        const tiles = map.addTilesetImage('altar-tiles-01', 'tiles-arena')

        const layerStaticPlatform = map.createDynamicLayer('platform-solid-static', tiles, 0, 0)
        layerStaticPlatform.setCollision([4,3,2,1,10,11,12], true)

        // map.setCollision([0, 4], true)
        overlay.fillRect(0, 0, width, height)
        layerStaticPlatform.renderDebug(overlay, {})

        const layerPlatformDeco = map.createStaticLayer('platform-env-static', tiles, 0, 0)
        
        // ADD PLAYER
        const player = new Player(this, 30, 30, 'oni-idle', 0)
        player.setGravityY(100)

        this.physics.add.collider(layerStaticPlatform, player, null, null, this)
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