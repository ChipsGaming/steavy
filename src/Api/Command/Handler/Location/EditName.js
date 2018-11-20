const Message = require('../../../Message'),
  LocationMessage = require('../../Message/Location');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  player.location.setName(routeMatch.name);

  (new Message)
    .visit(new LocationMessage(player.location))
    .send(message.author);
};
