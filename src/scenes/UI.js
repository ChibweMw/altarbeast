import GameOptions from "../game/GameOptions.js"

export default class UI extends Phaser.Scene
{
    constructor()
    {
        super('ui')

        this.data
    }

    init (data)
    {
        this.data = data // reference to the GAME scene
    }

    create()
    {
        // this.playerHPText = this.add.bitmapText(8, 18, 'tentown', `${this.data.gameScene.player.HP}`, 12).setOrigin(0)

        const screenWidthCenter = this.scale.width / 2
        const screenHeight = this.scale.height
        this.scoreText = this.add.bitmapText(screenWidthCenter, 8, 'tentown', `${GameOptions.playerScore}`, 12).setOrigin(0.5, 0)

        const ui_player_hp_x = screenWidthCenter
        const ui_player_hp_y = screenHeight - 16
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
        this.ui_health_full.width = 16 * this.data.gameScene.player.HP
        // this.ui_ap.width = 16 * this.data.gameScene.player.AP
    }
}