import GameOptions from "../GameOptions.js"
import Hopper from "../Hopper_Fish.js"

let cnf_hopperFish_group
export default cnf_hopperFish_group = 
{
    group_name: 'GROUP_hopFish',
    pool_name: 'GROUP_POOL_hopFish',
    group_cnf: {
        classType: Hopper,
        max: 10,
        maxSize: 10,
        allowGravity: true,
        visible: false,
        active: false,
        gravityY: GameOptions.playerGravity,
        removeCallback: function (hopfish) {
            hopfish.scene.GROUP_POOL_hopFish.add(hopfish)
        }
    },
    pool_cnf: {
        removeCallback: function (hopfish) {
            hopfish.scene.GROUP_hopFish.add(hopfish)
        }
    }
}