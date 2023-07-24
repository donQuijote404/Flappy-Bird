import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    
    @property({
        type: Prefab
    })
    public prefabPipes = null;;

    @property({
        type: Node
    })
    public pipePoolHome;

    public createPipe;
    public pool = new NodePool;

    initPool() {
        this.createPipe = instantiate(this.prefabPipes);
        this.pipePoolHome.addChild(this.createPipe);
    }

    addPool() {
        this.createPipe = instantiate(this.prefabPipes);
        this.pipePoolHome.addChild(this.createPipe);
    }

    resetPool() {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}