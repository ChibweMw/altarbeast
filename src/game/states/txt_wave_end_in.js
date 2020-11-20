import GameOptions from "../GameOptions.js"

export default class TXT_WAVE_END_IN
{
    constructor (prefab)
    {
        this.prefab = prefab
        this.scene = prefab.scene
        this.outro_Played = false
    }

    enter ()
    {
        console.log('>>>>>>>>>>>>>>> END WAVE INNNNNNNNNNNN <<<<<<<<<<<<<<')
        this.outro_Played = false

        const width = this.scene.scale.width
        const height = this.scene.scale.height
        
        // SCENE OVERLAY GRAPHIC

        const overlay = this.scene.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0xFF0080,
                alpha: 0.9
            }
        })
        overlay.fillRect(0, 0, width, height * 0.2)

        const screenWidthCenter = width / 2
        this.wave_roundText = this.scene.add.bitmapText(10, height / 2, 'tentown', `WAVE CLEAR : ${GameOptions.wave_round}`, 24).setOrigin(0, 0)

        this.outro_text_tween_Deco = this.scene.tweens.add({
            targets: overlay,
            y: {from: 0,to: height / 2 },
            alpha: { from: 0, to: 1 },
            duration: 300,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 2000,
            repeat: 0,
        })

        this.outro_text_tween_Text = this.scene.tweens.add({
            targets: this.wave_roundText,
            y: {from: 0,to: height / 2 },
            alpha: { from: 0, to: 1 },
            duration: 600,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 1600,
            repeat: 0,
            color: 0x000000
        })
    }
    
    update ()
    {
        console.log(`get all tweens >> ${this.scene.tweens.getAllTweens().length}`)
        if (!this.outro_Played && this.scene.tweens.getAllTweens().length <= 0)
        {
            this.outro_Played = true
            this.prefab.controlState.setState('wave_end_out')
        }
    }

}