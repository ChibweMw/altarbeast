// wwill use to intro the stage if in the very beginning, then present the next wave
// In a title card type presentation  
export default class PLAY_SCENE_INTRO
{

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME INTRO STATE`)
        this.prefab.controlState.setState('start')
    }
    
    update ()
    {

    }

}