import GameOptions from "../GameOptions.js"

export default class PLAY_SCENE_INIT
{
    // /** @param {Dummy} prefab*/

    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`GAME INIT STATE`)
        for (const [propName, propValue] of Object.entries(this.prefab.data.values.props)) {
            if (propName === 'controlState')
            {
                continue
            }else
            {
                // console.log(`>>>>>>>>>>>>>>>>>>>>${propName} : ${propValue}`)
                this.prefab[propName] = propValue
                if (propName === 'spawnPoints')
                {
                    this.prefab[propName] = [this.prefab.scene.SPAWN_POINT_enemy_left, this.prefab.scene.SPAWN_POINT_enemy_right]
                } 
            }
        }
        this.prefab.controlState.setState('intro')
        // this.prefab.controlState.setState(this.prefab.startState)
    }
    
    update ()
    {

    }

}