const Handler = require('./Handler'),
  router = require('./Router');

module.exports = class extends Handler{
  constructor(acl, password, loop){
    super(new router.OrRouter([
      new router.RegexRouter(/^.ping$/i, [], {handler: message => message.reply('pong')}),
      new router.AndRouter([
        new (require('./Route/IsNotAuth')),
        new router.RegexRouter(/^.auth(?: (.+))?$/i, ['password'], {correctPassword: password, handler: require('./Handler/Auth')}),
      ]),
      new router.AndRouter([
        new (require('./Route/IsAuth')),
        new (require('./Route/OnlyPrivateChat')),
        new (require('./Route/Logger')),
        new router.OrRouter([
          new router.ProtectRouter(acl, 'Debug', new router.RegexRouter(/^.debug$/i, [], {handler: message => console.log(message.loop.world)})),
          new router.OrRouter([
            new router.RegexRouter(/^.я$/i, [], {handler: require('./Handler/Person/Self')}),
            new router.ProtectRouter(acl, 'Person.List', new router.RegexRouter(/^.п(?:ерсонаж)?$/i, [], {handler: require('./Handler/Person/List')})),
            new router.RegexRouter(/^.п(?:ерсонаж)? (\d+)$/i, ['personIndex'], {handler: require('./Handler/Person/Person')}),
            new router.ProtectRouter(acl, 'Person.TeleportSelf', new router.RegexRouter(/^.п(?:ерсонаж)? п(?:ереместить)? ([\w\d]+)$/i, ['locationId'], {handler: require('./Handler/Person/TeleportSelf')})),
            new router.ProtectRouter(acl, 'Person.Teleport', new router.RegexRouter(/^.п(?:ерсонаж)? п(?:ереместить)? ([\w\d]+) ([\w\d]+)$/i, ['personId', 'locationId'], {handler: require('./Handler/Person/Teleport')})),
            new router.RegexRouter(/^.статус (.+)$/i, ['state'], {handler: require('./Handler/Person/EditState')}),
            new router.RegexRouter(/^.описание (.+)$/i, ['description'], {handler: require('./Handler/Person/EditDescription')}),
            new router.RegexRouter(/^.и(?:дти)? (\d+)$/i, ['locationIndex'], {handler: require('./Handler/Person/Move')}),
            new router.RegexRouter(/^.у(?:дарить)?(?: (.+))? (\d+)$/i, ['weapon', 'personIndex'], {handler: require('./Handler/Person/Hit')}),
          ]),
          new router.OrRouter([
            new router.RegexRouter(/^.тут$/i, [], {handler: require('./Handler/Location/ViewCurrent')}),
            new router.ProtectRouter(acl, 'Location.List', new router.RegexRouter(/^.л(?:окация)?$/i, [], {handler: require('./Handler/Location/List')})),
            new router.ProtectRouter(acl, 'Location.Create', new router.RegexRouter(/^.л(?:окация)? с(?:оздать)?(?: (.+?))?(?: (<|>|<>))?$/i, ['name', 'roads'], {handler: require('./Handler/Location/Create')})),
            new router.ProtectRouter(acl, 'Location.EditRoads', new router.RegexRouter(/^.л(?:окация)? д(?:ороги)? ([\w\d]+?)(?:(<|>|<>)([\w\d]+))?$/i, ['from', 'roads', 'to'], {handler: require('./Handler/Location/EditRoads')})),
            new router.ProtectRouter(acl, 'Location.EditName', new router.RegexRouter(/^.л(?:окация)? н(?:азвание)? (.+)$/i, ['name'], {handler: require('./Handler/Location/EditName')})),
            new router.ProtectRouter(acl, 'Location.EditDescription', new router.RegexRouter(/^.л(?:окация)? о(?:писание)? (.+)$/i, ['description'], {handler: require('./Handler/Location/EditDescription')})),
          ]),
          new router.RegexRouter(/(.+)/i, ['message'], {handler: require('./Handler/Person/Talk')}),
        ]),
      ])
    ]));

    acl.allowPattern('admin', /.+/);

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
