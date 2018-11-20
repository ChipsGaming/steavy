const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  player.setState(routeMatch.state);

  (new Message)
    .str('ok')
    .send(message.author);
};
