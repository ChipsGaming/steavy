const Message = require('../../../Message');

module.exports = (message, routeMatch) => {
  const world = message.loop.world;

  (new Message)
    .list(Array.from(world.locations.values()), (l, i, message) =>
      message.list(Array.from(l.persons.values()), (p, i, message) =>
        message.str(`${p.id} - `).bold(p.name).str(` (${l.name})`).nl()
      )
    )
    .send(message.author);
};
