export default class Preload extends Phaser.Scene
{
    constructor()
    {
        super('preload')
    }

    preload()
    {
        // ASSET  LOADING
        this.load.image('logo', '../../assets/sprites/branding/logo.png')

        // LOADING BAR 

        this.loadingBar()

        // LOADING EVENTS
        this.load.on('progress', this.updateBar, this)
        this.load.on('complete', this.complete, this)

    }

    complete () 
    {
        console.log(`COMPLETE!`)
        this.scene.start('menu-main')
    }

    loadingBar ()
    {
        this.graphics = this.add.graphics()
		this.newGraphics = this.add.graphics()
        let progressBar = new Phaser.Geom.Rectangle(this.scale.width / 2, this.scale.height / 2, 400, 50)
        progressBar.centerX = this.scale.width / 2
        progressBar.centerY = this.scale.height / 2
		let progressBarFill = new Phaser.Geom.Rectangle(this.scale.width / 2, this.scale.height / 2, 290, 40)
        progressBarFill.centerX = this.scale.width / 2, this.scale.height / 2
        
		this.graphics.fillStyle(0xffffff, 1)
		this.graphics.fillRectShape(progressBar)
        
		this.newGraphics.fillStyle(0x3587e2, 1)
        this.newGraphics.fillRectShape(progressBarFill)
        
        this.loadingText = this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, 'tentown', 'Loading', 12).setOrigin(0.5)
    }

    updateBar(percentage)
    {
        this.newGraphics.clear()
        this.newGraphics.fillStyle(0x3587e2, 1)
        let progressBarFill = new Phaser.Geom.Rectangle(this.scale.width / 2, this.scale.height / 2, percentage*390, 40)
        progressBarFill.centerX = this.scale.width / 2
        progressBarFill.centerY = this.scale.height / 2
        this.newGraphics.fillRectShape(progressBarFill)
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.scale.width / 2, this.scale.height / 2, percentage*390, 40))
                
        percentage = percentage * 100
        this.loadingText.setText(`Loading: ${percentage.toFixed(0)}%`)
        console.log("P:" + percentage)
    }
}