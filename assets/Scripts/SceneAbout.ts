import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneAbout')
export class SceneAbout extends Component {
    onLoad() {
        this.node.on(Node.EventType.TOUCH_END, () => {
            director.loadScene('scene menu');
        })
    }   
}