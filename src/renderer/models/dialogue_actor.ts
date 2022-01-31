export default class DialogueItemActor {
    public actorId: string = '';
    public protraitId: string = '';
    public speaker: boolean = false;

    public clone(): DialogueItemActor {
        const instance = new DialogueItemActor();
        instance.actorId = this.actorId;
        instance.protraitId = this.protraitId;
        instance.speaker = this.speaker;
        return instance;
    }


    public toJson(): any {
        return {
            "actor_id": this.actorId,
            "protrait_id": this.protraitId,
            "speaker": this.speaker,
        }
    }
}
