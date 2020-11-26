import Interactable from "../Interactable.js"

export default class INTERACTABLE_INIT 
{
    constructor(prefab)
    {
        // /**@type {Interactable} */
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
        // this.prefab.hitBox.setActive(true)
        // this.prefab.hitBox.body.checkCollision.none = false
        // GO TO 'INITIAL' STATE
        this.prefab.controlState.setState(this.prefab.startState)
    }
    update()
    {
        
    }
}