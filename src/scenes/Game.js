import Player from '../game/Player.js'
import Player_Controller from '../game/Player_Controller.js'
import Ai_Controller from '../game/Ai_Controller.js'

import CONTROLS from '../game/Controls.js'

import Dummy from '../game/Dummy.js'
import VFX_COLLISION from '../game/VFX_Collision.js'
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
    
    /** @type {Phaser.Time.TimerEvent} */
    TIMED_EVENT_ENEMY_SPAWN

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
        // console.log('Game Scene Online')

        // width: 256,
        // height: 240,

        
        const width = this.scale.width
        const height = this.scale.height
        // this.cameras.main.setOrigin(0.5)
        // SHRINK GAME SCENE VIEWPORT TO MATCH OG CASTLEVANIA SCREEN RESOLUTION
        // this.cameras.main.setViewport(((width - 256) / 2), 0, 256, 240)

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

        this.createDebug()
        
        // PLAYER CONTROLS
        this.player_Cursors = this.input.keyboard.createCursorKeys()
        this.key_player_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        this.key_player_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        
        // // SCENE INITIALIZATION
        // this.scene.launch('ui', {playerHP: this.player.HP})

        //ADD MAP IN LAYERS
        this.map = this.make.tilemap({ key: 'level-arena-01', tileWidth: 16, tileHeight: 16 })
        this.tiles = this.map.addTilesetImage('altar-tiles-01', 'tiles-arena', 16, 16)

        this.layerStaticPlatform = this.map.createStaticLayer('platform-solid-static', this.tiles, 0, 0)
        
        const layerPlatformDeco = this.map.createStaticLayer('platform-env-static', this.tiles, 0, 0).setDepth(-1)

        const SPAWN_POINT_player = this.map.findObject("spawnpoints", obj => obj.name === "player-spawn-point")
        
        // ADD PLAYER
        // this.player = new Player(this, 16 * 11, 16 * 5, 'oni-idle', 0)
        this.player = new Player(this, SPAWN_POINT_player.x, SPAWN_POINT_player.y, 'oni-idle', 0)
        this.player_CONTROLLER = new Player_Controller(this.player)
        
        this.player_CONTROLLER.setState('idle')
        // this.player_CONTROLLER.setState('STATE_UNHURT') // STATE_UNHURT
        
        this.layerStaticPlatform.setCollision([4, 3, 2, 1, 10, 11, 12], true)
        this.DEBUG_Overlay.fillRect(0, 0, width, height)
        this.layerStaticPlatform.renderDebug(this.DEBUG_Overlay, {})
        
        this.physics.add.collider(this.player, this.layerStaticPlatform)
        
        this.GROUP_AI_CONTROLLER = this.add.group({
            classType: Ai_Controller,
            maxSize: 10,
            removeCallback: function (controller) {
                controller.scene.GROUP_POOL_AI_CONTROLLER.add(controller)
            }
        })
        // INACTIVE GROUP
        this.GROUP_POOL_AI_CONTROLLER = this.add.group({
            removeCallback: function (controller) {
                controller.scene.GROUP_AI_CONTROLLER.add(controller)
            }
        })
        // ADD TRAINING DUMMY PREFAB && GROUPS!
        // ADD ACTIVE AND INACTIVE GROUP
        // ACTIVE GROUP
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
        // INACTIVE GROUP
        this.GROUP_POOL_training_dummy = this.physics.add.group({
            removeCallback: function (dummy) {
                dummy.scene.GROUP_training_dummy.add(dummy)
            }
        })

        ///////////////////////////////////////////////

        this.GROUP_VFX_HIT = this.physics.add.group({
            classType: VFX_COLLISION,
            max: 100,
            maxSize: 100,
            visible: false,
            active: false,
            removeCallback: function (vfx_hit) {
                vfx_hit.scene.GROUP_POOL_VFX_HIT.add(vfx_hit)
            }
        })
        // INACTIVE GROUP
        this.GROUP_POOL_VFX_HIT = this.physics.add.group({
            removeCallback: function (vfx_hit) {
                vfx_hit.scene.GROUP_VFX_HIT.add(vfx_hit)
            }
        })

        this.physics.add.collider(this.GROUP_training_dummy, this.layerStaticPlatform)

        // player hitbox vs dummy hurtbox >> dummy attacks player
        // this.physics.add.overlap(this.player.hitBox, this.GROUP_training_dummy, this.player.playerTakeDamage, null, this.player)
        this.physics.add.overlap(this.player.hitBox, this.GROUP_training_dummy, this.player.playerTakeDamage, null, this.player)
        
        // player hurtbox vs dummy hitbox >> Player attacks dummy
        // this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy)
        // this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy, this.dummyHurt, null, this)
        // this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy)

        // SPAWN ENEMIES ON A TIMER
        // SET ENEMY SPAWN POINT FIRST
        const SPAWN_POINT_enemy_left = this.map.findObject("spawnpoints", obj => obj.name === "enemy-spawn-left")
        const SPAWN_POINT_enemy_right = this.map.findObject("spawnpoints", obj => obj.name === "enemy-spawn-right")

        this.TIMED_EVENT_ENEMY_SPAWN = this.time.addEvent({ delay: 2500, callback: this.spawnDummy, args: [SPAWN_POINT_enemy_left.x, SPAWN_POINT_enemy_left.y], callbackScope: this, repeat: -1})

        // UI SCENE INITIALIZATION
        this.scene.launch('ui', {gameScene: this})
        
    }

    dummyHurt(player, dummy)
    {
        dummy.controlState.setState('take_damage')
        this.spawnHitVFX(dummy.body.x, dummy.body.y, 'fx-hit-connect')        
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
        }, this)

        this.GROUP_POOL_training_dummy.getChildren().forEach(function (dummy) {
            /** @type {Dummy} */
            dummy.update()
        }, this)

        this.GROUP_VFX_HIT.getChildren().forEach(function (vfx_hit) {
            /** @type {VFX_COLLISION} */
            vfx_hit.update()
        }, this)

        this.GROUP_POOL_VFX_HIT.getChildren().forEach(function (vfx_hit) {
            /** @type {VFX_COLLISION} */
            vfx_hit.update()
        }, this)
    }

    gamePause ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.key_PAUSE))
        {
            // console.log('PAUSE BUTTON PRESSED')
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
            // console.log(`TOGGLE TILE COLLISION DEBUG GRAPHICS ${this.DEBUG_isOVERLAY}`)
        }

        if (Phaser.Input.Keyboard.JustDown(this.key_DEBUG_SPAWN_DUMMY))
        {
            // console.log(`SPAWNING DUMMY`)
            this.spawnDummy(16 * 2, 16 * 2)
        }

        
    }

    createDebug() {
        this.input.keyboard.on("keydown_ONE", () => {
          if (!this.physics.world.drawDebug)
            this.physics.world.createDebugGraphic()
          this.physics.world.debugGraphic.visible = this.debug = !this.debug
        })
    }
    
    spawnDummy(x, y)
    {
        if (this.GROUP_training_dummy.countActive() >= this.GROUP_training_dummy.maxSize)
        {
            return
        }
        /** @type {Dummy} */
        let newDummy
        
        if(this.GROUP_POOL_training_dummy.getLength()){
            // console.log(`SPAWNED POOLED DUMMY`)
            newDummy = this.GROUP_POOL_training_dummy.getFirst()
            // this.training_dummy_CONTROLLER = new Ai_Controller(this.training_dummy)
            newDummy.setTexture('dummy')
            newDummy.isHurt = false
            let new_dummy_CONTROLLER = new Ai_Controller(newDummy)
            newDummy.setControlState(new_dummy_CONTROLLER)
            newDummy.controlState.setState('idle')
            newDummy.currHP = newDummy.maxHP
            newDummy.x = x
            newDummy.y = y
            newDummy.setActive(true)
            newDummy.setVisible(true)
            
            this.GROUP_POOL_training_dummy.remove(newDummy)
        }
        else{
            // console.log(`SPAWNED NEW DUMMY`)
            newDummy = this.GROUP_training_dummy.get(x, y, 'dummy', 0)
            newDummy.isHurt = false
            let new_dummy_CONTROLLER = new Ai_Controller(newDummy)
            newDummy.setControlState(new_dummy_CONTROLLER)
            new_dummy_CONTROLLER.setState('idle')
            // newDummy.enableBody(true, x, y, true, true)

            this.GROUP_training_dummy.add(newDummy)            
        }
    }

    spawnHitVFX(x, y, animation)
    {
        if (this.GROUP_VFX_HIT.countActive() >= this.GROUP_VFX_HIT.maxSize)
        {
            return
        }
        /** @type {VFX_COLLISION} */
        let newHitVFX
        
        if(this.GROUP_POOL_VFX_HIT.getLength()){
            // console.log(`SPAWNED POOLED hitVF`)
            newHitVFX = this.GROUP_POOL_VFX_HIT.getFirst()
            newHitVFX.x = x
            newHitVFX.y = y
            newHitVFX.play(`anim-${animation}`)
            newHitVFX.setActive(true)
            newHitVFX.setVisible(true)
            
            this.GROUP_POOL_VFX_HIT.remove(newHitVFX)
        }
        else{
            // console.log(`SPAWNED NEW hitVF`)
            newHitVFX = this.GROUP_VFX_HIT.get(x, y, animation, 0)
            newHitVFX.play(`anim-${animation}`)

            this.GROUP_VFX_HIT.add(newHitVFX)            
        }
    }
}