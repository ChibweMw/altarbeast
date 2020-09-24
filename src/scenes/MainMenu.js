export default class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super('menu-main')
    }
    
    preload()
    {
        this.load.image('logo', '../../assets/sprites/branding/logo.png')
    }
    
    create()
    {
        
        this.add.image(this.game.scale.width / 2, this.game.scale.height / 2, 'logo')
    }

}