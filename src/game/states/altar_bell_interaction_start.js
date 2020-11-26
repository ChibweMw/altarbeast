import EventDispatcher from '../EventDispatcher.js'
export default class ALTAR_BELL_START_INTERACTION
{
    constructor(prefab)
    {
        this.prefab = prefab
        /**@type {Phaser.Scene} */
        this.scene = this.prefab.scene
        /**@type {Phaser.Events.EventEmitter} */
        this.emitter = EventDispatcher.getInstance()
    }
    enter()
    {
        console.log(`>>>>>>>>>INTERACTABLE ALTAR_BELL_START_INTERACTION STATE`)

        // EFFECTS
        this.scene.cameras.main.shake(700, 0.0025, true)

        // this.prefab.hitBox.setActive(false)
        // DEACTIVAT COLLISIONS
        this.prefab.hitBox.body.checkCollision.none = true

        // EVENT 
        this.emitter.emit('WAVE_START', null)

        // NEXT STATE
        this.prefab.controlState.setState('interaction_end')
    }

    update()
    {}
    
}