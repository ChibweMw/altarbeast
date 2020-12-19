import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class AI_DUMMY_INIT
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        // console.log(`AI: DUMMY > INIT`)
        // console.log(`AI: DUMMY DATA GROUP > ${this.prefab.data.values.props.group}`)
        // console.log(`AI: DUMMY DATA STATES > ${this.prefab.data.values.states}`)
        // if (this.prefab.testProp){
        // }
        // this.prefab.setTexture('prefab')
        // this.prefab.clearTint()
        // this.prefab.isHurt = this.prefab.data.values.props.isHurt // false
        // this.prefab.currHP = this.prefab.data.values.props.maxHP // this.prefab.maxHP

        for (const [propName, propValue] of Object.entries(this.prefab.data.values.props)) {
            this.prefab[propName] = propValue
            if (propName === 'currHP')
            {
                this.prefab[propName] = this.prefab.maxHP
            }
            // console.log(`${propName} : ${this.hopper[propName]}`)
        }
        this.prefab.setTexture(this.prefab.key, this.prefab.texFrame)
        this.prefab.clearTint()
        this.prefab.setAlpha(1)
        this.prefab.hitBox.setActive(true)
        this.prefab.scene.setupOverlapEvents(this.prefab)
        // this.prefab.scene.trackOverlapEvents(this.prefab)

        // if ()
        // {
        //     this.prefab.idle_transition_Timer
        // }

        // this.prefab.scene.TIMED_EVENT_ENEMY_SPAWN.repeatCount % 2 === 0 ? this.prefab.controlState.setState('move_left') : this.prefab.controlState.setState('move_right')
        this.prefab.controlState.setState('move_right')
    }
    
    update ()
    {

    }

}