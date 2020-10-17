export default class Controls {
	constructor(scene) {
		this.scene = scene;
		this.enabled = true;
		this.keyboard = this.scene.input.keyboard.createCursorKeys();
		this.key = this.scene.input.keyboard.addKeys({
			'TAB': Phaser.Input.Keyboard.KeyCodes.TAB,
			'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
			'Space': Phaser.Input.Keyboard.KeyCodes.SPACE,
			'X': Phaser.Input.Keyboard.KeyCodes.X,
			'One': Phaser.Input.Keyboard.KeyCodes.ONE,
			'Two': Phaser.Input.Keyboard.KeyCodes.TWO,
			'F': Phaser.Input.Keyboard.KeyCodes.F,
			'C': Phaser.Input.Keyboard.KeyCodes.C,
			'W': Phaser.Input.Keyboard.KeyCodes.W,
			'M': Phaser.Input.Keyboard.KeyCodes.M,
			'I': Phaser.Input.Keyboard.KeyCodes.I,
			'A': Phaser.Input.Keyboard.KeyCodes.A,
			'S': Phaser.Input.Keyboard.KeyCodes.S,
			'D': Phaser.Input.Keyboard.KeyCodes.D,
			'E': Phaser.Input.Keyboard.KeyCodes.E,
			'Enter': Phaser.Input.Keyboard.KeyCodes.ENTER
		});
	}

	on(actionName) {
		switch (actionName) {
			case 'left': return (this.keyboard.left.isDown || this.key.A.isDown) && this.enabled;
			case 'right': return (this.keyboard.right.isDown || this.key.D.isDown) && this.enabled;
			case 'down': return (this.keyboard.down.isDown || this.key.S.isDown) && this.enabled;
			case 'up': return (this.keyboard.up.isDown || this.key.W.isDown) && this.enabled;
			case 'X': return this.key.X.isDown && this.enabled;
			case 'Y': return this.key.C.isDown && this.enabled;

			case 'M': return this.key.M.isDown && this.enabled;
			case 'I': return this.key.I.isDown && this.enabled;

			case 'jump': return (this.key.Space.isDown || this.key.F.isDown) && this.enabled;
			case 'B': return (this.key.E.isDown || this.key.Enter.isDown) && this.enabled;
			case 'LT': return this.key.One.isDown && this.enabled;
			case 'RT': return this.key.Two.isDown && this.enabled;
			case 'MENU': return this.key.ESC.isDown && this.enabled;
		}
	}
}