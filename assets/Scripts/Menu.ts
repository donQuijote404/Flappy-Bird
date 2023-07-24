import { _decorator, director, Component, Button, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    @property({
        type: Button
    })
    public buttonPlay: Button;

    @property({
        type: Button
    })
    public buttonSoundOn: Button;

    @property({
        type: Button
    })
    public buttonSoundOff: Button;

    @property({
        type: Button
    })
    public buttonAboutBird: Button;

    public isSilentMode: boolean;


    onLoad() {
        this.buttonSoundOff.node.active = false;
        this.buttonPlay.node.on(Node.EventType.TOUCH_END, () => {
            director.loadScene('scene');
        })

        this.buttonSoundOn.node.on(Node.EventType.TOUCH_END, () => {
            this.buttonSoundOff.node.active = true;
            this.buttonSoundOn.node.active = false;
        })

        this.buttonSoundOff.node.on(Node.EventType.TOUCH_END, () => {
            this.buttonSoundOff.node.active = false;
            this.buttonSoundOn.node.active = true;
        })
        this.buttonAboutBird.node.on(Node.EventType.TOUCH_END, () => {
            director.loadScene('scene about');
        })
    }
}