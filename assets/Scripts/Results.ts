import { _decorator, Component, Label, Node } from 'cc';
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

    maxScore: number = 0;
    currentScore: number;

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


