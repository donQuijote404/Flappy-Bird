import { _decorator, Button, Component, director, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayGame')
export class PlayGame extends Component {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, () => {
            director.loadScene('scene');
        })
    }
}