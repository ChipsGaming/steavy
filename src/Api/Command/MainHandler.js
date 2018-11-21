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
          or_ps(acl, {
            'Debug': rx(/^.debug$/i, [], {handler: message => console.log(message.loop.world)}),
            'Person.Self': rx(/^.я$/i, [], {handler: require('./Handler/Person/Self')}),
            'Person.List': rx(/^.п(?:ерсонаж)?$/i, [], {handler: require('./Handler/Person/List')}),
            'Person.View': rx(/^.п(?:ерсонаж)? (\d+)$/i, ['personIndex'], {handler: require('./Handler/Person/Person')}),
            'Person.TeleportSelf': rx(/^.п(?:ерсонаж)? п(?:ереместить)? ([\w\d]+)$/i, ['locationId'], {handler: require('./Handler/Person/TeleportSelf')}),
            'Person.Teleport': rx(/^.п(?:ерсонаж)? п(?:ереместить)? ([\w\d]+) ([\w\d]+)$/i, ['personId', 'locationId'], {handler: require('./Handler/Person/Teleport')}),
            'Person.EditStatus': rx(/^.статус (.+)$/i, ['state'], {handler: require('./Handler/Person/EditState')}),
            'Person.EditDescription': rx(/^.описание (.+)$/i, ['description'], {handler: require('./Handler/Person/EditDescription')}),
            'Person.Move': rx(/^.и(?:дти)? (\d+)$/i, ['locationIndex'], {handler: require('./Handler/Person/Move')}),
            'Person.Hit': rx(/^.у(?:дарить)?(?: (.+))? (\d+)$/i, ['weapon', 'personIndex'], {handler: require('./Handler/Person/Hit')}),
            'Location.Self': rx(/^.тут$/i, [], {handler: require('./Handler/Location/ViewCurrent')}),
            'Location.List': rx(/^.л(?:окация)?$/i, [], {handler: require('./Handler/Location/List')}),
            'Location.Create': rx(/^.л(?:окация)? с(?:оздать)?(?: (.+?))?(?: (<|>|<>))?$/i, ['name', 'roads'], {handler: require('./Handler/Location/Create')}),
            'Location.EditRoads': rx(/^.л(?:окация)? д(?:ороги)? ([\w\d]+?)(?:(<|>|<>)([\w\d]+))?$/i, ['from', 'roads', 'to'], {handler: require('./Handler/Location/EditRoads')}),
            'Location.EditName': rx(/^.л(?:окация)? н(?:азвание)? (.+)$/i, ['name'], {handler: require('./Handler/Location/EditName')}),
            'Location.EditDescription': rx(/^.л(?:окация)? о(?:писание)? (.+)$/i, ['description'], {handler: require('./Handler/Location/EditDescription')}),
            'Person.Talk': rx(/(.+)/i, ['message'], {handler: require('./Handler/Person/Talk')}),
          }),
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
