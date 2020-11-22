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

        this.prefab.scene.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
            /**
             * wait for 'game' scene to finish fade-in
             * then do following code
             */
            console.log(`GAME PLAY INIT STATE FADE IN COMPLETE`)
            this.camera_Faded_IN = true
            this.prefab.controlState.setState('intro')

            // GameOptions.txt_title_manager.controlState.setState('wave_title_in')

          }, this)
        // this.prefab.controlState.setState(this.prefab.startState)
    }
    
    update ()
    {

    }

}