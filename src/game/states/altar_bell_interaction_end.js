import EventDispatcher from '../EventDispatcher.js'
export default class ALTAR_BELL_END_INTERACTION
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
        // EVENTUALLY MOVE EVENT EMIT TO THIS STATE
        this.prefab.controlState.setState('deactivate')
    }

    update()
    {}
    
}