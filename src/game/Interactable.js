import Game from "../scenes/Game.js"

export default class Interactable extends Phaser.Physics.Arcade.Sprite
{
    /**
     * @param {Game} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string | integer} frame
     */
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)

        this.scene = scene

        // SET DEPTH

        this.setDepth(-1)
        // ADD PHYSICS BODY
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)
        
        // ADD HITBOX FOR INTERACTION WITH PLAYER
        /**@type {Phaser.GameObjects.Zone} */
        this.hitBox = this.scene.add.zone(this.body.x, this.body.y, this.body.width, this.body.height)
        this.scene.add.existing(this.hitBox)
        this.scene.physics.world.enable(this.hitBox)
        this.hitBox.setOrigin(0, 0)
        this.hitBox.body.debugBodyColor = 0x00ff33

        this.scene.physics.add.overlap(this.scene.player.hurtBox, this.hitBox)

        this.controlState = undefined

        // this.setupOverlapEvents(this.interactionBegin)
        this.setupOverlapEvents()

        console.log(`BELL CREATED ${this.hitBox.body}`)
    }

    // MAKE OVERLAP COLLIDER ONLY TRACK THE START OF AN OVERLAP EVENT
    setupOverlapEvents(start_state){
        this.on("overlapstart", function() {
            // console.log(">>>>> OVERLAP STARTO <<<<<")
            // this.controlState.setState(start_state)
            this.controlState.setState('interaction_start')
    
            // console.time("overlap")
          })

        this.on("overlapend", function() {
            return
            // console.log(">>>>> OVERLAP ENDO <<<<<")
            // console.timeEnd("overlap")
        })
    }

    listenForHits()
    {
        // Treat 'embedded' as 'touching' also
        if (this.hitBox.body.embedded) this.hitBox.body.touching.none = false

        var touching = !this.hitBox.body.touching.none
        var wasTouching = !this.hitBox.body.wasTouching.none

        if (touching && !wasTouching) 
        {
            // console.log('OVERLAP START')
            this.emit("overlapstart")
        }
        else if (!touching && wasTouching) 
        {
            // console.log('OVERLAP END')
            this.emit("overlapend")
        }
    }

    setControlState(controlState)
    {
        this.controlState = controlState
    }

    update()
    {
        this.controlState.update()
        this.listenForHits()
    }
}