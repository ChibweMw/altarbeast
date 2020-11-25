export default class ALTAR_BELL_IDLE
{
    constructor(prefab)
    {
        this.prefab = prefab
        this.scene = this.prefab.scene
    }
    enter()
    {
        console.log(`>>>>>>>>>INTERACTABLE IDLE STATE`)
    }

    update()
    {}
    
}