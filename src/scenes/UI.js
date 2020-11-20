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

        const screenWidthCenter = width / 2
        this.scoreText = this.add.bitmapText(screenWidthCenter, 8, 'tentown', `${GameOptions.playerScore}`, 12).setOrigin(0.5, 0)

        const ui_player_hp_x = screenWidthCenter
        const ui_player_hp_y = height - 16
        const ui_player_hp_origin_x = 0.5
        const ui_player_hp_origin_y = 0

        this.ui_health_empty = this.add.tileSprite(ui_player_hp_x, ui_player_hp_y, 16 * this.data.gameScene.player.HP, 16, 'ui-health', 6).setOrigin(ui_player_hp_origin_x, ui_player_hp_origin_y)
        this.ui_health_full = this.add.tileSprite(this.ui_health_empty.x - this.ui_health_empty.width / 2, ui_player_hp_y, 16 * this.data.gameScene.player.HP, 16, 'ui-health', 4).setOrigin(0, ui_player_hp_origin_y)
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
        this.scoreText.setText(`${GameOptions.playerScore}`)
        this.ui_health_full.width = 16 * this.data.gameScene.player.HP
    }
}