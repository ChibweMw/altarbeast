import EventDispatcher from '../EventDispatcher.js'
export default class ALTAR_BELL_DEACTIVATE
{
    constructor(prefab)
    {
        this.prefab = prefab
        this.scene = this.prefab.scene
        /**@type {Phaser.Events.EventEmitter} */
        this.emitter = EventDispatcher.getInstance()
    }
    enter()
    {
        console.log(`>>>>>>>>>INTERACTABLE ALTAR_BELL_DEACTIVATE STATE`)
        // this.prefab.hitBox.setActive(false)
        this.prefab.hitBox.body.checkCollision.none = true
        this.prefab.controlState.setState('idle')

    }

    update()
    {}
    
}