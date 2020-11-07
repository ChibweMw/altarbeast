import GameOptions from "../GameOptions.js"
import Player from '../Player.js'

export default class PLAYER_DEATH_SEQUENCE
{
    /** @param {Player} player*/

    constructor (player)
    {
        this.player = player
        this.anim_DeathPlayed = false
    }


    enter ()
    {
        // console.log(`AI: ENTER STATE >> player > DEATH SEQ`) 
        this.anim_DeathPlayed = false  
        this.player.clearTint()    
        this.player.scene.spawnHitVFX(this.player.body.x, this.player.body.y + 16, 'fx-player-jump')

    }
    
    update ()
    {
        this.player.setVelocityX(0)

        if (this.player.isHurt && this.player.body.blocked.down)
        {
            if (!this.anim_DeathPlayed)
            {
                this.anim_DeathPlayed = true
                this.player.play('anim-oni-attack-death')
            }
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'anim-oni-attack-death')
            {
                // console.log(`DEATH ANIM ISPLAYING`) 
                if (this.player.anims.currentFrame === this.player.anims.currentAnim.getLastFrame())
                {
                    this.player.scene.spawnHitVFX(this.player.body.x, this.player.body.y + 16, 'fx-player-jump')
                    this.player.scene.spawnHitVFX(this.player.body.x - 16, this.player.body.y + 16, 'fx-player-land')
                    this.player.scene.spawnHitVFX(this.player.body.x + 16, this.player.body.y + 16, 'fx-player-land')
                }
                return
            }
            else
            {
                if (this.player.isAlive)
                {
                    console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PLAYER DEATH ANIM FINISHED`) 
                    this.player.isAlive = false
                }
            }
        }
    }
}