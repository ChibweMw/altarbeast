import GameOptions from "../GameOptions.js"

export default class TXT_WAVE_TITLE_IN
{
    constructor (prefab)
    {
        this.prefab = prefab
        this.scene = prefab.scene
        this.intro_Played = false
    }

    enter ()
    {
        console.log('>>>>>>>>>>>>>>> title introoooooo <<<<<<<<<<<<<<')
        this.intro_Played = false

        const width = this.scene.scale.width
        const height = this.scene.scale.height
        
        // SCENE OVERLAY GRAPHIC

        const overlay = this.scene.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 0.9
            }
        })
        overlay.fillRect(0, 0, width, height * 0.2)

        const screenWidthCenter = width / 2
        this.wave_roundText = this.scene.add.bitmapText(10, height / 2, 'tentown', `WAVE ROUND : ${GameOptions.wave_round}`, 24).setOrigin(0, 0)

        this.intro_text_tween_Deco = this.scene.tweens.add({
            targets: overlay,
            y: {from: 0,to: height / 2 },
            alpha: { from: 0, to: 1 },
            duration: 300,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 2000,
            repeat: 0,
        })

        this.intro_text_tween_Text = this.scene.tweens.add({
            targets: this.wave_roundText,
            y: {from: 0,to: height / 2 },
            alpha: { from: 0, to: 1 },
            duration: 600,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 1600,
            repeat: 0,
            tint: 0xFF0080
        })
    }
    
    update ()
    {
        if (!this.intro_Played && this.scene.tweens.getAllTweens().length <= 0)
        {
            this.intro_Played = true
            console.log(`get all tweens >> ${this.scene.tweens.getAllTweens().length}`)
            this.prefab.controlState.setState('wave_title_out')
            // GameOptions.wave_manager.controlState.setState('start')
        }
    }

}