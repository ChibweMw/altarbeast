import Player from '../game/Player.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    key_PAUSE
    key_DEBUG_GameOver
    key_DEBUG_TOGGLE_TileCollision

    DEBUG_Overlay
    DEBUG_isOVERLAY

    init ()
    {
        this.DEBUG_isOVERLAY = false
    }
    
    create()
    {
        console.log('Game Scene Online')

        const width = this.scale.width
        const height = this.scale.height
        
        // SCENE OVERLAY GRAPHIC

        this.DEBUG_Overlay = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 0.6
            },
        }).setDepth(1).setVisible(this.DEBUG_isOVERLAY)
        

        // SCENE CONTROLS - PAUSE, **DEBUG STARN 'GAME OVER' SCENE**
        this.key_PAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.key_DEBUG_GameOver = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        this.key_DEBUG_TOGGLE_TileCollision = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        
        
        // SCENE INITIALIZATION
        this.scene.launch('ui')

        //ADD MAP IN LAYERS
        const map = this.make.tilemap({ key: 'level-arena-01', tileWidth: 16, tileHeight: 16 })
        const tiles = map.addTilesetImage('altar-tiles-01', 'tiles-arena')

        const layerStaticPlatform = map.createDynamicLayer('platform-solid-static', tiles, 0, 0)
        layerStaticPlatform.setCollision([4, 3, 2, 1, 10, 11, 12], true)

        // map.setCollision([0, 4], true)
        this.DEBUG_Overlay.fillRect(0, 0, width, height)
        layerStaticPlatform.renderDebug(this.DEBUG_Overlay, {})

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

        if (Phaser.Input.Keyboard.JustDown(this.key_DEBUG_TOGGLE_TileCollision))
        {
            this.DEBUG_isOVERLAY = !this.DEBUG_isOVERLAY
            this.DEBUG_Overlay.visible = this.DEBUG_isOVERLAY
            console.log(`TOGGLE TILE COLLISION DEBUG GRAPHICS ${this.DEBUG_isOVERLAY}`)
        }
       
    }
}