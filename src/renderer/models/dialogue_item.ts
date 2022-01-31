export default abstract class DialogueItem {
    public id: string = String(Date.now());
    public abstract clone(): DialogueItem;
    public abstract toJson(): any;
}
