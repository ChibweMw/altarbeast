import GameOptions from "../GameOptions.js"
import Dummy from '../Dummy.js'

export default class Player_MOVE_RIGHT
{
    /** @param {Dummy} dummy*/

    constructor (dummy)
    {
        this.dummy = dummy
    }

    enter ()
    {
        console.log(`AI: ENTER STATE >> DUMMY > MOVE RIGHT`)         
    }
    
    update ()
    {
        // console.log(`AI STATE: DUMMY > MOVE RIGHT`) 
    }

}