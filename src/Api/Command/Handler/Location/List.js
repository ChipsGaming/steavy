const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world;

  (new Message)
    .list(Array.from(world.locations.values()), (l, i, message) =>
      message.str(`${l.id} `).bold(l.name).nl()
    )
    .send(message.author);
};
