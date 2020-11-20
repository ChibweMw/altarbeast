import GameOptions from "../GameOptions.js"

export default class TXT_TITLE_INIT
{
    constructor (prefab)
    {
        this.prefab = prefab
    }

    enter ()
    {
        console.log(`TXT TITLE INIT STATE`)
        for (const [propName, propValue] of Object.entries(this.prefab.data.values.props)) {
            if (propName === 'controlState')
            {
                continue
            }else
            {
                // console.log(`>>>>>>>>>>>>>>>>>>>>${propName} : ${propValue}`)
                this.prefab[propName] = propValue
            }
        }
        this.prefab.controlState.setState('wave_title_in')
        // this.prefab.controlState.setState(this.prefab.startState)
    }
    
    update ()
    {

    }

}