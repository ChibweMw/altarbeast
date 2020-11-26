let instance = null
export default class EventDispatcher extends Phaser.Events.EventEmitter 
{
    constructor()
    {
        super()
    }

    static getInstance() 
    {
        if (instance == null) 
        {
            instance = new EventDispatcher()
        }
        return instance
    }
}

// this.emitter = EventDispatcher.getInstance();
// this.emitter.emit("MY_EVENT","String_Data")
// this.emitter.emit("ATTACK",{weapon:'sword',strength:5,monster:'dragon'})

// this.emmiter.on(Event_NAME,function_name);

// this.emitter = EventDispatcher.getInstance();
// this.emitter.on('ATTACK',this.doAttack.bind(this));

// doAttack(parameter)
// {
//   console.log('you attacked the '+parameter.monster+' with a '+parameter.weapon);
// }
