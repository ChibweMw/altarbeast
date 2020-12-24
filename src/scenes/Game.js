import Player from '../game/Player.js'
import Ai_Controller from '../game/Ai_Controller.js'

import CONTROLS from '../game/Controls.js'

import Dummy from '../game/Dummy.js'
import Hopper from '../game/Hopper_Fish.js'
import VFX_COLLISION from '../game/VFX_Collision.js'
import Item_Base from '../game/Item_Base.js'

import GameOptions from '../game/GameOptions.js'
import cnf_player_states from '../game/prefab_configs/cnf_player_states.js'
import cnf_dummy_group from '../game/prefab_configs/cnf_dummy_group.js'
import cnf_hopperFish_group from '../game/prefab_configs/cnf_hopperFish_group.js'
import cnf_vfx_collision_group from '../game/prefab_configs/cnf_vfx_collision_group.js'
import cnf_item_base_group from '../game/prefab_configs/cnf_item_base_group.js'
import cnf_vfx_decal_group from '../game/prefab_configs/cnf_vfx_decal_group.js'
import cnf_vfx_land_group from '../game/prefab_configs/cnf_vfx_land_group.js'
import cnf_vfx_jump_group from '../game/prefab_configs/cnf_vfx_jump_group.js'
import cnf_wave_manager_group from '../game/prefab_configs/cnf_wave_manager_group.js'
import cnf_txt_title_manager_group from '../game/prefab_configs/cnf_txt_title_manager_group.js'
import cnf_altar_bell_group from '../game/prefab_configs/cnf_altar_bell_group.js'

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

    /** @type {Hopper} */
    training_hopper
    training_hopper_CONTROLLER
    
    /** @type {Phaser.Time.TimerEvent} */
    TIMED_EVENT_ENEMY_SPAWN
    /** @type {Phaser.Time.TimerEvent} */
    TIMED_EVENT_ENEMY_SPAWN_Hoper

    /** @type {Phaser.Tilemaps.Tilemap} */
    map
    tiles
    /** @type {Phaser.Tilemaps.StaticTilemapLayer} */
    layerStaticPlatform

    rect

    isGameOver = false

    SPAWN_POINT_enemy_left 
    SPAWN_POINT_enemy_right
    
    prefabGroups = [cnf_altar_bell_group, cnf_wave_manager_group, cnf_dummy_group, cnf_vfx_jump_group, cnf_vfx_land_group, cnf_hopperFish_group, cnf_vfx_collision_group, cnf_vfx_decal_group, cnf_item_base_group]

    enemyGroups = [cnf_dummy_group, cnf_hopperFish_group]
    init ()
    {
        this.DEBUG_isOVERLAY = false
        this.isGameOver = false
        GameOptions.playerScore = 0
        GameOptions.wave_round = 0
    }
    
    create()
    {
        // console.log('Game Scene Online')

        // width: 256,
        // height: 240,
       


        this.cameras.main.fadeIn(500, 0, 0, 0)


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
        this.tiles = this.map.addTilesetImage('altar-tiles-01', 'tiles-arena-extruded', 16, 16, 1, 2)
        // this.tiles = this.map.addTilesetImage('altar-tiles-01', 'tiles-arena', 16, 16)

        this.layerPlatformDeco = this.map.createStaticLayer('platform-env-static', this.tiles, 0, 0).setDepth(-6)
        this.layerStaticPlatform = this.map.createStaticLayer('platform-solid-static', this.tiles, 0, 0).setDepth(-5)
        
        // const layerPlatformDeco = this.map.createStaticLayer('platform-env-static', this.tiles, 0, 0).setDepth(-1)

        const SPAWN_POINT_player = this.map.findObject("spawnpoints", obj => obj.name === "player-spawn-point")
        
        // SET CAMERA BOUNDS
        this.cameras.main.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight)
        this.physics.world.setBounds(0, 0, this.map.width * this.map.tileWidth, this.map.height * this.map.tileHeight)

        // ADD PLAYER
        // this.player = new Player(this, 16 * 11, 16 * 5, 'oni-idle', 0)
        this.player = new Player(this, SPAWN_POINT_player.x, SPAWN_POINT_player.y, 'oni-idle', 0)
        this.setupOverlapEvents(this.player)

        // SET CAMERA FOLLOW PLAYER
        // this.cameras.main.startFollow(this.player, true)
        this.cameras.main.centerOnX(this.player.x)

        // console.log(`player  properties ${Object.getOwnPropertyNames(this.player)}`)

        this.player.setData({"states": cnf_player_states})
        // this.player_CONTROLLER = new Player_Controller(this.player)
        this.player_CONTROLLER = new Ai_Controller(this.player)
        this.setControlState(this.player, this.player_CONTROLLER)
        // this.player.setControlState(this.player_CONTROLLER)
        
        // this.player_CONTROLLER.setState('idle')
        this.player.controlState.setState('idle')
        // this.player_CONTROLLER.setState('STATE_UNHURT') // STATE_UNHURT
        
        this.layerStaticPlatform.setCollision([4, 3, 2, 1, 10, 11, 12], true)
        this.DEBUG_Overlay.fillRect(0, 0, width, height)
        // this.layerStaticPlatform.renderDebug(this.DEBUG_Overlay, {})
        
        this.physics.add.collider(this.player, this.layerStaticPlatform)

        this.prefabGroups.forEach((pref_group) => {
            /**@type {Phaser.Physics.Arcade.Group} */
            this[pref_group.group_name] = this.physics.add.group(pref_group.group_cnf)
            this[pref_group.pool_name] = this.physics.add.group(pref_group.pool_cnf)            
            this.physics.add.collider(this[pref_group.group_name], this.layerStaticPlatform)
        })

        // this.physics.add.collider(this.GROUP_training_dummy, this.layerStaticPlatform)
        // this.physics.add.collider(this.GROUP_hopFish, this.layerStaticPlatform)
        // this.physics.add.collider(this.GROUP_ITEM, this.layerStaticPlatform)

        // player hitbox vs dummy hurtbox >> dummy attacks player
        // this.physics.add.overlap(this.player.hitBox, this.GROUP_training_dummy, this.player.playerTakeDamage, null, this.player)
        // PLAYER COLLISIONS AND OVERLAPS
        this.physics.add.overlap(this.player.hitBox, this.GROUP_training_dummy, this.player.playerTakeDamage, null, this.player)
        this.physics.add.overlap(this.player.hitBox, this.GROUP_hopFish, this.player.playerTakeDamage, null, this.player)
        this.physics.add.overlap(this.player, this.GROUP_ITEM, this.itemPickup, null, this)
        
        // player hurtbox vs dummy hitbox >> Player attacks dummy
        // this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy)
        // this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy, this.itemPickup, null, this)
        // this.physics.add.overlap(this.player.hurtBox, this.GROUP_training_dummy)

        // SPAWN ENEMIES ON A TIMER
        // SET ENEMY SPAWN POINT FIRST
        this.SPAWN_POINT_enemy_left = this.map.findObject("spawnpoints", obj => obj.name === "enemy-spawn-left")
        this.SPAWN_POINT_enemy_right = this.map.findObject("spawnpoints", obj => obj.name === "enemy-spawn-right")
        
        
        // console.log(`DOOR OBJECT TYPE ==== ${this.test_DOOR.width}`)
        
        // TEST DOOR BASED ON OBJECT IN RECTANGLE OBJECT LAYER
        // this.test_DOOR = this.map.findObject("doors", obj => obj.name === 'door')
        // this.door_Region = this.add.zone(this.test_DOOR.x, this.test_DOOR.y, this.test_DOOR.width, this.test_DOOR.height).setOrigin(0)
        // this.overlapDoor(this.door_Region)
        // this.physics.world.enableBody(this.door_Region)
        // this.physics.add.overlap(this.player, this.door_Region, this.doorEvent , null, this)

        this.doorEntered = false
        // this.doors = this.map.createFromObjects('spawnpoints', 'door', {key: 'floater', frame: 0})
        // this.map.layers.forEach((layer)=> {
        //     // console.log(`Tile map layers >>>> ${layer.name}`)
        // })

        // this.physics.add.existing(this.door_Region)

        this.map.renderDebugFull(this.DEBUG_Overlay, {})

        this.doorSet = []
        this.map.objects.forEach((object)=> {
            // console.log(`Tile map objects >>>> ${object.objects}`)
            if (object.name === 'doors'){
                object.objects.forEach( object => {
                    console.log(`Objects in object layer ${object.properties[0].name}`)
                    // GameOptions.prefabXYZ_SPAWN_POINT = object.name
                    let newDoor = this.add.zone(object.x, object.y, object.width, object.height).setOrigin(0)
                    object.properties.forEach(prop => {
                        newDoor[prop.name] = prop.value
                    });
                    this.overlapDoor(newDoor)
                    this.physics.world.enableBody(newDoor)
                    this.physics.add.overlap(this.player, newDoor, this.doorEvent , null, this)
                    this.doorSet.push(newDoor)
                }, this)
            }
        }, this)

        // PLACE ALTAR BELL
        this.spawnEnemy(this.scale.width / 2, this.scale.height * 0.3, cnf_altar_bell_group) // args: [this.SPAWN_POINT_enemy_left.x, this.SPAWN_POINT_enemy_left.y, cnf_hopperFish_group]

        // this.createWaveManager(0, 0, cnf_txt_title_manager_group) //txt title manager
        this.createWaveManager(0, 0, cnf_wave_manager_group) // actual wave spawner
        
        // this.controlState.setState('init')
        // UI SCENE INITIALIZATION
        this.scene.launch('ui', {gameScene: this})   

        // PhaserGUIAction(this)
    }

    doorEvent(player, door)
    {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${door.direction}`)
        let screenWidth = this.cameras.main.width / 2
        if (door.direction === 'horizontal')
        {
            
            if (door.body.touching.left) 
            {
                this.panCamera(this.cameras.main, door.x + screenWidth + 8)
                this.physics.moveTo(player, door.x + player.width + 32 + 32, player.y, 64, 1000 )
            }
            if (door.body.touching.right) 
            {
                this.panCamera(this.cameras.main, door.x - screenWidth - 8)
                this.physics.moveTo(player, door.x - player.width - 32 - 32, player.y, 64, 1000 )
            }
        }
        
        if (door.direction === 'vertical')
        {
            let screenHeight = this.cameras.main.height / 2
            if (door.body.touching.up) {
                this.panCamera(this.cameras.main, door.x + screenWidth, door.y + screenHeight + 8)
                this.physics.moveTo(player, player.x , door.y + player.height + 32 + 32, 64, 1000 )
            }
            if (door.body.touching.down) {
                this.panCamera(this.cameras.main, door.x + screenWidth, door.y - screenHeight + 8)
                this.physics.moveTo(player, player.x , door.y - player.height - 32 - 32, 64, 1000 )
            }
        }


    }

    panCamera(camera, targetX = this.cameras.main.x, targetY = this.cameras.main.y, easing = 'Sine.easeInOut')
    {
        camera.pan(targetX, targetY, 250, easing)
    }

    setControlState(prefab, controlState)
    {
        prefab.controlState = controlState
    }

    overlapDoor(prefab){
        prefab.on("overlapstart", function() {
            this.doorEvent(this.player, prefab)
            this.doorEntered = true
        }, this)
        
        prefab.on("overlapend", function() {
            this.doorEntered = false
        }, this)
    }
    setupOverlapEvents(prefab){
        prefab.on("overlapstart", function() {
            // console.log(">>>>> OVERLAP STARTO <<<<<")
            prefab.controlState.setState('take_damage')
            // debugger
            // prefab.scene.player_CONTROLLER.setState('take_damage')

    
            // console.time("overlap")
          })

        prefab.on("overlapend", function() {
            // console.log(">>>>> OVERLAP ENDO <<<<<")
            // console.timeEnd("overlap")
        })
    }

    /**
     * 
     * @param {Player} player 
     * @param {Item_Base} item 
     */
    itemPickup(player, item)
    {
        if (item.tween_flicker) 
        {
            item.tween_flicker.stop()
        }
        if (item.tween_left_right_motion) 
        {
            item.tween_left_right_motion.stop()
        }
        // this.spawnHitVFX(player.body.x, player.body.y, 'fx-hit-block')
        item.setAlpha(1)
        this.GROUP_ITEM.killAndHide(item)
        this.GROUP_ITEM.remove(item)
        GameOptions.playerScore += 100
    }

    gameOverSeq()
    {
        this.scene.launch('gameover')
    }

    trackOverlapEvents(prefab)
    {
        // Treat 'embedded' as 'touching' also
        // if (this.hitBox.body.embedded) this.hitBox.body.touching.none = false
        if (prefab.hitBox.body.embedded) prefab.hitBox.body.touching.none = false

        // var touching = !this.hitBox.body.touching.none
        // var wasTouching = !this.hitBox.body.wasTouching.none
        var touching = !prefab.hitBox.body.touching.none
        var wasTouching = !prefab.hitBox.body.wasTouching.none

        if (touching && !wasTouching) 
        {
            // console.log('OVERLAP START')
            // this.emit("overlapstart")
            prefab.emit("overlapstart")
        }
        else if (!touching && wasTouching) 
        {
            // console.log('OVERLAP END')
            // this.emit("overlapend")
            prefab.emit("overlapend")
        }
    }

    track_DOOR_OverlapEvents(prefab)
    {
        // Treat 'embedded' as 'touching' also
        // if (this.hitBox.body.embedded) this.hitBox.body.touching.none = false
        if (prefab.body.embedded) prefab.body.touching.none = false

        // var touching = !this.body.touching.none
        // var wasTouching = !this.body.wasTouching.none
        var touching = !prefab.body.touching.none
        var wasTouching = !prefab.body.wasTouching.none

        if (touching && !wasTouching) 
        {
            // console.log('OVERLAP START')
            // this.emit("overlapstart")
            prefab.emit("overlapstart")
        }
        else if (!touching && wasTouching) 
        {
            // console.log('OVERLAP END')
            // this.emit("overlapend")
            prefab.emit("overlapend")
        }
    }

    trackHitBox (prefab)
    {
        prefab.hitBox.setPosition(prefab.body.x, prefab.body.y)
    }

    update ()
    {
        this.gamePause()
        this.DEBUG_KEY_CONTROLS()

        // this.controlState.update() // WAVE MANAGERs

        if (!this.player.isAlive && !this.isGameOver)
        {
            this.isGameOver = true
            this.time.delayedCall(250, this.gameOverSeq, null, this)            // this.gameOverSeq()
        } else
        {
            if (!this.doorEntered)
            {
                this.player.update()
            }
        }

        // this.physics.world.wrap(this.player.body)
        // this.track_DOOR_OverlapEvents(this.door_Region)

        this.doorSet.forEach((door) => {
            this.track_DOOR_OverlapEvents(door)
        }, this)
        
        this.trackOverlapEvents(this.player)
        this.enemyGroups.forEach( (group)=> {
            let newGroup = this[group.group_name]
            newGroup.getChildren().forEach(enemy => {
                this.trackHitBox(enemy)
                this.trackOverlapEvents(enemy)
            })
        })
    }

    gamePause ()
    {
        if (!this.isGameOver && Phaser.Input.Keyboard.JustUp(this.key_PAUSE))
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
            // this.spawnDummy(16 * 2, 16 * 2)
            this.spawnItem(16 * 8, 16 * 8, 'ui-health')
        }

        
    }

    createDebug() {
        this.input.keyboard.on("keydown_ONE", () => {
          if (!this.physics.world.drawDebug)
            this.physics.world.createDebugGraphic()
          this.physics.world.debugGraphic.visible = this.debug = !this.debug
        })
    }

    createWaveManager(x, y, pref_group)
    {
        // console.log(`USING GENERIC ENEMY SPAWNER!!!!!!!!!!!!!!!!!!!!!!!`)
        // if (this.TIMED_EVENT_ENEMY_SPAWN.repeatCount % 2 === 0) 
        // {
        //     x = this.SPAWN_POINT_enemy_right.x
        //     y = this.SPAWN_POINT_enemy_right.y
        // }
        if (this[pref_group.group_name].countActive() >= this[pref_group.group_name].maxSize)
        {
            return
        }
        // /** @type {Dummy} */
        let new_Wave_manager
        
        if(this[pref_group.pool_name].getLength()){
            new_Wave_manager = this[pref_group.pool_name].getFirst()
            new_Wave_manager.controlState.setState('init')
            new_Wave_manager.x = x
            new_Wave_manager.y = y
            new_Wave_manager.setActive(true)
            new_Wave_manager.setVisible(true)
            
            this[pref_group.pool_name].remove(new_Wave_manager)
        }
        else{
            new_Wave_manager = this[pref_group.group_name].get(x, y, this.scale.width, this.scale.width)
            new_Wave_manager.setData({ "props": pref_group.props, "states": pref_group.states })
            new_Wave_manager.data.values.props.group = this[pref_group.group_name]
            new_Wave_manager.data.values.props.pool = this[pref_group.pool_name]

            for (const [propName, propValue] of Object.entries(new_Wave_manager.data.values.props)) {
                if (propName === 'controlState')
                {
                    new_Wave_manager[propName] = new Ai_Controller(new_Wave_manager)
                }
            }
            new_Wave_manager.controlState.setState('init')

            this[pref_group.group_name].add(new_Wave_manager)            
            GameOptions.wave_manager = new_Wave_manager
        }

    }

    spawnEnemy(x, y, pref_group)
    {
        // console.log(`USING GENERIC ENEMY SPAWNER!!!!!!!!!!!!!!!!!!!!!!!`)
        // if (this.TIMED_EVENT_ENEMY_SPAWN.repeatCount % 2 === 0) 
        // {
        //     x = this.SPAWN_POINT_enemy_right.x
        //     y = this.SPAWN_POINT_enemy_right.y
        // }
        if (this[pref_group.group_name].countActive() >= this[pref_group.group_name].maxSize)
        {
            return
        }
        // /** @type {Dummy} */
        let newEnemy

        // GameOptions.wave_entities_alive++
        
        if(this[pref_group.pool_name].getLength()){
            newEnemy = this[pref_group.pool_name].getFirst()
            newEnemy.controlState.setState('init')
            newEnemy.x = x
            newEnemy.y = y
            newEnemy.setActive(true)
            newEnemy.setVisible(true)
            
            this[pref_group.pool_name].remove(newEnemy)
        }
        else{
            newEnemy = this[pref_group.group_name].get(x, y, pref_group.key, pref_group.frame)
            newEnemy.setData({ "props": pref_group.props, "states": pref_group.states })
            newEnemy.data.values.props.group = this[pref_group.group_name]
            newEnemy.data.values.props.pool = this[pref_group.pool_name]

            // This is where further init actions would be carried out, if applicable
            // They would be all unique to the prefab 
            /**
             * if (newEnemy.data.values.spawnInit
             * {
             *      newEnemy.data.values.spawnInit()
             * 
             * }
             */

            let new_newEnemy_CONTROLLER = new Ai_Controller(newEnemy)
            this.setControlState(newEnemy, new_newEnemy_CONTROLLER)
            // newEnemy.setControlState(new_newEnemy_CONTROLLER)
            newEnemy.controlState.setState('init')

            this[pref_group.group_name].add(newEnemy)            
        }

        
    }

    spawnHitVFX(x, y, pref_group)
    {

        if (this[pref_group.group_name].countActive() >= this[pref_group.group_name].maxSize)
        {
            return
        }
        // /** @type {VFX_COLLISION} */
        let newHitVFX
        
        if(this[pref_group.pool_name].getLength()){
            newHitVFX = this[pref_group.pool_name].getFirst()
            newHitVFX.controlState.setState('init')
            newHitVFX.x = x
            newHitVFX.y = y
            // newHitVFX.play(`anim-${pref_group.key}`)
            newHitVFX.setActive(true)
            newHitVFX.setVisible(true)
            // console.log(`SPAWNED POOLED hitVF`)
            
            this[pref_group.pool_name].remove(newHitVFX)
        }
        else{
            // console.log(`SPAWNED NEW hitVF`)
            newHitVFX = this[pref_group.group_name].get(x, y, pref_group.key, pref_group.frame)
            newHitVFX.setData({ "props": pref_group.props, "states": pref_group.states })
            newHitVFX.data.values.props.group = this[pref_group.group_name]

            let new_newHitVFX_CONTROLLER = new Ai_Controller(newHitVFX)
            newHitVFX.setControlState(new_newHitVFX_CONTROLLER)
            newHitVFX.controlState.setState('init')

            this[pref_group.group_name].add(newHitVFX)            
        }
    }

    spawnItem(x, y, animation)
    {
        // MOVE TO USING STATE MACHINE
        // MOVE VARIABLE PROPS TO INIT STATE OF EACH ITEM PREFAB
        if (this.GROUP_ITEM.countActive() >= this.GROUP_ITEM.maxSize)
        {
            return
        }
        /** @type {Item_Base} */
        let newItem
        
        if(this.GROUP_POOL_ITEM.getLength()){
            // console.log(`SPAWNED POOLED hitVF`)
            newItem = this.GROUP_POOL_ITEM.getFirst()
            newItem.x = x
            newItem.y = y
            // newItem.play(`anim-${animation}`)
            newItem.setActive(true)
            newItem.setVisible(true)
            newItem.readyToFlicker = true
            newItem.canWaver = true
            newItem.setAlpha(1)            
            this.GROUP_POOL_ITEM.remove(newItem)
        }
        else{
            // console.log(`SPAWNED NEW hitVF`)
            newItem = this.GROUP_ITEM.get(x, y, animation, 3)
            newItem.readyToFlicker = true

            // newItem.play(`anim-${animation}`)

            this.GROUP_ITEM.add(newItem)            
        }
    }
}