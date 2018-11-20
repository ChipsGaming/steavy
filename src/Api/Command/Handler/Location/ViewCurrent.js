const Message = require('../../../Message'),
  LocationMessage = require('../../Message/Location');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id),
    location = player.location;

  (new Message)
    .visit(new LocationMessage(location))
    .send(message.author);
};
