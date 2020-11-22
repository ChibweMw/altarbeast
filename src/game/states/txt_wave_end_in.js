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
        const banner_height = height * 0.2
        const overlay = this.scene.add.graphics({
            x: 0,
            y: -banner_height,
            fillStyle: {
                color: 0xFF0080,
                alpha: 0.9
            }
        })
        overlay.fillRect(0, 0, width, banner_height)

        const screenWidthCenter = width / 2
        this.wave_roundText = this.scene.add.bitmapText(10, -24, 'tentown', `WAVE CLEAR : ${GameOptions.wave_round}`, 24).setOrigin(0, 0)

        const text_yPos = 0.8
        const banner_yPos = 0.8
        const text_Height = height * text_yPos
        const banner_Height = height * banner_yPos

        this.outro_text_tween_Deco = this.scene.tweens.add({
            targets: overlay,
            y: {from: 0,to: banner_Height },
            alpha: { from: 0, to: 1 },
            duration: 300,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 2000,
            repeat: 0,
        })

        this.outro_text_tween_Text = this.scene.tweens.add({
            targets: this.wave_roundText,
            y: {from: 0,to: text_Height},
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