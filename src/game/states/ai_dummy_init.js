import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_DUMMY_INIT
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
        // console.log(`AI: DUMMY > INIT`)
        // console.log(`AI: DUMMY DATA GROUP > ${this.dummy.data.values.props.group}`)
        // console.log(`AI: DUMMY DATA STATES > ${this.dummy.data.values.states}`)
        // if (this.dummy.testProp){
        // }
        this.dummy.setTexture('dummy')
        this.dummy.clearTint()
        this.dummy.isHurt = this.dummy.data.values.props.isHurt // false
        this.dummy.currHP = this.dummy.data.values.props.maxHP // this.dummy.maxHP
        this.dummy.scene.TIMED_EVENT_ENEMY_SPAWN.repeatCount % 2 === 0 ? this.dummy.controlState.setState('move_left') : this.dummy.controlState.setState('move_right')
    }
    
    update ()
    {

    }

}