
import {MenuScene} from './Scene/MenuScene.mjs'

let phaserGame;
window.addEventListener("load", () => {
    if (phaserGame == null) {
        phaserGame = new PhaserGame();
        phaserGame.init();
    }
});

class PhaserGame {
    init() {
        let config = {
            type: Phaser.AUTO,
            width: 1200,
            height: 700,
            scene: MenuScene
        };

        const game = new Phaser.Game(config);

        const maxWidth = 1280;
        const aspectRatio = config.width / config.height;
        let gameWidth = window.innerWidth;
        let gameHeight = window.innerHeight;

        if (gameWidth > maxWidth) {
            gameWidth = maxWidth;
            gameHeight = gameWidth / aspectRatio;
        }

        config.width = gameWidth;
        config.height = gameHeight;

        window.addEventListener('resize', () => {
            gameWidth = window.innerWidth;
            gameHeight = window.innerHeight;

            if (gameWidth > maxWidth) {
                gameWidth = maxWidth;
                gameHeight = gameWidth / aspectRatio;
            }

            game.config.width = gameWidth;
            game.config.height = gameHeight;

            game.resize(gameWidth, gameHeight);
        });
    }
}

