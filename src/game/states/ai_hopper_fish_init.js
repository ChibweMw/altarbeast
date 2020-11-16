import GameOptions from "../GameOptions.js"
import Hopper from '../Hopper_Fish.js'

export default class AI_HOPPER_INIT
{
    /** @param {Hopper} hopper*/

    constructor (hopper)
    {
        this.hopper = hopper
    }

    enter ()
    {
        // console.log(`AI: hopper > INIT`)
        // this.hopper.setTexture('hopper')
        
        this.hopper.setTexture('enemy-fish', 2)
        this.hopper.clearTint()
        this.hopper.curr_walkSpeed = this.hopper.init_walkSpeed
        // this.hopper.isHurt = this.hopper.data.values.props.isHurt // false
        // console.log(`AI: HOPPER DATA isHURT ?? > ${this.hopper.data.values.props.isHurt}`)
        
        for (const [propName, propValue] of Object.entries(this.hopper.data.values.props)) {
            this.hopper[propName] = propValue
            if (propName === 'currHP')
            {
                this.hopper[propName] = this.hopper.maxHP
            }
            // console.log(`${propName} : ${this.hopper[propName]}`)
        }
        // this.hopper.currHP = this.hopper.data.values.props.maxHP
        // this.hopper.currHP = this.hopper.maxHP
        
        // this.hopper.scene.TIMED_EVENT_ENEMY_SPAWN.repeatCount % 2 === 0 ? this.hopper.controlState.setState('move_left') : this.hopper.controlState.setState('move_right')
        this.hopper.controlState.setState('move_right')
    }
    
    update ()
    {

    }

}