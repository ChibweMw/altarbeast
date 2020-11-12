import GameOptions from '../game/GameOptions.js'

// import AI_IDLE from './states/ai_dummy_idle.js'
// import AI_MOVE_LEFT from './states/ai_dummy_move_left.js'
// import AI_MOVE_RIGHT from './states/ai_dummy_move_right.js'
// import AI_MOVE_FALL from './states/ai_dummy_move_fall.js'
// import AI_TAKE_DAMAGE from './states/ai_dummy_take_damage.js'
// import AI_DEATH_SEQUENCE from './states/ai_dummy_death_sequence.js'

import Enemy from './Dummy.js'

export default class Ai_Controller
{
    /** @type {{ [key: string]: { enter: () => void; update?: () => void } }} */
	states
	/** @type {{ enter: () => void; update?: () => void }} */
	currentState
	// /**@type {Enemy}*/
	prefab

	// /**
	//  * @param {Enemy} prefab 
	//  */
	constructor(prefab)
	{
        this.states = {}
        this.statesList = prefab.getData('states')
        this.setPossibleStates(prefab, this.statesList)
    }
    
    setPossibleStates (prefab, stateList)
    {
        
        for (const [stateName, newState] of Object.entries(stateList)) {
            this.states[stateName] = this.makeStateInstance(newState, prefab)
        }
    }

    makeStateInstance(state, prefab) {
        return new state(prefab)
    }

	/**
	 * 
	 * @param {string} name 
	 */
	setState(name)
	{
        // console.log(`ENTRIES >>> '${Object.entries(this.states)}'`)
        if (this.currentState === this.states[name])
        {
            return
        }

        this.currentState = this.states[name]
        this.currentState.enter()
    }
    
    update ()
    {
        this.currentState.update()
    }
}