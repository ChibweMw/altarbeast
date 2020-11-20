import GameOptions from "../game/GameOptions.js"

export default class UI extends Phaser.Scene
{
    constructor()
    {
        super('ui')

        this.data
    }

    intro_Played

    init (data)
    {
        this.data = data // reference to the GAME scene
        this.intro_Played = false
    }

    create()
    {
        const width = this.scale.width
        const height = this.scale.height
        
        // SCENE OVERLAY GRAPHIC

        const overlay = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 0.9
            }
        })
        overlay.fillRect(0, 0, width, height * 0.2)

        const screenWidthCenter = width / 2
        this.wave_roundText = this.add.bitmapText(10, height / 2, 'tentown', `WAVE ROUND : ${GameOptions.wave_round}`, 24).setOrigin(0, 0)

        this.intro_text_tween_Deco = this.tweens.add({
            targets: overlay,
            y: {from: 0,to: height / 2 },
            alpha: { from: 0, to: 1 },
            duration: 300,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 2000,
            repeat: 0,
        })

        this.intro_text_tween_Text = this.tweens.add({
            targets: this.wave_roundText,
            y: {from: 0,to: height / 2 },
            alpha: { from: 0, to: 1 },
            duration: 600,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            hold: 1600,
            repeat: 0,
        })


        this.scoreText = this.add.bitmapText(screenWidthCenter, 8, 'tentown', `${GameOptions.playerScore}`, 12).setOrigin(0.5, 0)

        const ui_player_hp_x = screenWidthCenter
        const ui_player_hp_y = height - 16
        const ui_player_hp_origin_x = 0.5
        const ui_player_hp_origin_y = 0

        this.ui_health_empty = this.add.tileSprite(ui_player_hp_x, ui_player_hp_y, 16 * this.data.gameScene.player.HP, 16, 'ui-health', 6).setOrigin(ui_player_hp_origin_x, ui_player_hp_origin_y)
        this.ui_health_full = this.add.tileSprite(this.ui_health_empty.x - this.ui_health_empty.width / 2, ui_player_hp_y, 16 * this.data.gameScene.player.HP, 16, 'ui-health', 4).setOrigin(0, ui_player_hp_origin_y)
        
        // this.ui_ap = this.add.tileSprite(ui_player_hp_x, ui_player_hp_y - 16, 16 * this.data.gameScene.player.AP, 16, 'ui-health', 2).setOrigin(ui_player_hp_origin_x, ui_player_hp_origin_y)
    }

    update()
    {
        // this.playerHPText.setText(`${this.data.gameScene.player.HP}`)
        this.scoreText.setText(`${GameOptions.playerScore}`)
        this.wave_roundText.setText(`WAVE ROUND : ${GameOptions.wave_round}`)
        this.ui_health_full.width = 16 * this.data.gameScene.player.HP
        // this.ui_ap.width = 16 * this.data.gameScene.player.AP
        // this.tweens.getAllTweens()[0].setCallback('onComplete', this.completed, null, this)
        
        if (!this.intro_Played && this.tweens.getAllTweens().length <= 0)
        {
            this.intro_Played = true
            console.log(`get all tweens >> ${this.tweens.getAllTweens().length}`)
            GameOptions.wave_manager.controlState.setState('start')
        }
    }
}