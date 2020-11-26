import EventDispatcher from "../EventDispatcher.js"
import GameOptions from "../GameOptions.js"

export default class TXT_WAVE_PRE_ROUND
{
    constructor (prefab)
    {
        this.prefab = prefab
        this.scene = prefab.scene
        this.intro_Played = false
        /**@type {Phaser.Events.EventEmitter} */
        this.emitter = EventDispatcher.getInstance()
    }

    enter ()
    {
        console.log('>>>>>>>>>>>>>>> PRE WAVE STATE!!! HIT THE BELL <<<<<<<<<<<<<<')
        // SHOULD GO TO WAIT STATE, TILL 'BELL' IS RANG
        // listen for 'BELL_DID_RIGN' event
        this.emitter.emit('WAVE_END', null)
        this.emitter.on('WAVE_START', this.startWave, this)
        // GameOptions.wave_manager.controlState.setState('start')
    }
    
    startWave()
    {
        // GameOptions.wave_manager.controlState.setState('start')
        this.prefab.controlState.setState('wave_title_in')
    }
    
    update ()
    {
        
    }

}