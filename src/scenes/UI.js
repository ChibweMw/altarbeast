import Ai_Controller from "../game/Ai_Controller.js"
import GameOptions from "../game/GameOptions.js"
import cnf_txt_title_manager_group from "../game/prefab_configs/cnf_txt_title_manager_group.js"

export default class UI extends Phaser.Scene
{
    constructor()
    {
        super('ui')

        this.data
    }

    intro_Played
    prefabGroups = [cnf_txt_title_manager_group]

    init (data)
    {
        this.data = data // reference to the GAME scene
        this.intro_Played = false
    }

    create()
    {
        this.prefabGroups.forEach((pref_group) => {
            this[pref_group.group_name] = this.add.group(pref_group.group_cnf)
            this[pref_group.pool_name] = this.add.group(pref_group.pool_cnf)            
        })

        this.createWaveManager(0, 0, cnf_txt_title_manager_group) //txt title manager
        const width = this.scale.width
        const height = this.scale.height
        
        // SCENE OVERLAY GRAPHIC

        // const overlay = this.add.graphics({
        //     x: 0,
        //     y: 0,
        //     fillStyle: {
        //         color: 0x000000,
        //         alpha: 0.9
        //     }
        // })
        // overlay.fillRect(0, 0, width, height * 0.2)

        // this.wave_roundText = this.add.bitmapText(10, height / 2, 'tentown', `WAVE ROUND : ${GameOptions.wave_round}`, 24).setOrigin(0, 0)

        // this.intro_text_tween_Deco = this.tweens.add({
        //     targets: overlay,
        //     y: {from: 0,to: height / 2 },
        //     alpha: { from: 0, to: 1 },
        //     duration: 300,
        //     ease: 'Cubic.easeInOut',
        //     yoyo: true,
        //     hold: 2000,
        //     repeat: 0,
        // })

        // this.intro_text_tween_Text = this.tweens.add({
        //     targets: this.wave_roundText,
        //     y: {from: 0,to: height / 2 },
        //     alpha: { from: 0, to: 1 },
        //     duration: 600,
        //     ease: 'Cubic.easeInOut',
        //     yoyo: true,
        //     hold: 1600,
        //     repeat: 0,
        // })

        const screenWidthCenter = width / 2
        this.scoreText = this.add.bitmapText(screenWidthCenter, 8, 'tentown', `${GameOptions.playerScore}`, 12).setOrigin(0.5, 0)

        const ui_player_hp_x = screenWidthCenter
        const ui_player_hp_y = height - 16
        const ui_player_hp_origin_x = 0.5
        const ui_player_hp_origin_y = 0

        this.ui_health_empty = this.add.tileSprite(ui_player_hp_x, ui_player_hp_y, 16 * this.data.gameScene.player.HP, 16, 'ui-health', 6).setOrigin(ui_player_hp_origin_x, ui_player_hp_origin_y)
        this.ui_health_full = this.add.tileSprite(this.ui_health_empty.x - this.ui_health_empty.width / 2, ui_player_hp_y, 16 * this.data.gameScene.player.HP, 16, 'ui-health', 4).setOrigin(0, ui_player_hp_origin_y)
        
        // this.ui_ap = this.add.tileSprite(ui_player_hp_x, ui_player_hp_y - 16, 16 * this.data.gameScene.player.AP, 16, 'ui-health', 2).setOrigin(ui_player_hp_origin_x, ui_player_hp_origin_y)
    }

    createWaveManager(x, y, pref_group)
    {
        if (this[pref_group.group_name].countActive() >= this[pref_group.group_name].maxSize)
        {
            return
        }
        let new_Wave_manager
        
        if(this[pref_group.pool_name].getLength()){
            new_Wave_manager = this[pref_group.pool_name].getFirst()
            new_Wave_manager.controlState.setState('init')
            new_Wave_manager.x = x
            new_Wave_manager.y = y
            new_Wave_manager.setActive(true)
            new_Wave_manager.setVisible(true)
            
            this[pref_group.pool_name].remove(new_Wave_manager)
        }
        else{
            new_Wave_manager = this[pref_group.group_name].get(x, y, this.scale.width, this.scale.width)
            new_Wave_manager.setData({ "props": pref_group.props, "states": pref_group.states })
            new_Wave_manager.data.values.props.group = this[pref_group.group_name]
            new_Wave_manager.data.values.props.pool = this[pref_group.pool_name]

            for (const [propName, propValue] of Object.entries(new_Wave_manager.data.values.props)) {
                if (propName === 'controlState')
                {
                    new_Wave_manager[propName] = new Ai_Controller(new_Wave_manager)
                }
            }
            new_Wave_manager.controlState.setState('init')

            this[pref_group.group_name].add(new_Wave_manager)   
            GameOptions.txt_title_manager = new_Wave_manager
        }

    }

    update()
    {
        // this.playerHPText.setText(`${this.data.gameScene.player.HP}`)
        this.scoreText.setText(`${GameOptions.playerScore}`)
        // this.wave_roundText.setText(`WAVE ROUND : ${GameOptions.wave_round}`)
        this.ui_health_full.width = 16 * this.data.gameScene.player.HP
        // this.ui_ap.width = 16 * this.data.gameScene.player.AP
        // this.tweens.getAllTweens()[0].setCallback('onComplete', this.completed, null, this)
        
        // if (!this.intro_Played && this.tweens.getAllTweens().length <= 0)
        // {
        //     this.intro_Played = true
        //     console.log(`get all tweens >> ${this.tweens.getAllTweens().length}`)
        //     GameOptions.wave_manager.controlState.setState('start')
        // }
    }
}