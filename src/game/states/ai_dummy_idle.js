import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class Player_MOVE_UP
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
        console.log(`AI: ENTER STATE >> DUMMY > IDLE`)         
    }
    
    update ()
    {
        // console.log(`AI STATE: DUMMY > IDLE`) 
    }

}