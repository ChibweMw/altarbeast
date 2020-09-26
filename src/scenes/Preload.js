export default class Preload extends Phaser.Scene
{
    constructor()
    {
        super('preload')
    }

    newGraphics

    preload()
    {
        // ASSET  LOADING
        this.load.image('logo', '../../assets/sprites/branding/logo.png')
        
        // UI
        this.load.spritesheet('ui-cursor', '../../assets/sprites/UI/UI.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 1 })
        this.load.spritesheet('ui-health', '../../assets/sprites/UI/UI.png', { frameWidth: 16, frameHeight: 16, startFrame: 4, endFrame: 6 })
        this.load.spritesheet('ui-mp', '../../assets/sprites/UI/UI.png', { frameWidth: 16, frameHeight: 16, startFrame: 3, endFrame: 3 })
        this.load.spritesheet('ui-sw-axe', '../../assets/sprites/UI/UI.png', { frameWidth: 16, frameHeight: 16, startFrame: 2, endFrame: 2 })
        
        // FX
        this.load.spritesheet('fx-hit-block', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 2 })
        this.load.spritesheet('fx-hit-connect', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 10, endFrame: 12 })
        this.load.spritesheet('fx-hit-enemy-death', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 32, frameHeight: 32, startFrame: 5, endFrame: 9 })
        
        // PLAYER ASSETS
        this.load.spritesheet('oni-idle', '../../assets/sprites/player/anim-player-walk.png', { frameWidth: 16, frameHeight: 32, startFrame: 2, endFrame: 2 })
        this.load.spritesheet('oni-walk', '../../assets/sprites/player/anim-player-walk.png', { frameWidth: 16, frameHeight: 32, startFrame: 0, endFrame: 3 })
        this.load.spritesheet('oni-jump-crouch', '../../assets/sprites/player/anim-player-jump-crouch.png', { frameWidth: 16, frameHeight: 32, startFrame: 0, endFrame: 0 })
        this.load.spritesheet('oni-attack-stand', '../../assets/sprites/player/anim-player-attack.png', { frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 3 })
        this.load.spritesheet('oni-attack-crouch', '../../assets/sprites/player/anim-player-attack.png', { frameWidth: 48, frameHeight: 48, startFrame: 4, endFrame: 7 })
        this.load.spritesheet('oni-attack-hurt', '../../assets/sprites/player/anim-player-hurt.png', { frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 1 })
        this.load.spritesheet('oni-attack-death', '../../assets/sprites/player/anim-player-death.png', { frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 3 })
        
        this.load.spritesheet('fx-player-jump', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 3, endFrame: 5 })
        this.load.spritesheet('fx-player-land', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 5, endFrame: 8 })
        
        // ENEMIES
        this.load.spritesheet('floater', '../../assets/sprites/enemies/anim-enemy-floater.png', { frameWidth: 16, frameHeight: 32 })
        this.load.spritesheet('dummy', '../../assets/sprites/enemies/enemy-dummy--fish-crawler.png', { frameWidth: 16, frameHeight: 32 })
        this.load.spritesheet('enemy-fish', '../../assets/sprites/enemies/enemy-dummy--fish-crawler.png', { frameWidth: 16, frameHeight: 16, startFrame: 1, endFrame: 4 })
        this.load.spritesheet('enemy-crawler', '../../assets/sprites/enemies/enemy-dummy--fish-crawler.png', { frameWidth: 32, frameHeight: 16, startFrame: 3, endFrame: 4 })
        
        // ITEMS
        this.load.spritesheet('sw-axe', '../../assets/sprites/items/sw-axe.png', { frameWidth: 16, frameHeight: 16 })

        // TILESETS
        this.load.image('tiles-arena', '../../assets/sprites/tiles/tiles-level.png')
        this.load.tilemapTiledJSON('level-arena-01', '../../assets/sprites/tiles/level-tiles-01.json')

        // AUDIO
        // MUSIC
        this.load.audio('main-menu-theme-01', '../../assets/audio/music/eery-1.wav')
        this.load.audio('main-menu-theme-02', '../../assets/audio/music/eery-2.wav')
        this.load.audio('main-menu-theme-03', '../../assets/audio/music/eery-3.wav')

        this.load.audio('main-game-theme', '../../assets/audio/music/Abstraction-Three-Red-Hearts-Box-Jump.wav')

        this.load.audio('main-game-over-theme-01', '../../assets/audio/music/Abstraction-Three-Red-Hearts-Sanctuary.wav')
        this.load.audio('main-game-over-theme-02', '../../assets/audio/music/falling-star.wav')

        // SFX
        this.load.audio('collect-health', '../../assets/audio/sfx/collect-health.wav')
        this.load.audio('collect-subweapon', '../../assets/audio/sfx/collect-subweapon.wav')
        this.load.audio('hit-block', '../../assets/audio/sfx/hit-block.wav')
        this.load.audio('hit-connect', '../../assets/audio/sfx/hit-connect.wav')
        this.load.audio('item-destroyed', '../../assets/audio/sfx/item-destroyed.wav')
        this.load.audio('player-attack', '../../assets/audio/sfx/player-attack.wav')
        this.load.audio('player-die', '../../assets/audio/sfx/player-die.wav')
        this.load.audio('player-hurt', '../../assets/audio/sfx/player-hurt.wav')
        this.load.audio('player-jump', '../../assets/audio/sfx/player-jump.wav')
        this.load.audio('player-landing', '../../assets/audio/sfx/player-landing.wav')
        this.load.audio('player-lose', '../../assets/audio/sfx/player-lose.wav')
        this.load.audio('player-new-hs', '../../assets/audio/sfx/player-new-hs.wav')
        this.load.audio('subweapon-axe', '../../assets/audio/sfx/subweapon-axe.wav')
        this.load.audio('ui-cancel', '../../assets/audio/sfx/UI-cancel.wav')
        this.load.audio('ui-ok', '../../assets/audio/sfx/UI-ok.wav')
        this.load.audio('ui-cursor-nav', '../../assets/audio/sfx/UI-cursor-nav.wav')

        // LOADING BAR 
        this.loadingBar()

        // LOADING EVENTS
        this.load.on('progress', this.updateBar, this)
        this.load.on('complete', this.complete, this)

    }

    complete () 
    {
        // console.log(`COMPLETE!`)
        this.scene.start('menu-main')
        // this.scene.start('game')
    }

    loadingBar ()
    {
        this.graphics = this.add.graphics()
		this.newGraphics = this.add.graphics()
        let progressBar = new Phaser.Geom.Rectangle(this.scale.width / 2, this.scale.height / 2, 400, 50)
        progressBar.centerX = this.scale.width / 2
        progressBar.centerY = this.scale.height / 2
		let progressBarFill = new Phaser.Geom.Rectangle(this.scale.width / 2, this.scale.height / 2, 0 * 290, 40)
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
                
        percentage = percentage * 100
        this.loadingText.setText(`Loading: ${percentage.toFixed(0)}%`)
        // console.log("P:" + percentage)
    }
}