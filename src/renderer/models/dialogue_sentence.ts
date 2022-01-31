import DialogueItemActor from "./dialogue_actor";
import DialogueItem from "./dialogue_item";

export default class DialogueSentence extends DialogueItem {
    public content: string = ''
    public leftActor: DialogueItemActor | null = null;
    public rightActor: DialogueItemActor | null = null;

    public clone(): DialogueItem {
        const instance = new DialogueSentence();
        instance.id = this.id;
        instance.content = this.content;
        instance.leftActor = this.leftActor;
        instance.rightActor = this.rightActor;
        return instance;
    }

    public toJson(): any {
        return {
            "content": this.content,
            "left_actor": this.leftActor ? this.leftActor.toJson() : null,
            "right_actor": this.rightActor ? this.rightActor.toJson() : null,
        }
    }
}
