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
        this.load.atlas('ATLAS-oni', '../../assets/sprites/player/ATLAS-ONI.png', '../../assets/sprites/player/ATLAS-ONI.json')
        // PLAYER ATTACK TESTS
        this.load.spritesheet('player-attack-02', '../../assets/sprites/player/anim-player-attack-02-02-split.png', { frameWidth: 48, frameHeight: 48 }) //anim-player-attack-split-swipe-01
        this.load.spritesheet('oni-club-swing-01', '../../assets/sprites/player/anim-player-attack-02-01-split.png', { frameWidth: 72, frameHeight: 32 })
        // this.load.spritesheet('oni-club-swing-01', '../../assets/sprites/player/anim-player-attack-02-01-split.png', { frameWidth: 72, frameHeight: 31, startFrame: 5, endFrame: 7 })
        this.load.spritesheet('player-attack-02-crouch', '../../assets/sprites/player/anim-player-attack-02-02-crouch-split.png', { frameWidth: 48, frameHeight: 48 })

        this.load.spritesheet('fx-player-jump', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 3, endFrame: 5 })
        this.load.spritesheet('fx-player-land', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 5, endFrame: 8 })
        
        // Player attack hitboxes
        this.load.json('oni-attack-slices', '../../assets/sprites/player/anim-player-attack-split-swipe-01.json')
        
        // ENEMIES
        this.load.spritesheet('floater', '../../assets/sprites/enemies/anim-enemy-floater.png', { frameWidth: 16, frameHeight: 32 })
        this.load.spritesheet('dummy', '../../assets/sprites/enemies/enemy-dummy--fish-crawler.png', { frameWidth: 16, frameHeight: 32 })
        this.load.spritesheet('enemy-fish', '../../assets/sprites/enemies/enemy-dummy--fish-crawler.png', { frameWidth: 16, frameHeight: 16, startFrame: 1, endFrame: 8 })
        this.load.spritesheet('enemy-crawler', '../../assets/sprites/enemies/enemy-dummy--fish-crawler.png', { frameWidth: 32, frameHeight: 16, startFrame: 3, endFrame: 4 })
        
        //BELL 
        this.load.spritesheet('altar-bell', '../../assets/sprites/Bell/anim-bell.png', {frameWidth: 48, frameHeight: 64})

        // ITEMS
        this.load.spritesheet('sw-axe', '../../assets/sprites/items/sw-axe.png', { frameWidth: 16, frameHeight: 16 })

        // TILESETS
        this.load.image('tiles-arena', '../../assets/sprites/tiles/tiles-level.png')
        this.load.image('tiles-arena-extruded', '../../assets/sprites/tiles/tiles-level-extruded.png')
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

    create ()
    {

        // console.log(`>>>>>>>>>>>>>>>>>>>>>>>>${this.cache.json.get('oni-attack-slices').meta.slices[0].keys[0].bounds.w}`)
        // SPRITESHEETS
        const SHEET_oni_frame_WIDTH = 144
        const SHEET_oni_idle  = this.textures.addSpriteSheetFromAtlas(
            'oni-idle',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-walk',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 2,
                endFrame: 2,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        const SHEET_oni_walk  = this.textures.addSpriteSheetFromAtlas(
            'oni-walk',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-walk',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 3,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH,
            }
        )
        const SHEET_oni_jump  = this.textures.addSpriteSheetFromAtlas(
            'oni-jump',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-jump',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 0,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        const SHEET_oni_crouch  = this.textures.addSpriteSheetFromAtlas(
            'oni-crouch',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-crouch',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 0,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        const SHEET_oni_attack_stand  = this.textures.addSpriteSheetFromAtlas(
            'oni-attack-stand',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-attack',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 3,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        const SHEET_oni_attack_crouch  = this.textures.addSpriteSheetFromAtlas(
            'oni-attack-crouch',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-attack',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 4,
                endFrame: 7,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        const SHEET_oni_attack_hurt  = this.textures.addSpriteSheetFromAtlas(
            'oni-attack-hurt',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-hurt',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 1,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        const SHEET_oni_attack_death  = this.textures.addSpriteSheetFromAtlas(
            'oni-attack-death',
            {
                atlas: 'ATLAS-oni',
                frame: 'anim-player-death',
                frameWidth: 48,
                frameHeight: 48,
                startFrame: 0,
                endFrame: 3,
                // spacing: 48,
                // margin: SHEET_oni_frame_WIDTH
            }
        )
        // const ATLAS_JSON = this.textures.get('ATLAS-oni')
        // console.log(`ATLAS_JSON Frame Names >> ${ATLAS_JSON.key}`)

        // const ATLAS_SHEET_GROUP =[
        //     SHEET_oni_idle, 
        //     SHEET_oni_walk, 
        //     SHEET_oni_jump, 
        //     SHEET_oni_crouch, 
        //     SHEET_oni_attack_stand, 
        //     SHEET_oni_attack_crouch,
        //     SHEET_oni_attack_hurt,
        //     SHEET_oni_attack_death
        // ]

        // ANIMATIONS 
        const anim_FramRate = 8
        // this.load.spritesheet('oni-club-swing-01', '../../assets/sprites/player/anim-player-attack-02-01-split.png', { frameWidth: 48, frameHeight: 48, startFrame: 5, endFrame: 7 })

        const ANIM_CNF_oni_club_swing_01 = {
            key: 'anim-oni-club-swing-01',
            // frames: this.anims.generateFrameNumbers('oni-attack-stand', { start: 0, end: 3, first: 0 }),
            frames: this.anims.generateFrameNumbers('oni-club-swing-01', { start: 0, end: 2, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0,
        }

        const ANIM_CNF_oni_idle = {
            key: 'anim-oni-idle',
            frames: this.anims.generateFrameNumbers('oni-idle', { start: 2, end: 2, first: 2 }),
            frameRate: anim_FramRate,
            repeat: -1
        }
        const ANIM_CNF_oni_walk = {
            key: 'anim-oni-walk',
            frames: this.anims.generateFrameNumbers('oni-walk', { start: 0, end: 3, first: 0 }),
            frameRate: anim_FramRate,
            repeat: -1
        }
        const ANIM_CNF_oni_jump = {
            key: 'anim-oni-jump',
            frames: this.anims.generateFrameNumbers('oni-jump', { start: 0, end: 0, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const ANIM_CNF_oni_crouch = {
            key: 'anim-oni-crouch',
            frames: this.anims.generateFrameNumbers('oni-crouch', { start: 0, end: 0, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }

        // NEW ATTACK WITH BIGGER FRAME TEST
        const ANIM_CNF_attack_stand = {
            key: 'anim-oni-attack-stand',
            // frames: this.anims.generateFrameNumbers('oni-attack-stand', { start: 0, end: 3, first: 0 }),
            frames: this.anims.generateFrameNumbers('player-attack-02', { start: 0, end: 4, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }

        const ANIM_CNF_attack_crouch = {
            key: 'anim-oni-attack-crouch',
            // frames: this.anims.generateFrameNumbers('oni-attack-crouch', { start: 4, end: 7, first: 4 }),
            frames: this.anims.generateFrameNumbers('player-attack-02-crouch', { start: 0, end: 4, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const ANIM_CNF_attack_jump = {
            key: 'anim-oni-attack-jump',
            // frames: this.anims.generateFrameNumbers('oni-attack-crouch', { start: 4, end: 7, first: 4 }),
            frames: this.anims.generateFrameNumbers('player-attack-02-crouch', { start: 0, end: 4, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const ANIM_CNF_attack_hurt = {
            key: 'anim-oni-attack-hurt',
            frames: this.anims.generateFrameNumbers('oni-attack-hurt', { start: 0, end: 7, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const ANIM_CNF_attack_death = {
            key: 'anim-oni-attack-death',
            frames: this.anims.generateFrameNumbers('oni-attack-death', { start: 0, end: 3, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const anim_conf_oni = [ANIM_CNF_oni_club_swing_01, ANIM_CNF_oni_idle, ANIM_CNF_oni_walk, ANIM_CNF_oni_jump, ANIM_CNF_oni_crouch, ANIM_CNF_attack_stand, ANIM_CNF_attack_crouch, ANIM_CNF_attack_jump, ANIM_CNF_attack_hurt, ANIM_CNF_attack_death]
        anim_conf_oni.forEach((animation) => {this.anims.create(animation)})

        // VFX ANIMATIONS 

        const anim_vfx_FrameRate = 8
        // COMBAT
        const ANIM_CNF_VFX_BLOCK = {
            key: 'anim-fx-hit-block',
            frames: this.anims.generateFrameNumbers('fx-hit-block', { start: 0, end: 2, first: 0 }),
            frameRate: anim_vfx_FrameRate,
            repeat: 0
        }
        const ANIM_CNF_VFX_CONNECT = {
            key: 'anim-fx-hit-connect',
            frames: this.anims.generateFrameNumbers('fx-hit-connect', { start: 10, end: 12, first: 0 }),
            frameRate: anim_vfx_FrameRate,
            repeat: 0
        }
        const ANIM_CNF_VFX_ENEMY_DEATH = {
            key: 'anim-fx-hit-enemy-death',
            frames: this.anims.generateFrameNumbers('fx-hit-enemy-death', { start: 5, end: 9, first: 0 }),
            frameRate: anim_vfx_FrameRate,
            repeat: 0
        }

        // PLATFORMING
        // this.load.spritesheet('fx-player-jump', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 3, endFrame: 5 })
        // this.load.spritesheet('fx-player-land', '../../assets/sprites/fx/fx-collision-and-jump.png', { frameWidth: 16, frameHeight: 16, startFrame: 5, endFrame: 8 })

        const ANIM_CNF_VFX_PLAYER_JUMP = {
            key: 'anim-fx-player-jump',
            frames: this.anims.generateFrameNumbers('fx-player-jump', { start: 3, end: 5, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const ANIM_CNF_VFX_PLAYER_LAND = {
            key: 'anim-fx-player-land',
            frames: this.anims.generateFrameNumbers('fx-player-land', { start: 5, end: 8, first: 0 }),
            frameRate: anim_FramRate,
            repeat: 0
        }
        const anim_conf_vfx = [ANIM_CNF_VFX_BLOCK, ANIM_CNF_VFX_CONNECT, ANIM_CNF_VFX_ENEMY_DEATH, ANIM_CNF_VFX_PLAYER_JUMP, ANIM_CNF_VFX_PLAYER_LAND]
        anim_conf_vfx.forEach((animation) => {this.anims.create(animation)})
    }

    complete () 
    {
        this.scene.start('game-world')
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