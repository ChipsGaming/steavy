const OrRouter = require('../../Router/OrRouter'),
  {ps, rx} = require('../../Router/Builder');

module.exports = class extends OrRouter{
  constructor(acl){
    super(
      ps(acl, {
        'Location.Self': rx(/^.тут$/i, [], {handler: require('./ViewCurrent')}),
        'Location.List': rx(/^.л(?:окация)?$/i, [], {handler: require('./List')}),
        'Location.Create': rx(/^.л(?:окация)? с(?:оздать)?(?: (.+?))?(?: (<|>|<>))?$/i, ['name', 'roads'], {handler: require('./Create')}),
        'Location.EditRoads': rx(/^.л(?:окация)? д(?:ороги)? ([\w\d]+?)(?:(<|>|<>)([\w\d]+))?$/i, ['from', 'roads', 'to'], {handler: require('./EditRoads')}),
        'Location.EditName': rx(/^.л(?:окация)? н(?:азвание)? (.+)$/i, ['name'], {handler: require('./EditName')}),
        'Location.EditDescription': rx(/^.л(?:окация)? о(?:писание)? (.+)$/i, ['description'], {handler: require('./EditDescription')}),
      })
    );
  }
}
