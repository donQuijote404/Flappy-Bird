import { _decorator, Button, Component, director, find, Label, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
    })
    public scorreLabel: Label;

    @property({
        type: Label,
    })
    public highSocer: Label;

    @property({
        type: Label,
    })
    public resultEnd: Label;

    @property({
        type: Label,
    })
    public tapToPlay: Label;

    @property({
        type: Button,
    })
    public buttonContinue: Button;

    @property({
        type: Button,
    })
    public buttonExit: Button;

    @property({
        type: Node,
    })
    public windowGameOver: Node;

    maxScore: number = 0;
    currentScore: number;
    public game;

    buttonEvent() {
        this.game = find('GameCtrl').getComponent('GameCtrl');

        this.buttonContinue.node.on(Node.EventType.TOUCH_END, () => {
            this.game.resetGame();
            this.game.bird.resetBird();
            this.resetScore();
            this.game.startGame();
            this.hideGameOver();
        })

        this.buttonExit.node.on(Node.EventType.TOUCH_END, () => {
            director.loadScene('scene menu');
        })
    }

    updateScore(num: number) {
        this.currentScore = num;

        this.scorreLabel.string = ('' + this.currentScore);
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }
    
    showGameOver() {
        this.windowGameOver.active = true;
    }

    hideGameOver() {
        this.windowGameOver.active = false;
    }

    showUserManual() {
        this.tapToPlay.node.active = true;
    }

    hideUserManual() {
        this.tapToPlay.node.active = false;
    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highSocer.string = 'High Score ' + this.maxScore;
        this.resultEnd.node.active = true;
        this.highSocer.node.active = true;
    }

    hideResults() {
        this.highSocer.node.active = false;
        this.resultEnd.node.active = false;
    }
}