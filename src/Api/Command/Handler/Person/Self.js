const Message = require('../../../Message'),
  PersonMessage = require('../../Message/Person');

module.exports = (message, routeMatch) => {
  const world = message.loop.world,
    player = world.getPlayerAvatar(message.author.id);

  (new Message)
    .visit(new PersonMessage(player))
    .send(message.author);
};
