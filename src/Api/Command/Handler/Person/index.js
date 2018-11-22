const OrRouter = require('../../Router/OrRouter'),
  {ps, rx} = require('../../Router/Builder');

module.exports = class extends OrRouter{
  constructor(acl){
    super(
      ps(acl, {
        'Person.Self': rx(/^.я$/i, [], {handler: require('./Self')}),
        'Person.List': rx(/^.п(?:ерсонаж)?$/i, [], {handler: require('./List')}),
        'Person.View': rx(/^.п(?:ерсонаж)? (\d+)$/i, ['personIndex'], {handler: require('./Person')}),
        'Person.TeleportSelf': rx(/^.п(?:ерсонаж)? п(?:ереместить)? ([\w\d]+)$/i, ['locationId'], {handler: require('./TeleportSelf')}),
        'Person.Teleport': rx(/^.п(?:ерсонаж)? п(?:ереместить)? ([\w\d]+) ([\w\d]+)$/i, ['personId', 'locationId'], {handler: require('./Teleport')}),
        'Person.EditStatus': rx(/^.статус (.+)$/i, ['state'], {handler: require('./EditState')}),
        'Person.EditDescription': rx(/^.описание (.+)$/i, ['description'], {handler: require('./EditDescription')}),
        'Person.Move': rx(/^.и(?:дти)? (\d+)$/i, ['locationIndex'], {handler: require('./Move')}),
        'Person.Hit': rx(/^.у(?:дарить)?(?: (.+))? (\d+)$/i, ['weapon', 'personIndex'], {handler: require('./Hit')}),
        'Person.Talk': rx(/(.+)/i, ['message'], {handler: require('./Talk')}),
      })
    );
  }
}
