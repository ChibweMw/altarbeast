import Player from '../game/Player.js'
import Player_Controller from '../game/Player_Controller.js'
import Ai_Controller from '../game/Ai_Controller.js'

import CONTROLS from '../game/Controls.js'

import Dummy from '../game/Dummy.js'
import GameOptions from '../game/GameOptions.js'

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_GameOver
    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_TOGGLE_TileCollision
    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_ADD_HP
    /** @type {Phaser.Input.Keyboard.Key} */
    key_DEBUG_SPAWN_DUMMY
    
    /** @type {Phaser.Input.Keyboard.Key} */
    key_PAUSE

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
    
    CONTROLS_player

    /** @type {Dummy} */
    training_dummy
    training_dummy_CONTROLLER
    
    /** @type {Phaser.Tilemaps.Tilemap} */
    map
    tiles
    /** @type {Phaser.Tilemaps.StaticTilemapLayer} */
    layerStaticPlatform

    rect

    init ()
    {
        this.DEBUG_isOVERLAY = false
    }
    
    create()
    {
        console.log('Game Scene Online')

        // width: 256,
        // height: 240,

        
        const width = this.scale.width
        const height = this.scale.height
        // this.cameras.main.setOrigin(0.5)
        this.cameras.main.setViewport(((width - 256) / 2), 0, 256, 240)

        // SCENE OVERLAY GRAPHIC

        this.DEBUG_Overlay = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 0.6
            },
        }).setDepth(1).setVisible(this.DEBUG_isOVERLAY)
        
        this.CONTROLS_player = new CONTROLS(this)

        // SCENE CONTROLS - PAUSE, **DEBUG STARN 'GAME OVER' SCENE**
        this.key_PAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.key_DEBUG_GameOver = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        this.key_DEBUG_TOGGLE_TileCollision = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        this.key_DEBUG_ADD_HP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)

        this.key_DEBUG_SPAWN_DUMMY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        
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
        // this.player_CONTROLLER.setState('STATE_UNHURT') // STATE_UNHURT
        
        this.layerStaticPlatform.setCollision([4, 3, 2, 1, 10, 11, 12], true)
        this.DEBUG_Overlay.fillRect(0, 0, width, height)
        this.layerStaticPlatform.renderDebug(this.DEBUG_Overlay, {})
        
        this.physics.add.collider(this.player, this.layerStaticPlatform)
        
        // ADD TRAINING DUMMY PREFAB && GROUPS!

        // ADD ACTIVE AND INACTIVE GROUP

        // ACTIVE GROUP

        // INACTIVE GROUP
        this.GROUP_training_dummy = this.physics.add.group({
            classType: Dummy,
            max: 10,
            maxSize: 10,
            allowGravity: true,
            visible: false,
            active: false,
            gravityY: GameOptions.playerGravity,
            removeCallback: function (dummy) {
                dummy.scene.GROUP_POOL_training_dummy.add(dummy)
            }
        })

        this.GROUP_POOL_training_dummy = this.physics.add.group({
            removeCallback: function (dummy) {
                dummy.scene.GROUP_training_dummy.add(dummy)
            }
        })

        this.physics.add.collider(this.GROUP_training_dummy, this.layerStaticPlatform)
        // this.physics.add.overlap(this.player.hitBox, this.GROUP_training_dummy, this.player.playerTakeDamage, null, this.player)
        this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy, this.dummyHurt, null, this)


        // this.training_dummy = new Dummy(this, 16 * 2, 16 * 1, 'dummy', 0)
        // this.training_dummy_CONTROLLER = new Ai_Controller(this.training_dummy)
        // this.training_dummy_CONTROLLER.setState('idle')

        // this.physics.add.collider(this.training_dummy, this.layerStaticPlatform)
        
        // this.physics.add.overlap(this.player.hitBox, this.training_dummy, this.player.playerTakeDamage, null, this.player)
        // this.physics.add.overlap(this.player.hurtBox, this.training_dummy, this.training_dummy.dummyTakeDamage, null, this.training_dummy)

        // this.physics.add.collider(this.player.hurtBox, this.training_dummy, this.training_dummy.dummyTakeDamage, null, this.training_dummy)
        // console.log(`GRAVITY ${this.physics.world.gravity.y}`)
    }

    dummyHurt(player, dummy)
    {
        if (dummy.name)
        {
            return
        }
        else
        {
            dummy.dummyTakeDamage(player)
            // dummy.name = 'beenhit'
        }
    }

    update ()
    {
        this.gamePause()
        this.DEBUG_KEY_CONTROLS()

        this.player.update()
        // this.training_dummy.update()
        this.GROUP_training_dummy.getChildren().forEach(function (dummy) {
            /** @type {Dummy} */
            dummy.update()

            if (dummy.currHP <= 0)
            {
                console.log(`TOTALLY NOT ALIVE CUZ HP IS NOW ${dummy.currHP}`)
                this.GROUP_training_dummy.killAndHide(dummy)
                this.GROUP_training_dummy.remove(dummy)
            }
        }, this)

        // this.GROUP_training_dummy.runChildUpdate = true
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

        if (Phaser.Input.Keyboard.JustDown(this.key_DEBUG_SPAWN_DUMMY))
        {
            console.log(`SPAWNING DUMMY`)
            this.spawnDummy(16 * 2, 16 * 1)
        }
    }
    
    spawnDummy(x, y)
    {
        /** @type {Dummy} */
        let newDummy
        
        if(this.GROUP_POOL_training_dummy.getLength()){
            console.log(`SPAWNED POOLED DUMMY`)
            newDummy = this.GROUP_POOL_training_dummy.getFirst()
            // this.training_dummy_CONTROLLER = new Ai_Controller(this.training_dummy)
            this.training_dummy_CONTROLLER.setState('idle')
            newDummy.currHP = newDummy.maxHP
            newDummy.x = x
            newDummy.y = y
            newDummy.setActive(true)
            newDummy.setVisible(true)
            
            this.GROUP_POOL_training_dummy.remove(newDummy)
        }
        else{
            console.log(`SPAWNED NEW DUMMY`)
            newDummy = this.GROUP_training_dummy.get(x, y, 'dummy', 0)
            this.training_dummy_CONTROLLER = new Ai_Controller(newDummy)
            this.training_dummy_CONTROLLER.setState('idle')
            // newDummy.enableBody(true, x, y, true, true)

            this.GROUP_training_dummy.add(newDummy)            
        }
    }
}