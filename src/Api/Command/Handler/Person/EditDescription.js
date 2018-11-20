const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  player.setDescription(routeMatch.description);

  (new Message)
    .str('ok')
    .send(message.author);
};
