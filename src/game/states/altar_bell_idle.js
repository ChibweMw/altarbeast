import EventDispatcher from "../EventDispatcher.js"

export default class ALTAR_BELL_IDLE
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
        console.log(`>>>>>>>>>INTERACTABLE IDLE STATE`)
        this.emitter.on('WAVE_END', this.reactivateBellHitbox, this)
    }

    reactivateBellHitbox()
    {
        this.prefab.controlState.setState('activated')
    }

    update()
    {}
    
}