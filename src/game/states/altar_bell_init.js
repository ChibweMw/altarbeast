export default class INTERACTABLE_INIT 
{
    constructor(prefab)
    {
        this.prefab = prefab
        this.scene = this.prefab.scene
    }
    enter ()
    {

        for (const [propName, propValue] of Object.entries(this.prefab.data.values.props)) {
            this.prefab[propName] = propValue
            // console.log(`${propName} : ${this.hopper[propName]}`)
        }
        this.prefab.setTexture(this.prefab.key, this.prefab.texFrame)
        this.prefab.clearTint()
        this.prefab.setAlpha(1)
        this.prefab.hitBox.setActive(true)
        // GO TO 'INITIAL' STATE
        this.prefab.controlState.setState(this.prefab.startState)
    }
    update()
    {
        
    }
}