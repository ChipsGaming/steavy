const Handler = require('./Handler'),
  {and, or, rx, p, or_ps} = require('./Router/Builder');

module.exports = class extends Handler{
  constructor(acl, password, loop){
    super(
      or(
        rx(/^.ping$/i, [], {handler: message => message.reply('pong')}),
        and(
          new (require('./Route/IsNotAuth')),
          rx(/^.auth(?: (.+))?$/i, ['password'], {correctPassword: password, handler: require('./Handler/Auth')}),
        ),
        and(
          new (require('./Route/IsAuth')),
          new (require('./Route/OnlyPrivateChat')),
          new (require('./Route/Logger')),
          or(
            p(acl, 'Debug', rx(/^.debug$/i, [], {handler: message => console.log(message.loop.world)})),
            new (require('./Handler/Location'))(acl),
            new (require('./Handler/Person'))(acl)
          )
        )
      )
    );

    acl.allowPattern('admin', /.+/);
    acl.allow('player', [
      'Person.Self',
      'Person.EditStatus',
      'Person.EditDescription',
      'Person.Move',
      'Person.Hit',
      'Person.Talk',
      'Location.Self',
    ]);

    this.loop = loop;
  }

  onReady(){
    console.log('ready');
  }

  onMessage(message){
    if(message.author.bot){
      return;
    }

    message.loop = this.loop;

    return super.onMessage(message);
  }
}
