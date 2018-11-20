const Message = require('../../../Message'),
  LocationMessage = require('../../Message/Location'),
  Location = require('../../../../Game/Location');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  const location = new Location;
  location.name = routeMatch.name? routeMatch.name : '';
  switch(routeMatch.roads){
    case '<>':
      player.location.addRoad(location);
      location.addRoad(player.location);
      break;
    case '>':
      player.location.addRoad(location);
      break;
    case '<':
      location.addRoad(player.location);
      break;
    default:
      world.addLocation(location);
  }
  
  player.move(location);

  (new Message)
    .visit(new LocationMessage(location))
    .send(message.author);
};
