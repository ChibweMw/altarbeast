import GameOptions from './GameOptions.js'
import Game from '../scenes/Game.js'


export default class Hopper extends Phaser.Physics.Arcade.Sprite 
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
        this.setOrigin(0, 0)
        this.setActive(true)
        this.setVisible(true)
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)
        /**@type {Phaser.GameObjects.Zone} */
        this.hitBox = this.scene.add.zone(this.body.x, this.body.y, 16, 16)
        this.scene.add.existing(this.hitBox)
        this.scene.physics.world.enable(this.hitBox)
        this.hitBox.setOrigin(0, 0)
        this.hitBox.body.debugBodyColor = 0x00ff33

        this.scene.physics.add.overlap(this.scene.player.hurtBox, this.hitBox)


        this.setGravityY(GameOptions.playerGravity / 6)


        this.controlState = undefined
        this.animState = undefined
        this.audioState = undefined

        this.atkPoints = 1


        this.vulnTime = 500

        // this.jumpForce = -200
        this.lungeFactor = 1.5       
        this.walkSpeed = 60
        // this.init_walkSpeed = 45
        // this.curr_walkSpeed = this.init_walkSpeed
        // this.maxHP = 1
        // this.currHP = null
        // this.isHurt = false

        this.setCollideWorldBounds(false)
        this.setBounce(0)
        // this.setupOverlapEvents()
    }

    // MAKE OVERLAP COLLIDER ONLY TRACK THE START OF AN OVERLAP EVENT
    setupOverlapEvents(){
        this.on("overlapstart", function() {
            // if (this.currHP > 0)
            // if (!this.isDeathSeq)
            this.controlState.setState('take_damage')
            // debugger
            // if (!this.isHurt)
            // {
            // } //else
            // {
            //     this.controlState.setState('death_sequence')
            //     console.log(">>>>> HP LESS THAN 0 HP LESS THAN 0HP LESS THAN 0HP LESS THAN 0HP LESS THAN 0 <<<<<")
            // }
    
            // console.time("overlap")
          })

        this.on("overlapend", function() {
            // console.log(">>>>> OVERLAP ENDO <<<<<")
            // this.isHurt = false
            return
            // console.timeEnd("overlap")
        })
    }

    // setControlState(controlState)
    // {
    //     this.controlState = controlState
    // }

    screenWrapX()
    {
        if (this.body.x > this.scene.scale.width - this.body.halfWidth)
        // if (this.body.x > this.scene.cameras.main.width - this.body.halfWidth)
        {
            
            // console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.x = 0 - this.body.halfWidth
        } 
        else if (this.body.x < 0 - this.body.halfWidth)
        {
            // console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.x = this.scene.cameras.main.width - this.body.halfWidth
        }   
    }
    screenWrapY()
    {
        if (this.body.y > this.scene.scale.height - this.body.halfHeight)
        {
            
            // console.log(`<< SCREEN WRAP << RIGHT TO LEFT`)
            this.body.y = 0 - this.body.halfHeight
        } 
        else if (this.body.y < 0 - this.body.halfHeight)
        {
            // console.log(`>> SCREEN WRAP >> LEFT TO RIGHT`)
            this.body.y = this.scene.scale.height - this.body.halfHeight
        }
    }

    // trackHitBox ()
    // {
    //     this.hitBox.setPosition(this.body.x, this.body.y)
    // }

    // trackOverlapEvents ()
    // {
    //     // Treat 'embedded' as 'touching' also
    //     if (this.hitBox.body.embedded) this.hitBox.body.touching.none = false

    //     var touching = !this.hitBox.body.touching.none
    //     var wasTouching = !this.hitBox.body.wasTouching.none

    //     if (touching && !wasTouching) 
    //     {
    //         // console.log('OVERLAP START')
    //         this.emit("overlapstart")
    //     }
    //     else if (!touching && wasTouching) 
    //     {
    //         // console.log('OVERLAP END')
    //         this.emit("overlapend")
    //     }
    // }
    
    update()
    {

        this.controlState.update()
        this.screenWrapX()
        this.screenWrapY()
        // this.trackHitBox()
        // if (!this.isHurt)
        // {
        //     this.trackOverlapEvents()
        // }

        // // Treat 'embedded' as 'touching' also
        // if (this.hitBox.body.embedded) this.hitBox.body.touching.none = false

        // var touching = !this.hitBox.body.touching.none
        // var wasTouching = !this.hitBox.body.wasTouching.none

        // if (touching && !wasTouching) 
        // {
        //     // console.log('OVERLAP START')
        //     this.emit("overlapstart")
        // }
        // else if (!touching && wasTouching) 
        // {
        //     // console.log('OVERLAP END')
        //     this.emit("overlapend")
        // }
    }
}