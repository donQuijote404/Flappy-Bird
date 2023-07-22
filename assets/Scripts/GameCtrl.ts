import { _decorator, CCInteger, Collider, Collider2D, Component, Contact2DType, director, EventKeyboard, Input, input, IPhysics2DContact, KeyCode, Node } from 'cc';
import {Ground} from './Ground';
import {Results} from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: Ground,
        tooltip: 'This is Ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    public result: Results;

    @property({
        type: BirdAudio
    })
    public clip: BirdAudio;

    @property({
        type: Bird,
        tooltip: 'This is the bird'
    })
    public bird: Bird;

    @property({
        type: PipePool,
    })
    public pipeQueue: PipePool;

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    public isOver: boolean;


    onLoad() {
        this.initListener();
        this.result.resetScore();
        director.pause();
        this.isOver = true;
    }

    initListener() {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if(this.isOver == true) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame()
            }

            if(this.isOver == false) {
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }
            
        })
    }

    startGame() {
        this.result.hideResults();
        director.resume();
    }

    gameOver() {
        this.result.showResults();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause();
    }

    resetGame() {
        this.result.resetScore();
        this.pipeQueue.resetPool();
        this.isOver = false;
        //this.startGame();
    }

    passPipe() {
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    contactGroundPipe() {
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck() {
        this.contactGroundPipe();

        if (this.bird.hitSomething == true) {
            this.gameOver();
        }
    }

    update() {
        if (this.isOver == false) {
            this.birdStruck();
        }
    }
}