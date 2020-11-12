import GameOptions from "../GameOptions.js"
import Item_Base from "../Item_Base.js"

let cnf_item_base_group
export default cnf_item_base_group =
{
    group_name: 'GROUP_ITEM',
    pool_name: 'GROUP_POOL_ITEM',
    group_cnf: {
        classType: Item_Base,
        max: 10,
        maxSize: 10,
        allowGravity: true,
        gravityY: GameOptions.playerGravity / 2,
        velocityY: -550,
        // accelerationY: -100,
        allowDrag: true,
        dragY: 1,
        visible: false,
        runChildUpdate: true,
        removeCallback: function (item) {
            item.scene.GROUP_POOL_ITEM.add(item)
        }
    },
    pool_cnf: {
        removeCallback: function (item) {
            item.scene.GROUP_ITEM.add(item)
        }
    }
}