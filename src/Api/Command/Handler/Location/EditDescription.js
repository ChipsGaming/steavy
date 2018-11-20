const Message = require('../../../Message'),
  LocationMessage = require('../../Message/Location');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  player.location.setDescription(routeMatch.description);

  (new Message)
    .visit(new LocationMessage(player.location))
    .send(message.author);
};
