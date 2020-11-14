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
    
    prefabGroups = [cnf_dummy_group, cnf_hopperFish_group, cnf_vfx_collision_group, cnf_vfx_decal_group, cnf_item_base_group]
    
    init ()
    {
        this.DEBUG_isOVERLAY = false
        this.isGameOver = false
        GameOptions.playerScore = 0
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

        this.layerPlatformDeco = this.map.createStaticLayer('platform-env-static', this.tiles, 0, 0).setDepth(-5)
        this.layerStaticPlatform = this.map.createStaticLayer('platform-solid-static', this.tiles, 0, 0).setDepth(-5)
        
        // const layerPlatformDeco = this.map.createStaticLayer('platform-env-static', this.tiles, 0, 0).setDepth(-1)

        const SPAWN_POINT_player = this.map.findObject("spawnpoints", obj => obj.name === "player-spawn-point")
        
        // ADD PLAYER
        // this.player = new Player(this, 16 * 11, 16 * 5, 'oni-idle', 0)
        this.player = new Player(this, SPAWN_POINT_player.x, SPAWN_POINT_player.y, 'oni-idle', 0)
        this.player.setData({"states": cnf_player_states})
        // this.player_CONTROLLER = new Player_Controller(this.player)
        this.player_CONTROLLER = new Ai_Controller(this.player)
        this.player.setControlState(this.player_CONTROLLER)
        
        // this.player_CONTROLLER.setState('idle')
        this.player.controlState.setState('idle')
        // this.player_CONTROLLER.setState('STATE_UNHURT') // STATE_UNHURT
        
        this.layerStaticPlatform.setCollision([4, 3, 2, 1, 10, 11, 12], true)
        this.DEBUG_Overlay.fillRect(0, 0, width, height)
        this.layerStaticPlatform.renderDebug(this.DEBUG_Overlay, {})
        
        this.physics.add.collider(this.player, this.layerStaticPlatform)

        this.prefabGroups.forEach((pref_group) => {
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

        this.TIMED_EVENT_ENEMY_SPAWN = this.time.addEvent({ delay: 1500, callback: this.spawnEnemy, args: [this.SPAWN_POINT_enemy_left.x, this.SPAWN_POINT_enemy_left.y, cnf_dummy_group], callbackScope: this, repeat: -1})
        // this.TIMED_EVENT_ENEMY_SPAWN_Hoper = this.time.addEvent({ delay: 2250, callback: this.spawnEnemy, args: [this.SPAWN_POINT_enemy_left.x, this.SPAWN_POINT_enemy_left.y, cnf_hopperFish_group], callbackScope: this, repeat: -1})
        // this.TIMED_EVENT_ENEMY_SPAWN = this.time.addEvent({ delay: 1500, callback: this.spawnDummy, args: [this.SPAWN_POINT_enemy_left.x, this.SPAWN_POINT_enemy_left.y], callbackScope: this, repeat: -1})
        // this.TIMED_EVENT_ENEMY_SPAWN_Hoper = this.time.addEvent({ delay: 2500, callback: this.spawnHopper, args: [this.SPAWN_POINT_enemy_left.x, this.SPAWN_POINT_enemy_left.y], callbackScope: this, repeat: -1})

        // UI SCENE INITIALIZATION
        this.scene.launch('ui', {gameScene: this})
        
    }

    // dummyHurt(player, dummy)
    // {
    //     dummy.controlState.setState('take_damage')
    //     this.spawnHitVFX(dummy.body.x, dummy.body.y, 'fx-hit-connect')        
    // }

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

    update ()
    {
        this.gamePause()
        this.DEBUG_KEY_CONTROLS()

        if (!this.player.isAlive && !this.isGameOver)
        {
            this.isGameOver = true
            this.time.delayedCall(250, this.gameOverSeq, null, this)            // this.gameOverSeq()
        } else
        {
            this.player.update()
        }
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

    spawnEnemy(x, y, pref_group)
    {
        // console.log(`USING GENERIC ENEMY SPAWNER!!!!!!!!!!!!!!!!!!!!!!!`)
        if (this.TIMED_EVENT_ENEMY_SPAWN.repeatCount % 2 === 0) 
        {
            x = this.SPAWN_POINT_enemy_right.x
            y = this.SPAWN_POINT_enemy_right.y
        }
        if (this[pref_group.group_name].countActive() >= this[pref_group.group_name].maxSize)
        {
            return
        }
        // /** @type {Dummy} */
        let newEnemy
        
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

            let new_newEnemy_CONTROLLER = new Ai_Controller(newEnemy)
            newEnemy.setControlState(new_newEnemy_CONTROLLER)
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
            console.log(`SPAWNED POOLED hitVF`)
            
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

    // spawnHitVFX(x, y, animation)
    // {
    //     // MOVE TO USING STATE MACHINE
    //     // MOVE VARIABLE PROPS TO INIT STATE OF EACH ITEM PREFAB

    //     if (this.GROUP_VFX_HIT.countActive() >= this.GROUP_VFX_HIT.maxSize)
    //     {
    //         return
    //     }
    //     /** @type {VFX_COLLISION} */
    //     let newHitVFX
        
    //     if(this.GROUP_POOL_VFX_HIT.getLength()){
    //         // console.log(`SPAWNED POOLED hitVF`)
    //         newHitVFX = this.GROUP_POOL_VFX_HIT.getFirst()
    //         newHitVFX.x = x
    //         newHitVFX.y = y
    //         newHitVFX.play(`anim-${animation}`)
    //         newHitVFX.controlState.setState('init')
    //         newHitVFX.setActive(true)
    //         newHitVFX.setVisible(true)
            
    //         this.GROUP_POOL_VFX_HIT.remove(newHitVFX)
    //     }
    //     else{
    //         // console.log(`SPAWNED NEW hitVF`)
    //         newHitVFX = this.GROUP_VFX_HIT.get(x, y, animation)
    //         newHitVFX.setData({ "props": pref_group.props, "states": pref_group.states })
    //         newHitVFX.data.values.props.group = this[pref_group.group_name]

    //         // FOLLOWING LINES ARE SETUP FOR MASKING BLOOD SPATTER VFX
    //         // newHitVFX.mask = new Phaser.Display.Masks.BitmapMask(this, this.layerStaticPlatform)
    //         // newHitVFX.mask = new Phaser.Display.Masks.BitmapMask(this, this.layerPlatformDeco)
    //         let new_newHitVFX_CONTROLLER = new Ai_Controller(newHitVFX)
    //         newHitVFX.setControlState(new_newHitVFX_CONTROLLER)
    //         newHitVFX.controlState.setState('init')

    //         newHitVFX.play(`anim-${newHitVFX.data.values.key}`)

    //         this.GROUP_VFX_HIT.add(newHitVFX)            
    //     }
    // }

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