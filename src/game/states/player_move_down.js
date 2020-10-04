import GameOptions from "../GameOptions.js"

export default class Player_MOVE_DOWN
{
    /** @param {Phaser.GameObjects.Sprite} player*/

    constructor (player)
    {
        this.player = player
    }

    enter ()
    {
        console.log(`>> PLAYER 'MOVE DOWN' STATE`)
    }

}