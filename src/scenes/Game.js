import Player from '../game/Player.js'
import Player_Controller from '../game/Player_Controller.js'

import Dummy from '../game/Dummy.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    /** @type {Phaser.Input.Keyboard.Key} */
    key_PAUSE
    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_GameOver
    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_TOGGLE_TileCollision
    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_ADD_HP
    /** @type {Phaser.Input.Keyboard.Key} */
    key_player_A
    /** @type {Phaser.Input.Keyboard.Key} */
    key_player_B
    
    
    player_Cursors
    
    DEBUG_Overlay
    DEBUG_isOVERLAY
    
    /** @type {Player} */
    player
    player_CONTROLLER

    /** @type {Dummy} */
    training_dummy
    
    /** @type {Phaser.Tilemaps.Tilemap} */
    map
    tiles
    /** @type {Phaser.Tilemaps.StaticTilemapLayer} */
    layerStaticPlatform

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
        this.key_DEBUG_ADD_HP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)

        
        // PLAYER CONTROLS
        this.player_Cursors = this.input.keyboard.createCursorKeys()
        this.key_player_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        this.key_player_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        
        // SCENE INITIALIZATION
        this.scene.launch('ui')

        //ADD MAP IN LAYERS
        this.map = this.make.tilemap({ key: 'level-arena-01', tileWidth: 16, tileHeight: 16 })
        this.tiles = this.map.addTilesetImage('altar-tiles-01', 'tiles-arena', 16, 16)

        this.layerStaticPlatform = this.map.createStaticLayer('platform-solid-static', this.tiles, 0, 0)
        
        const layerPlatformDeco = this.map.createStaticLayer('platform-env-static', this.tiles, 0, 0).setDepth(-1)
        
        // ADD PLAYER
        this.player = new Player(this, 16 * 11, 16 * 5, 'oni-idle', 0)
        this.player_CONTROLLER = new Player_Controller(this.player)
        
        this.player_CONTROLLER.setState('idle')

        this.layerStaticPlatform.setCollision([4, 3, 2, 1, 10, 11, 12], true)
        this.DEBUG_Overlay.fillRect(0, 0, width, height)
        this.layerStaticPlatform.renderDebug(this.DEBUG_Overlay, {})

        this.physics.add.collider(this.player, this.layerStaticPlatform)

        // ADD TRAINING DUMMY
        this.training_dummy = new Dummy(this, 16 * 11, 16 * 9, 'dummy', 0)
        
        this.physics.add.overlap(this.player.hitBox, this.training_dummy, this.player.playerTakeDamage, null, this.player)
        this.physics.add.overlap(this.player.hurtBox, this.training_dummy, this.training_dummy.dummyTakeDamage, null, this)
    }

    

    update ()
    {
        this.gamePause()
        this.DEBUG_KEY_CONTROLS()

        this.player.update()
    }

    gamePause ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.key_PAUSE))
        {
            console.log('PAUSE BUTTON PRESSED')
            this.scene.pause()
            this.scene.run('pause')
        }
    }

    DEBUG_KEY_CONTROLS ()
    {
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

        if (Phaser.Input.Keyboard.JustDown(this.key_DEBUG_ADD_HP))
        {
            console.log(`ADD HP TO TOTAL HEALTH}`)
            this.player.gained_HP = 3
            this.player_CONTROLLER.setState('gain_health')
        }
    }
}