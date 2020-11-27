import EventDispatcher from '../EventDispatcher.js'
// import Interactable from '../Interactable.js'
export default class ALTAR_BELL_ACTIVATE
{
    constructor(prefab)
    {
        // /**@type {Interactable} */
        this.prefab = prefab
        this.scene = this.prefab.scene
        /**@type {Phaser.Events.EventEmitter} */
        this.emitter = EventDispatcher.getInstance()
    }
    enter()
    {
        if (!this.prefab.hitBox.body)
        {
            // then stop listener for now till next needed
            // console.log(`>>>>>>>>> BELL PREFAB >> ${this.prefab.type}`)
            // console.log(`>>>>>>>>> BELL HITBOX BODY >> ${this.prefab.hitBox.body}`)
            return
        } else
        {
            
            this.prefab.hitBox.body.checkCollision.none = false
        }

        // MAY NEED IN-BETWEEN STATES FOR FLESHING OUT 
        this.prefab.controlState.setState('idle')

    }
    update()

    {}
    
}