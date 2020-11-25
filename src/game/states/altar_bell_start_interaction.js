export default class ALTAR_BELL_START_INTERACTION
{
    constructor(prefab)
    {
        this.prefab = prefab
        this.scene = this.prefab.scene
    }
    enter()
    {
        console.log(`>>>>>>>>>INTERACTABLE ALTAR_BELL_START_INTERACTION STATE`)
        this.prefab.controlState.setState('idle')
    }

    update()
    {}
    
}